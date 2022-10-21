import * as React from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/MenuRounded';
import ComparisonIcon from '@mui/icons-material/BarChartRounded';
import CarIcon from '@mui/icons-material/DirectionsCarRounded';
import PublicTransportIcon from '@mui/icons-material/CommuteRounded';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useRouter } from 'next/router';
import {Paper, Typography} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import {DirectionsBike} from "@mui/icons-material";

// template for all pages
function Template({ children }: any) {
	const router = useRouter();
  const [selectedLinkPathname, setSelectedLinkPathname] = React.useState(router.pathname);
	const [menuHeight, setMenuHeight] = React.useState(0);

    // a boolean value that is true if the screen is small
  const renderDropdown = useMediaQuery(useTheme().breakpoints.down('md'), { noSsr: true });

    // a function that calculates the height of the navigation menu
	function calcHeight(dropDown: any) {
		if (menuHeight == 0) {
			const height = dropDown.current.childNodes[0].offsetHeight;
			console.log(dropDown.current.childNodes[0]);
			setMenuHeight(height);
		} else {
			setMenuHeight(0);
		}
	}

    // a component for linked navigation menu items
	function ListItem(Icon: any, name: string, link: string) {
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

    // the navigation menu list component
	let body = (
		<List component="nav">
			{ListItem(ComparisonIcon, "Comparison", "/comparison")}
			{ListItem(CarIcon, "Car", "/car")}
			{ListItem(PublicTransportIcon, "Public Transport", "/public-transport")}
            {ListItem(DirectionsBike, "Bicycle/Walking", "/bicycle")}
		</List>
	);

    // the navigation menu component, sidebar or dropdown based on screen size
	let result;
	if (renderDropdown) {
		let dropDownMenuRef = React.createRef();

        // render for small screens
		return (
			<Box>
				<Box
                    ref={dropDownMenuRef}
                    sx={{
                      transition: "height 100ms linear",
                      height: menuHeight,
                      overflow: "hidden",
                      position: "fixed",
                      top: 0,
                      backgroundColor: "#eaefff",
                      width: "100%",
                      zIndex: 1000,
                      opacity: "0.98"
                }}
                    component={Paper}
				>
                    {/* the navigation menu list component */}
					{ body }
				</Box>
				<Box sx={{position: "fixed", top: "14px", right: "24px", zIndex: 1001}}>
					<IconButton
                        style={{backgroundColor: "#eaefff"}}
						onClick={(e) => calcHeight(dropDownMenuRef)}
					>
						<MenuIcon />
					</IconButton>
				</Box>
				<Box>
                    <Container maxWidth="lg" component="main">
                        {/* the main content of the page */}
                        { children }
                    </Container>
				</Box>
			</Box>
		);
	} else {
        // render for large screens
        return (
			<Grid container>
                <Grid xs component="main">
                    <Container maxWidth="xl">
                        {/* the main content of the page */}
                        { children }
                    </Container>
                </Grid>
                <Grid xs maxWidth="300px">
                    <Paper elevation={5} style={{ height: '100%', top: '0', position: "fixed", width: "100%", backgroundColor: "#eaefff"}}>
                        <Typography variant="h4" style={{margin: '24px 10px'}}> Travel Settings </Typography>
                        {/* the navigation menu list component */}
                        { body }
                    </Paper>
                </Grid>
            </Grid>


		);
	}
}

export default Template;
