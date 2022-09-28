import type { NextPage } from 'next';
import * as React from 'react';
import { useState } from 'react';
import { borders, shadows } from "@mui/system";
import { ToggleButton, ToggleButtonGroup, Button, Container, Typography, Grid, Box, TextField } from "@mui/material";
import Template from '../src/components/Template';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

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
					
				</Box>
			)}
		</Box>
	);
}

function ToggleButtonDiet() {
	const [alignment, setAlignment] = React.useState('web');

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setAlignment(newAlignment);
	}

	return (
		<ToggleButtonGroup
			color="primary"
			value={alignment}
			exclusive={true}
			onChange={handleChange} 
			aria-label="outlined button group"
		>
			<ToggleButton value="left" color='secondary'>Vegan/Vegetarian</ToggleButton>
			<ToggleButton value="center">&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; Normal &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;</ToggleButton>
			<ToggleButton value="right" color='error'>&nbsp; &nbsp; &nbsp; &nbsp; Carnivore &nbsp; &nbsp; &nbsp; &nbsp;</ToggleButton>
		</ToggleButtonGroup>
	);
}

function DietAndFuel() {
	const [hide, setHide] = useState(false);

	const toggleHide = () => {
		setHide((oldState) => !oldState);
	};

	return (
		<Box>
			<Box mt={1}>
				<Grid container spacing={1}>
					<Grid item xs={1.5} alignContent="">
						<Typography variant='h5'>Bike Type:</Typography>
					</Grid>

					<Grid item xs={1}>
						<ToggleButtonGroup aria-label="outlined button group">
							<ToggleButton value="left" onClick={toggleHide}>Conventional</ToggleButton>
							<ToggleButton value="right">Electric</ToggleButton>
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

function BicyclePage() {
	
	return (
		<Container>
			<Typography variant='h3' textAlign="left">Bicycle Settings Page</Typography>
			<Box mt={1} mb={1}>
				<Grid container spacing={1}>
					<Grid item xs={4}></Grid>
					<Grid item xs={2}>
						<TextField variant='standard' defaultValue="Göteborg"/>
					</Grid>
					<Grid item xs={.5} alignContent="center">
						<DirectionsBikeIcon fontSize='large'/>
					</Grid>
					<Grid item xs={2}>
						<TextField variant='standard' defaultValue="Stockholm"/>
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