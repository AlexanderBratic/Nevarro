import * as React from 'react';

import { red } from '@mui/material/colors';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/MenuRounded';
import ComparisonIcon from '@mui/icons-material/BarChartRounded';
import CarIcon from '@mui/icons-material/DirectionsCarRounded';
import AirplaneIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import PublicTransportIcon from '@mui/icons-material/CommuteRounded';
import BikeIcon from '@mui/icons-material/DirectionsBikeRounded';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooterRounded';
import WalkIcon from '@mui/icons-material/DirectionsWalkRounded';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useRouter } from 'next/router';

const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();
function getItem(key: string, value: number|boolean|object|string) {
	if (!isBrowser)
		return value;
	let sessionValue = window.sessionStorage[key];
	if (sessionValue === undefined)
		return value;
	
	if (typeof value === 'number')
		return parseFloat(sessionValue);
	if (typeof sessionValue === 'boolean')
		return value === 'true';
	if (typeof sessionValue === 'object')
		return JSON.parse(sessionValue);
	return sessionValue;
}
function setItem(key: string, value: number|boolean|object|string) {
	if (isBrowser) {
		let storedValue = value;
		if (typeof value === 'number')
			storedValue = value.toString();
		else if (typeof value === 'boolean')
			storedValue = value ? 'true' : 'false';
		else if (typeof value === 'object')
			storedValue = JSON.stringify(value);
		
		
		window.sessionStorage.setItem(key, storedValue);
		return true;
	}

	return false;
}

function Template(props) {
	const router = useRouter();
  const [selectedLinkPathname, setSelectedLinkPathname] = React.useState(router.pathname);
	const [menuHeight, setMenuHeight] = React.useState(0);
	
  const renderDropdown = useMediaQuery(useTheme().breakpoints.down('md'), { noSsr: true });
	
	function calcHeight(dropDown) {
		if (menuHeight == 0) {
			const height = dropDown.current.childNodes[0].offsetHeight;
			console.log(dropDown.current.childNodes[0]);
			setMenuHeight(height);
		} else {
			setMenuHeight(0);
		}
	}
	
	function ListItem(Icon, name, link) {
		return (
			<ListItemButton
				selected={selectedLinkPathname === link}
				onClick={(event) => {setSelectedLinkPathname(link); router.push(link);}}
			>
					<ListItemIcon><Icon /></ListItemIcon>
					<ListItemText primary={name} />
			</ListItemButton>
		);
	}
	
	let body = (
		<List component="nav">
			{ListItem(ComparisonIcon, "Comparison", "/comparison")}
			{ListItem(CarIcon, "Car", "/car")}
			{ListItem(AirplaneIcon, "Plane", "/plane")}
			{ListItem(PublicTransportIcon, "Public Transport", "/public-transport")}
			{ListItem(BikeIcon, "Bicycle", "/bicycle")}
			{ListItem(ElectricScooterIcon, "Electric Scooter", "/electric-scooter")}
			{ListItem(WalkIcon, "Walking", "/walking")}
		</List>
	);
	
	let result;
	if (renderDropdown) {
		let dropDownMenuRef = React.createRef();
	
		result = (
			<Box>
				<Box 
					ref={dropDownMenuRef}
				  sx={{
					transition: "height 100ms linear",
					height: menuHeight,
					overflow: "hidden"
				  }}
				>
					{ body }
				</Box>
				<Box sx={{float: "right", marginTop: "10px"}}>
					<IconButton 
						variant="contained" 
						onClick={(e) => calcHeight(dropDownMenuRef)}
					>
						<MenuIcon />
					</IconButton>
				</Box>
				<Box>
					<props.page />
				</Box>
			</Box>
		);
	} else {
		result = (
			<Box sx={{
					my: 2,
					display: 'flex',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'top',
				}}>
				<Box sx={{
						flex: "1 0 auto"
					}}
				>
					<props.page />
				</Box>
				<Box sx={{
						width: "20%",
						maxWidth: "260px",
						flex: "0 0 auto"
					}}
				>
					<Box marginLeft="20px">
						<h1>Hello!</h1>
					</Box>
					{ body }
				</Box>
			</Box>
		);
	}
	return (
    <Container maxWidth="xl">
			{result}
		</Container>
	);
}


export { setItem, getItem, Template };
export default Template;
