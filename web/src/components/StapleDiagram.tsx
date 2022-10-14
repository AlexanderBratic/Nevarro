
import React from 'react';

import Box from '@mui/material/Box';
import Grow from '@mui/material/Grow';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import {StapleHeights, StaplePartHeights} from '../../types/sessionStorageTypes';
import {setItem, getTypedItem } from '../sessionStorage';

import styles from './css/StapleDiagram.module.css';

interface StaplePart {
	color: number;
	value: number;
	hint: string;
}

export const STAPLE_COLORS = {
	ROUTE: 0x9b59b6,
	PRODUCTION: 0xf1c40f
};
	
export interface Staple {
	icon: any;
	title: string;
	parts: StaplePart[];
}

interface StapleDiagramProps {
	staples: Staple[];
}

function toCssColor(color: number) {
	let r = (color >> 16) & 0xFF;
	let g = (color >> 8 ) & 0xFF;
	let b = (color >> 0 ) & 0xFF;
	return "#" + r.toString(16).padStart(2, "0") + g.toString(16).padStart(2, "0") + b.toString(16).padStart(2, "0");
}

function blendCssColor(color0: number, color1: number, blendFactor: number) {
	let r0 = (color0 >> 16) & 0xFF;
	let g0 = (color0 >> 8 ) & 0xFF;
	let b0 = (color0 >> 0 ) & 0xFF;
	let r1 = (color1 >> 16) & 0xFF;
	let g1 = (color1 >> 8 ) & 0xFF;
	let b1 = (color1 >> 0 ) & 0xFF;
	
	let blendedR1 = (r0 / 255.0) + (r1 / 255.0 - r0 / 255.0) * blendFactor;
	let blendedG1 = (g0 / 255.0) + (g1 / 255.0 - g0 / 255.0) * blendFactor;
	let blendedB1 = (b0 / 255.0) + (b1 / 255.0 - b0 / 255.0) * blendFactor;
	
	return Math.min(blendedR1 * 255.0) << 16 | Math.min(blendedG1 * 255.0) << 8 | Math.min(blendedB1 * 255.0) << 0;
}

function findHighestStaple(staples: Staple[]) {
	let result = 0.0;
	staples.forEach(staple => {
		let stapleHeight = 0.0;
		staple.parts.forEach(
			part => { stapleHeight += part.value; }
		);
		result = Math.max(result, stapleHeight);
	});
	return result;
}

interface StaplePartProps {
	part: StaplePart;
	oldPartHeights: StaplePartHeights;
	newPartHeights: StaplePartHeights;
	heightMultiplier: number;
}
const StaplePart = ({part, 
					 oldPartHeights, 
					 newPartHeights, 
					 heightMultiplier}: StaplePartProps) => {
	let lightColor = toCssColor(part.color);
	let darkColor  = toCssColor(blendCssColor(0, part.color, .7));
	
	let background = "repeating-linear-gradient(45deg, ";
	background += lightColor + " 0px, ";
	background += lightColor + " 10px, ";
	background += darkColor + " 10px, ";
	background += darkColor + " 20px)";
	
	let heightValue = (part.value * heightMultiplier);
	let oldHeight = oldPartHeights[part.color.toString()] ?? heightValue;
	newPartHeights[part.color.toString()] = heightValue;
	
	const [height, setHeight] = React.useState(oldHeight);
	
	React.useEffect(() => {
		setHeight(heightValue);
	}, [heightValue]);
	
	let css = {
		height:     height + "%", 
		background: background
	};
	
	return (
		<Tooltip placement="right" arrow title={
			<Box sx={{textAlign: "center"}}>
				{part.hint}<br/>
				{part.value}kgCo2
			</Box>
		}>
			<Box sx={css} className={styles.part} />
		</Tooltip>
	);
};

