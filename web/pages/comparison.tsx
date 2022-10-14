import * as React from 'react';

import Image from 'next/image';

import {Box, TextField, Button} from '@mui/material';

import type { NextPage } from 'next';
import Template from '../src/components/Template';
import {Staple, StapleDiagram, STAPLE_COLORS} from '../src/components/StapleDiagram';

import {ComparisonType} from '../types/sessionStorageTypes';
import {setItem, getItem, getTypedItem } from '../src/sessionStorage';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AirplaneIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooterRounded';
import WalkIcon from '@mui/icons-material/DirectionsWalkRounded';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ItemsJson from "../src/items.json";
import Grid from "@mui/material/Unstable_Grid2";
import {dirRequest} from "../src/webApiUtil";
import {useRouter} from "next/router";
import {getCarStaples} from './car';
import {getBicycleStaples} from './bicycle';
import {getPublicTransportStaples} from './public-transport';
import { useState } from 'react';

const ComparisonPage: NextPage = () => {

	let [comparisonData, setComparisonData] = useState(getTypedItem<ComparisonType>('comparison', {to:'', from:'', distance:10}));
	const [from, setFrom] = React.useState(comparisonData.from);
	const [to, setTo] = React.useState(comparisonData.to);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        // prevent refresh
        event.preventDefault()
        //setItem("comparison", {from, to});
        await dirRequest(from, to, "DRIVING");

        setComparisonData(getTypedItem<ComparisonType>('comparison', {to:'', from:'', distance:0}));
    }

	const [stapleState, setStaples] = useState<Staple[]>([
		...getCarStaples(comparisonData.distance),
		...getPublicTransportStaples(comparisonData.distance),
		...getBicycleStaples(comparisonData.distance)
	]);


	const [itemsState, setItems] = useState(ItemsJson.Items);

	let css1 = {
		transition: "all 0.2s",
		opacity: "100%",
		borderRadius: "5px",
		"&:hover": {opacity: "80%",}
	};

	let css2 = {
		transition: "all 0.2s",
		opacity: "100%",
		filter: "contrast(120%)",
		borderRadius: "30px",
		border: "solid 5px darkgreen",
		"&:hover": {opacity: "80%",}
	};
	
	const handleClick = (event: {title: string, img: string, co2: number, clicked: boolean}) => {
		console.log(event.title + ' image clicked');

		setStaples((prevState: Staple[]) => {
			const item = prevState.find(obj => {return obj.title == event.title});
			if (typeof item === 'undefined') {
				return [...prevState, {
					title: event.title,
					icon: <CoffeeIcon/>,
					parts: [
						{color: STAPLE_COLORS.PRODUCTION, value: event.co2, hint: "Production emissions"}
					]
				}];
			} else{
				return prevState.filter(obj => {return obj.title != event.title});
			}
		});
		setItems(prevState => {
			const newList = prevState.map(obj => {
				if (obj.title === event.title) {
					return {...obj, clicked: !event.clicked, css: event.clicked ? css1 : css2}; //toggle boolean clicked + change css
				}
				return obj;
			});
			return newList;
		});
	};

	let Everyday_image_list = (
		<ImageList sx={{}} cols={6} >
		  {itemsState.map((item) => (
			<ImageListItem key={item.img} onClick={() => handleClick(item)} sx={item.css}>
			  <Image src={item.img + "?w=165&fit=crop&auto=format"} alt="" width={165} height={165} layout="responsive" style={{borderRadius: item.css.borderRadius,}}/>
			  <ImageListItemBar
				title={item.title}
				subtitle={`Co2e: ${item.co2}g`}
				style={{borderRadius: item.css.borderRadius,}}
			  />
			</ImageListItem>
		  ))}
		</ImageList>
	  );


	return (
		<Template>
			<Box>
				<h1>Comparison</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm>
                            <TextField label="Start" fullWidth value={from} onChange={e => setFrom(e.target.value)} />
                        </Grid>
                        <Grid xs={12} sm>
                            <TextField label="Destination" fullWidth value={to} onChange={e => setTo(e.target.value)} />
                        </Grid>
                        <Grid xs sm={1}>
                            <Button style={{height: '100%'}} fullWidth type="submit" variant="contained" disabled={to === '' || from === ''}> Search </Button>
                        </Grid>
                    </Grid>
                </form>

				<StapleDiagram staples={stapleState} />
			</Box>
			<Box>
				{Everyday_image_list}
			</Box>
		</Template>
	);
}


export default ComparisonPage;
