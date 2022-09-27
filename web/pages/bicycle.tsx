import type { NextPage } from 'next';
import * as React from 'react';
import {ToggleButton, ToggleButtonGroup, Container, Typography, Grid} from "@mui/material";
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

	return;
}

function BicyclePage() {
	
	return (
		<Container>
			<Typography variant='h3' textAlign="left">Bicycle Settings</Typography>
			<div>
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
			</div>
			<div>
				<Grid container spacing={1}>
					<Grid item xs={1.5} alignContent="">
						<Typography variant='h5'>Bike Type:</Typography>
					</Grid>

					<Grid item xs={1}>
						<ToggleButtonGroup aria-label="outlined button group">
							<ToggleButton value="left">Conventional</ToggleButton>
							<ToggleButton value="right">Electric</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
				</Grid>
			</div>
			<div>
				<Grid container spacing={1}>
					<Grid item xs={1.5} alignContent="">
						<Typography variant='h5'>Diet:</Typography>
					</Grid>

					<Grid item xs={1}>
						<ToggleButtonGroup aria-label="outlined button group">
							<ToggleButton value="left" color='secondary'>Vegan/Vegetarian</ToggleButton>
							<ToggleButton value="center">Normal</ToggleButton>
							<ToggleButton value="right">Carnivore</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
				</Grid>
			</div>
		</Container>
		
	);
	
}

const About: NextPage = () => {

  return (
		<Template page={BicyclePage} />
  );
};

export default About;