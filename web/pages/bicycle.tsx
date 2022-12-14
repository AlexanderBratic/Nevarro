import type { NextPage } from 'next';
import * as React from 'react';
import { useState } from 'react';
import { ToggleButton, ToggleButtonGroup, Container, Typography, Grid, Box } from "@mui/material";
import Template from '../src/components/Template';
import { BicycleType } from '../types/sessionStorageTypes'
import { getTypedItem, updateItemObj } from "../src/sessionStorage";

import {Staple, STAPLE_COLORS} from '../src/components/StapleDiagram';
import BikeIcon from '@mui/icons-material/DirectionsBikeRounded';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooterRounded';
import WalkingIcon from '@mui/icons-material/DirectionsWalkRounded';

const transports = ["Bicycle", "E-Scooter", "Walking"];
const diets 	 = ["Vegan", "Normal", "Carnivore"];
const fuels 	 = ["Manual", "Electric"];

const transports_icons = [
	<BikeIcon key={"Bicycle"} />, 
	<ElectricScooterIcon key={"ElectricScooter"} />, 
	<WalkingIcon key={"Walking"} />
];

const emissionArr = [transports[0], diets[0], fuels[0]];

function ToggleButtonDiet() {
	const receivedItem = emissionArr[1];
	const [alignment, setAlignment] = useState(receivedItem);

	const handleChange = (
		event: React.MouseEvent<HTMLElement> | null,
		newAlignment: string | null
	) => {
		if(newAlignment !== null) {
			emissionArr[1] = newAlignment;
			setAlignment(newAlignment);

			PutDataIntoSession(
				transports.indexOf(emissionArr[0]) + 1,
				fuels.indexOf(emissionArr[2]) + 1,
				 diets.indexOf(emissionArr[1])
			);
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
								<ToggleButton value="Vegan" color='secondary'>Vegan/Vegetarian</ToggleButton>
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
	const receivedItem = emissionArr[2];
	const [hide, setHide] = useState(receivedItem == "Manual");
	const [alignment, setAlignment] = useState(receivedItem);

	const handleAlignment = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if(newAlignment !== null) {
			emissionArr[2] = newAlignment;
			setHide((oldState) => newAlignment == "Manual");
			setAlignment(newAlignment);

			PutDataIntoSession(
				transports.indexOf(emissionArr[0]) + 1,
				fuels.indexOf(emissionArr[2]) + 1,
				 diets.indexOf(emissionArr[1])
			);
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
							<ToggleButton value="Manual"  color="info">Conventional</ToggleButton>
							<ToggleButton value="Electric" color="warning">Electric</ToggleButton>
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

function BicyclePage() {
	const receivedItem = emissionArr[0];
	const [condition, setCondition] = useState(transports.indexOf(receivedItem));
	const [alignment, setAlignment] = useState(receivedItem);

	const handleAlignment = (
		event: React.MouseEvent<HTMLElement>,
		newAlignment: string | null
	) => {
		if(newAlignment !== null) {
			emissionArr[0] = newAlignment;
			setCondition((oldNum) => transports.indexOf(newAlignment));
			setAlignment(newAlignment);

			PutDataIntoSession(
				transports.indexOf(emissionArr[0]) + 1,
				fuels.indexOf(emissionArr[2]) + 1,
				 diets.indexOf(emissionArr[1])
			);
		}
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
							<ToggleButton value="E-Scooter">Electric Scooter</ToggleButton>
							<ToggleButton value="Walking">Walking</ToggleButton>
						</ToggleButtonGroup>
					</Grid>
				</Container>
				<Box mt={2}>
					{condition == 0 && ( <DietAndFuel/> )}
					{condition == 2 && ( <ToggleButtonDiet/> )}
				</Box>
			</Box>
			
		</Container>
		
	);
	
}

function getBicycleData(): BicycleType {
	const defaultData: BicycleType = {
		vehicleType: "Bicycle",
		porpulsionType: "Manual",
		emissionPerKm: 52.18539682546667
	};
	
	return getTypedItem<BicycleType>("bicycle", defaultData);
}

export function getBicycleStaples(distance: number): Staple[] {
	let bicycleData = getBicycleData();
	
	let Icon: any = null;
	for (let i = 0; i < transports.length && i < transports_icons.length; i++) {
		if (bicycleData.vehicleType === transports[i]) {
			Icon = transports_icons[i];
			break;
		}
	}
	if (Icon == null)
		Icon = transports_icons[0];
	
	return [
		{
			title: bicycleData.vehicleType,
			icon: Icon,
			parts: [
				{ color: STAPLE_COLORS.ROUTE, value: bicycleData.emissionPerKm * distance, hint: "Emissions for the route"  }
			]
		}
	];
}


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
		0 : Vegan
		1 : Normal
		2 : Carnivore
	*/

	let transportType = "Bicycle";
	let driveType     = "Manual";

	const carnivoreConstant = 4.43121361746;
	const normalConstant    = 3.51923101673;
	const veganConstant		= 2.13485714286;

	const dietConst = [veganConstant, normalConstant, carnivoreConstant];

	const MET_OVER_V_CONSTANT_CYCLING = (6.5 - 1)/18;   // Accounting for BMR potential erroneous calculation
	const MET_OVER_V_CONSTANT_WALKING = (3.5 - 1)/4.32; // Accounting for BMR potential erroneous calculation

	const SWEDEN_CO2_PER_Wh = 0.017; /* g/Wh */

	const eBikeWattsPerKm  = 18;
	const eScooterWattsPer = 13.5;

	let emissionPerKm = 0;
	
	if(transport == 1) {
		if(propulsion == 1) {
			emissionPerKm = dietConst[diet] * 80 * MET_OVER_V_CONSTANT_CYCLING;
		} else {
			emissionPerKm = SWEDEN_CO2_PER_Wh * eBikeWattsPerKm;
			driveType 	  = "Electric";
		}
	} else if(transport == 2) {
		emissionPerKm = SWEDEN_CO2_PER_Wh * eScooterWattsPer;
		transportType = "E-Scooter";
		driveType 	  = "Electric";

	} else if(transport == 3) {
		emissionPerKm = dietConst[diet] * 80 * MET_OVER_V_CONSTANT_WALKING;
		transportType = "Walking";
	}

	// Create object and SetItem
	let emissionData : BicycleType = {
		vehicleType: transportType,
		porpulsionType: driveType,
		emissionPerKm: emissionPerKm
	};

	updateItemObj("bicycle", emissionData);
}

const About: NextPage = () => {

	return (
		<Template>
			<BicyclePage/>
		</Template>
	);
};

export default About;