import type { NextPage } from 'next';
import * as React from 'react';
import { useState } from 'react';
import { borders, shadows } from "@mui/system";
import { ToggleButton, ToggleButtonGroup, Button, Container, Typography, Grid, Box, TextField, Icon } from "@mui/material";
import { getItem, setItem } from "../src/sessionStorage";
import Template from '../src/components/Template';

import { useRouter } from "next/router";

function ToggleButtonDiet() {
	const receivedItem = JSON.parse(getItem("DietType", JSON.stringify("Vegan/Vegetarian")));
	const [alignment, setAlignment] = useState(receivedItem);

	const handleChange = (
		event: React.MouseEvent<HTMLElement> | null,
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
	const receivedItem    = JSON.parse(getItem("PropulsionType", JSON.stringify("HumanPowered")));
	const [hide, setHide] = useState(receivedItem == "HumanPowered");
	const [alignment, setAlignment] = useState(receivedItem);

	const handleAlignment = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if(newAlignment !== null) {
			setItem("PropulsionType", newAlignment);
			setHide((oldState) => newAlignment == "HumanPowered");
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
							<ToggleButton value="HumanPowered"  color="info">Conventional</ToggleButton>
							<ToggleButton value="ElectricPowered" color="warning">Electric</ToggleButton>
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
	const [alignment, setAlignment] = React.useState('Bicycle');

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

	setItem("PropulsionType", "HumanPowered");
	setItem("DietType"      , "Vegan/Vegetarian");

	function PutDataIntoSession(transport : number, propulsion : number, diet : number) : void {
		/*
		transport:
			1 : Bicycle
			2 : E-Scooter
			3 : Walking
		propulsion:
			1 : Manual
			2 : Electric
		diet:
			1 : Vegan
			2 : Normal
			3 : Carnivore
		*/

		const carnivoreConstant = 4.43121361746;
		const normalConstant    = 3.51923101673;
		const veganConstant		= 2.13485714286;

		const MET_OVER_V_CONSTANT_CYCLING = 6.5/18;
		const MET_OVER_V_CONSTANT_WALKING = 3.5/4.32;

		// Create object and SetItem
	}

	return (
		<Template>
			<BicyclePage/>
		</Template>
	);
};

export default About;