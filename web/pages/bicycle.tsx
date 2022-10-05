import type { NextPage } from 'next';
import * as React from 'react';
import { useState } from 'react';
import { borders, shadows } from "@mui/system";
import { ToggleButton, ToggleButtonGroup, Button, Container, Typography, Grid, Box, TextField, Icon } from "@mui/material";
import { getItem, setItem } from "../src/sessionStorage";
import Template from '../src/components/Template';

import { useRouter } from "next/router";

function ToggleButtonDiet() {
	const [alignment, setAlignment] = useState("Vegan/Vegetarian");

	const handleChange = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if(newAlignment !== null) {
			setItem("DietType", newAlignment);
			setAlignment(newAlignment);
		}
	}

	return (
		<Box mt={1}>
			<Grid container spacing={1}>
				<Grid item xs={1.5}>
					<Typography variant='h5'>Diet:</Typography>
				</Grid>

				<Grid item xs={10}>
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
				</Grid>
			</Grid>
		</Box>
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
			setItem("PropulsionType", (newAlignment == 'left' ? "Human" : "Electric") + "Powered");
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
				<ToggleButtonDiet/>
			)}
		</Box>
	);
}

function SaveButton() {
	const router = useRouter();
	const [linkName, setLinkName] = useState(router.pathname);

	const handleLinkName = (
		event: React.MouseEvent<HTMLElement>
	) => {
		setItem("TravelData", {CarbonFootprint: carbonEmission(470), DietType: getItem("DietType", "aa"), PropulsionType: getItem("PropulsionType", "aa")});

		setLinkName("/comparison");
		router.push("/comparison");
	};

	let carbonEmission= (distance : number) => {
		return (12 * distance / 100).toFixed(2).toString();
	};

	return (
		<Box>
			<Box mt={2} pb={1} textAlign="center" sx={{ borderBottom: 1 }}>
				<Button color="primary" variant='contained' onClick={handleLinkName}>APPLY</Button>
			</Box>
		</Box>
	);
}

function BicyclePage() {
	const [condition, setCondition] = useState(0);
	const [alignment, setAlignment] = React.useState('bicycle');

	const handleAlignment = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if(newAlignment !== null) {
			setCondition((oldNum) => nameToNum(newAlignment));
			setAlignment(newAlignment);
		}
	}

	let nameToNum = (name : string) : number => {
		if(name == "Bicycle") {
			return 0;
		}
		return (name == "Electric Scooter" ? 1 : 2);
	}
	
	return (
		<Container>
			<Typography variant='h3' textAlign="left">{alignment} Settings Page</Typography>
			<Box mt={1} mb={1}>
				
				<Container maxWidth="md" >
					<Box mb={1}>
						<Typography>Transport type</Typography>
					</Box>
					<Grid container spacing={1}>
						<ToggleButtonGroup
						fullWidth
						aria-label="outlined button group"
						value={alignment}
						exclusive
						onChange={handleAlignment}
						color="primary"
						>
							<ToggleButton value="Bicycle">Bicycle</ToggleButton>
							<ToggleButton value="Electric Scooter">Electric Scooter</ToggleButton>
							<ToggleButton value="Walking">Walking</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
				</Container>
				<Box mt={2}>
					{condition == 0 && ( <DietAndFuel/> )}
					{condition == 2 && ( <ToggleButtonDiet/> )}
					<SaveButton/>
				</Box>
			</Box>
			
		</Container>
		
	);
	
}

const About: NextPage = () => {

	setItem("PropulsionType", "Human Powered");
	setItem("DietType"      , "Vegan/Vegetarian");

	return (
		<Template>
			<BicyclePage/>
		</Template>
	);
};

export default About;