import type { NextPage } from 'next';
import * as React from 'react';
import { useState } from 'react';
import {ToggleButton, ToggleButtonGroup, Container, Typography, Grid, Box} from "@mui/material";
import Template from '../src/components/Template';
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike';

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
						<Grid item xs={1.5} alignContent="">
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
					<Grid item xs={5.5}>
						<Typography variant='h4' textAlign="right">Göteborg</Typography>
					</Grid>
					<Grid item xs={.5} alignContent="center">
						<DirectionsBikeIcon fontSize='large'/>
					</Grid>
					<Grid item xs={5}>
						<Typography variant='h4'>Stockholm: 470km</Typography>
					</Grid>
				</Grid>
				<DietAndFuel/>
			</Box>
			
		</Container>
		
	);
	
}

const About: NextPage = () => {

	return (
		<Template page={BicyclePage} />
	);
};

export default About;