interface StapleProps {
	staple: Staple;
	oldHeights: StapleHeights;
	newHeights: StapleHeights;
	heightMultiplier: number;
	targetLeft: string;
	firstRender: boolean;
}
const Staple = ({staple, 
				 oldHeights, 
				 newHeights, 
				 heightMultiplier, 
				 targetLeft,
				 firstRender}: StapleProps) => {
	let alreadyExisted = staple.title in oldHeights;
	let oldBoxHeights = oldHeights[staple.title] ?? {};
	let newBoxHeights: Record<string, number> = {};
	newHeights[staple.title] = newBoxHeights;
	
	let [useTargetLeft, setUseTargetLeft] = React.useState(firstRender || alreadyExisted);
	
	React.useEffect(() => {
		if (!useTargetLeft)
			setUseTargetLeft(true);
	}, [useTargetLeft]);
	
	return (
		<Box className={styles.staple} style={useTargetLeft ? {left: targetLeft} : {}}>
			<Grow in appear={!firstRender} style={{transformOrigin: "50% 400px"}}>
				<Box>
					<Stack className={styles.parts} sx={{height: "100%"}} direction="column-reverse" justifyContent="flex-start">
						{staple.parts.map((part) => (
							<StaplePart key={part.color.toString()}
										part={part}
										oldPartHeights={oldBoxHeights}
										newPartHeights={newBoxHeights}
										heightMultiplier={heightMultiplier}/>
						))}
					</Stack>
					<Box className={styles.title} sx={{height: "100%"}}>
						{staple.icon}
					 	{staple.title}
					</Box>
				</Box>
			</Grow>
		</Box>
	);
};

export const StapleDiagram = (props: StapleDiagramProps) => {

	let staples = props.staples ?? [];
	
	let oldHeights: StapleHeights = getTypedItem<StapleHeights>("staplediagram-oldheights", {});
	let newHeights: StapleHeights = {};
	let firstRenderRef = React.useRef(true);
	
	React.useEffect(() => {
		firstRenderRef.current = false;
		setItem("staplediagram-oldheights", newHeights);
	});

	let highestStaple = findHighestStaple(staples);
	let heightMultiplier = 100.0 / highestStaple;
	let stapleWidth      = 100.0 / staples.length;
	
	let stapleComponents: any[] = [];
	for (let stapleIndex = 0; stapleIndex < staples.length; stapleIndex++) {
		let staple = staples[stapleIndex];
		let targetLeft = ((stapleIndex + 0.5) * stapleWidth) + "%";
		stapleComponents.push(
			<Staple 
				key={staple.title} 
				staple={staple}
				oldHeights={oldHeights}
				newHeights={newHeights}
				heightMultiplier={heightMultiplier}
				targetLeft={targetLeft} 
				firstRender={firstRenderRef.current}
			/>
		);
	}
	
	return (
		<Box className={styles.stapleDiagram}>
			<Box sx={{ width: "calc(100% - 100px)", height: "1px", backgroundColor: "gray", position: "absolute", top: "10px", right: "0px"}} />
			<Box sx={{ width: "calc(100% - 100px)", height: "1px", backgroundColor: "gray", position: "absolute", top: "109px", right: "0px"}} />
			<Box sx={{ width: "calc(100% - 100px)", height: "1px", backgroundColor: "gray", position: "absolute", top: "209px", right: "0px"}} />
			<Box sx={{ width: "calc(100% - 100px)", height: "1px", backgroundColor: "gray", position: "absolute", top: "309px", right: "0px"}} />
			<Box sx={{ width: "calc(100% - 100px)", height: "1px", backgroundColor: "gray", position: "absolute", top: "409px", right: "0px"}} />
			
			<Box sx={{ position: "absolute", top: "10px",  right: "calc(100% - 100px)", transform: "translateY(-50%)"}}>100%</Box>
			<Box sx={{ position: "absolute", top: "109px", right: "calc(100% - 100px)", transform: "translateY(-50%)"}}>75%</Box>
			<Box sx={{ position: "absolute", top: "209px", right: "calc(100% - 100px)", transform: "translateY(-50%)"}}>50%</Box>
			<Box sx={{ position: "absolute", top: "309px", right: "calc(100% - 100px)", transform: "translateY(-50%)"}}>25%</Box>
			<Box sx={{ position: "absolute", top: "409px", right: "calc(100% - 100px)", transform: "translateY(-50%)"}}>0%</Box>
			
			<Box sx={{ position: "absolute", left: "100px", right: "0px", top: "11px", bottom: "0" }}>
				{stapleComponents}
			</Box>
		</Box>
	);
}
