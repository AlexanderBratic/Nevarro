import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import type { NextPage } from 'next';
import Template from '../src/components/Template';
import StapleDiagram from '../src/components/StapleDiagram';
import {setItem, getItem, getTypedItem } from '../src/sessionStorage';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import CarIcon from '@mui/icons-material/DirectionsCarRounded';
import AirplaneIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import PublicTransportIcon from '@mui/icons-material/CommuteRounded';
import BikeIcon from '@mui/icons-material/DirectionsBikeRounded';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooterRounded';
import WalkIcon from '@mui/icons-material/DirectionsWalkRounded';

import ItemsJson from "../src/items.json";

import {getCarCo2PerKm} from './car.tsx';
import {getBicycleCo2PerKm} from './bicycle.tsx';
import {getTrainCo2PerKm, getBusCo2PerKm} from './public-transport.tsx';

const ComparisonPage: NextPage = () => {

	const staple_color = 0x9b59b6;
	
	let comparisonData = getTypedItem<ComparisonType>("comparison", {from: "", to: "", distance: 10});
	let carCo2PerKm = getCarCo2PerKm();
	let bicycleCo2PerKm = getBicycleCo2PerKm();
	let trainCo2PerKm = getTrainCo2PerKm();
	let busCo2PerKm = getBusCo2PerKm();
	
	let stapleData = [
		{ 
			title: "Car",
			icon: <CarIcon key={"Car"} />,
			parts: [
				{ color: staple_color, value: carCo2PerKm * comparisonData.distance, hint: "Emissions for the route"  }
			]
		},
		{ 
			title: "Train",
			icon: <PublicTransportIcon key={"Public Transport"} />,
			parts: [
				{ color: staple_color, value: trainCo2PerKm * comparisonData.distance, hint: "Emissions for the route"  }
			]
		},
		{ 
			title: "Bus",
			icon: <PublicTransportIcon key={"Public Transport"} />,
			parts: [
				{ color: staple_color, value: busCo2PerKm * comparisonData.distance, hint: "Emissions for the route"  }
			]
		},
		{ 
			title: "Bicycle",
			icon: <BikeIcon key={"Bicycle"} />,
			parts: [
				{ color: staple_color, value: bicycleCo2PerKm * comparisonData.distance, hint: "Emissions for the route"  }
			]
		}
	];
	

	let Everyday_image_list = (
		<ImageList sx={{ }} cols={4} >
		  {ItemsJson.Items.map((item) => (
			<ImageListItem key={item.img}>
			  <img
				src={`${item.img}?w=248&fit=crop&auto=format`}
				srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
				alt={`Item: ${item.title}: ${item.co2}`}
				loading="lazy"
			  />
			  <ImageListItemBar
				title={item.title}
				subtitle={`Co2e: ${item.co2}g`}
			  />
			</ImageListItem> 
		  ))}
		</ImageList>
	  );

	return (
		<Template>
			<Box>
				<h1>Comparison</h1>
				<StapleDiagram staples={stapleData} />
			</Box>
			<Box>
				{Everyday_image_list}
			</Box>
		</Template>
	);
}


export default ComparisonPage;
