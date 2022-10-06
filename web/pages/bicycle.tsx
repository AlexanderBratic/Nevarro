import type { NextPage } from 'next';
import * as React from 'react';
import { useState } from 'react';
import { borders, shadows } from "@mui/system";
import { ToggleButton, ToggleButtonGroup, Button, Container, Typography, Grid, Box, TextField } from "@mui/material";
import { getItem, setItem, getTypedItem } from "../src/sessionStorage";
import Template from '../src/components/Template';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

import { useRouter } from "next/router";

function getBicycleData(): CarType {
	const defaultData: BicycleType = {emissionPerKm:23};
	
	return getTypedItem<BicycleType>("bicycle", defaultData);
}

export function getBicycleCo2PerKm() {
	let bicycleData = getBicycleData();
	return bicycleData.emissionPerKm;
}

function DisplayEmission() {
	const [hide, setHide] = useState(false);

	const toggleHide = () => {
		setHide((oldState) => !oldState);
	};

	let carbonEmission= (distance : number) => {
		return (12 * distance / 100).toFixed(2).toString();
	};

	return (
		<Box>
			<Box mt={2} pb={1} textAlign="center" sx={{ borderBottom: 1 }}>
				<Button color="primary" variant='contained' onClick={toggleHide}>Show Emission Data</Button>
			</Box>
			{hide && (
				<Box mt={1}>
					<Box>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography textAlign="center" variant='h5'>CO2 emission: {carbonEmission(470)} g</Typography>
							</Grid>

							<Grid item xs={6}>
								<Typography textAlign="center" variant='h5'>Oil consumption: 300g</Typography>
							</Grid>
						</Grid>
					</Box>
					
					<Box mt={1}>
						<Grid container spacing={1}>
							<Grid item xs={6}>
								<Typography textAlign="center" variant='h5'>CO emission: 0.48 g</Typography>
							</Grid>

							<Grid item xs={6}>
								<Typography textAlign="center" variant='h5'>NOx emission: 0.12 g</Typography>
							</Grid>
						</Grid>
					</Box>
					<RedirectButton/>
				</Box>
			)}
		</Box>
	);
}

function ToggleButtonDiet() {
	const [alignment, setAlignment] = useState("Vegan/Vegetarian");

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if(newAlignment !== null) {
			sessionStorage.setItem("DietType", newAlignment);
			setAlignment(newAlignment);
		}
	}

	return (
		<Grid container>
			<Grid item xs={7}>
				<ToggleButtonGroup
					fullWidth
					color="primary"
					value={alignment}
					exclusive
					onChange={handleChange} 
					aria-label="outlined button group"
				>
					<ToggleButton value="Vegan/Vegetarian" color='secondary'>Vegan/Vegetarian</ToggleButton>
					<ToggleButton value="Normal">Normal</ToggleButton>
					<ToggleButton value="Carnivore" color='error'>Carnivore</ToggleButton>
				</ToggleButtonGroup>
			</Grid>
		</Grid>
	);
}


function DietAndFuel() {
	const [hide, setHide] = useState(true);
	const [alignment, setAlignment] = React.useState('left');

	const handleAlignment = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if(newAlignment !== null) {
			sessionStorage.setItem("PropulsionType", (newAlignment == 'left' ? "Human" : "Electric") + "Powered");
			setHide((oldState) => newAlignment == 'left');
			setAlignment(newAlignment);
		}
	}

	return (
		<Box>
			<Box mt={1}>
				<Grid container spacing={1}>
					<Grid item xs={1.5} alignContent="">
						<Typography variant='h5'>Bike Type:</Typography>
					</Grid>

					<Grid item xs={4}>
						<ToggleButtonGroup 
							fullWidth
							aria-label="outlined button group"
							value={alignment}
							exclusive
							onChange={handleAlignment}
							>
							<ToggleButton value="left"  color="info">Conventional</ToggleButton>
							<ToggleButton value="right" color="warning">Electric</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
				</Grid>
			</Box>
			{hide && (
				<Box mt={1}>
					<Grid container spacing={1}>
						<Grid item xs={1.5}>
							<Typography variant='h5'>Diet:</Typography>
						</Grid>

						<Grid item xs={10}>
							<ToggleButtonDiet/>
						</Grid>
					</Grid>
				</Box>
			)}
		</Box>
	);
}

function RedirectButton() {
	const router = useRouter();
	const [linkName, setLinkName] = useState(router.pathname);

	const handleLinkName = (
		event: React.MouseEvent<HTMLElement>
	) => {
		setLinkName("/comparison");
		router.push("/comparison");
	};

	return (
		<Box mt={2}>
			<Button
				variant='contained'
				onClick={handleLinkName}	
			>
				Redirect To Comparison Page
			</Button>
		</Box>
	);
}

function BicyclePage() {
	
	return (
		<Container>
			<Typography variant='h3' textAlign="left">Bicycle Settings Page</Typography>
			<Box mt={1} mb={1}>
				<Grid container spacing={1}>
					<Grid item xs={4}></Grid>
					<Grid item xs={2}>
						<TextField variant='standard' defaultValue="Göteborg" disabled/>
					</Grid>
					<Grid item xs={.5} alignContent="center">
						<DirectionsBikeIcon fontSize='large'/>
					</Grid>
					<Grid item xs={2}>
						<TextField variant='standard' defaultValue="Stockholm" disabled/>
					</Grid>
					<Grid item xs={3}>: 470km</Grid>
				</Grid>
				<DietAndFuel/>
				<DisplayEmission/>
				
			</Box>
			
		</Container>
		
	);
	
}

const About: NextPage = () => {

	return (
		<Template>
			<BicyclePage/>
		</Template>
	);
};

export default About;