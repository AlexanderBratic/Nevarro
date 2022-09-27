
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';

import {setItem, getItem } from '../sessionStorage';

interface StaplePart {
	color: string;
	value: number;
	hint: string;
}

interface Staple {
	icon: any;
	title: string;
	parts: object;
}


function StapleDiagramComponent({ staples }) {
	staples = staples ?? [];
	
	let highestStaple = 0.0;
	
	Object.entries(staples).forEach(([name, staple]) => {
		let stapleHeight = 0.0;
		Object.entries(staple.parts).forEach(
			([key, part]) => { stapleHeight += part.value; }
		);
		highestStaple = Math.max(highestStaple, stapleHeight);
	});
	
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
	
	let heightMultiplier = 100.0 / highestStaple;
	function Staple(staple: Staple) {
		let boxes = [];
		
		for (let i = 0; i < staple.parts.length; i++) {
			let box = staple.parts[i];
			
			let lightColor = toCssColor(box.color);
			let darkColor  = toCssColor(blendCssColor(0, box.color, .7));
			
			let background = "repeating-linear-gradient(45deg, ";
			background += lightColor + " 0px, ";
			background += lightColor + " 10px, ";
			background += darkColor + " 10px, ";
			background += darkColor + " 20px)";
			
			let height = (box.value * heightMultiplier);
			
			const isFirst = (i === 0);
			const isLast  = (i === staple.parts.length - 1);
			let marginBottom = !isFirst ? "1px" : "0px";
			let marginTop    = !isLast ? "1px" : "0px";
			
			let css = {
				boxSizing: "border-box",
				width: "40px", 
				height: "calc(" + height + "% - " + marginBottom + " - " +  marginTop + ")", 
				background: background,
				border: "2px solid " + box.color,
				transition: "opacity 0.5s",
				marginBottom: marginBottom,
				marginTop: marginTop,
				
				"&:hover": {
					opacity: "80%"
				}
			};
			
			if (isLast) {
				css.borderTopLeftRadius = "5px";
				css.borderTopRightRadius = "5px";
			}
			if (isFirst) {
				css.borderBottomLeftRadius = "5px";
				css.borderBottomRightRadius = "5px";
			}
			
			let hint = (
				<Box sx={{textAlign: "center"}}>
					{box.hint}<br/>
					{box.value}kgCo2
				</Box>
			);
			
			boxes.push(
				<Tooltip placement="right" arrow title={hint}>
					<Box sx={css} />
				</Tooltip>
			);
		}
		
		return (
			<Stack direction="column-reverse" justifyContent="flex-start">
				{boxes}
			</Stack>
		);
	};
	
	let stapleComponents = [];
	let stapleTitles = [];
	Object.entries(staples).forEach(([name, staple]) => {
		stapleComponents.push(Staple(staple));
		
		stapleTitles.push(
			<Box sx={{
				whiteSpace: "nowrap",
				width: "40px",
				marginTop: "15px",
				transform: "translateX(-45px) translateY(-37px) rotate(70deg)",
				
			}}>
				{staple.icon}
				{staple.title}
			</Box>
		);
	});
	
	return (
		<Box sx={{ width: "100%", height: "550px", position: "relative"}}>
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
			
			<Stack sx={{ position: "absolute", left: "100px", right: "0px", top: "9px", bottom: "141px" }} direction="row"  justifyContent="space-around">
				{stapleComponents}
			</Stack>
			<Stack sx={{ position: "absolute", left: "100px", right: "0px", top: "410px", bottom: "0px" }} direction="row"  justifyContent="space-around">
				{stapleTitles}
			</Stack>
		</Box>
	);
}

export default StapleDiagramComponent;