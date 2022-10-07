import * as React from 'react';

import Image from 'next/image';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import type { NextPage } from 'next';
import Template from '../src/components/Template';
import {Staple, StapleDiagram} from '../src/components/StapleDiagram';

import {ComparisonType} from '../types/sessionStorageTypes';
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
import CoffeeIcon from '@mui/icons-material/Coffee';

import ItemsJson from "../src/items.json";
import {useState, useEffect} from "react";

import {getCarCo2PerKm} from './car';
import {getBicycleCo2PerKm} from './bicycle';
import {getTrainCo2PerKm, getBusCo2PerKm} from './public-transport';

const ComparisonPage: NextPage = () => {

	const route_color      = 0x9b59b6;
	const production_color = 0xf1c40f;
	
	const comparisonData = getTypedItem<ComparisonType>("comparison", {from: "", to: "", distance: 10});
	const carCo2PerKm = getCarCo2PerKm();
	const bicycleCo2PerKm = getBicycleCo2PerKm();
	const trainCo2PerKm = getTrainCo2PerKm();
	const busCo2PerKm = getBusCo2PerKm();


	const [stapleState, setStaples] = useState<Staple[]>([
		{
			title: "Car",
			icon: <CarIcon key={"Car"} />,
			parts: [
				{ color: route_color, value: carCo2PerKm * comparisonData.distance, hint: "Emissions for the route"  }
			]
		},
		{ 
			title: "Train",
			icon: <PublicTransportIcon key={"Public Transport"} />,
			parts: [
				{ color: route_color, value: trainCo2PerKm * comparisonData.distance, hint: "Emissions for the route"  }
			]
		},
		{ 
			title: "Bus",
			icon: <PublicTransportIcon key={"Public Transport"} />,
			parts: [
				{ color: route_color, value: busCo2PerKm * comparisonData.distance, hint: "Emissions for the route"  }
			]
		},
		{
			title: "Bicycle",
			icon: <BikeIcon key={"Bicycle"} />,
			parts: [
				{ color: route_color, value: bicycleCo2PerKm * comparisonData.distance, hint: "Emissions for the route"  }
			]
		}
	]);
	
	const handleClick = (event: {title: string, img: string, co2: number}) => {
		console.log(event.title + ' image clicked');

		setStaples((prevState: Staple[]) => {
			const item = prevState.find(obj => {return obj.title == event.title});
			if (typeof item === 'undefined') {
				return [...prevState, {
					title: event.title,
					icon: <CoffeeIcon/>,
					parts: [
						{color: production_color, value: event.co2 / 1000, hint: "Production emissions"}
					]
				}];
			} else{
				return prevState.filter(obj => {return obj.title != event.title});
			}
		});
	};

	let css = {
		transition: "opacity 0.2s",
		"&:hover": {
			opacity: "80%"
		}
	};

	let Everyday_image_list = (
		<ImageList sx={{}} cols={4} >
		  {ItemsJson.Items.map((item) => (
			<ImageListItem key={item.img} onClick={() => handleClick(item)} sx={css}>
			  <Image src={item.img + "?w=248&fit=crop&auto=format"} alt="" width={248} height={248} layout="responsive"/>
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
				<StapleDiagram staples={stapleState} />
			</Box>
			<Box>
				{Everyday_image_list}
			</Box>
		</Template>
	);
}


export default ComparisonPage;
