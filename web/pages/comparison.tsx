import * as React from 'react';

import {Box, TextField, Button} from '@mui/material';

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
import Grid from "@mui/material/Unstable_Grid2";
import { ComparisonType } from '../types/sessionStorageTypes';
import {dirRequest} from "../src/webApiUtil";
import {useRouter} from "next/router";
import {useState} from "react";

const ComparisonPage: NextPage = () => {

	let [data, setData] = useState(getTypedItem<ComparisonType>('comparison', {to:'', from:'', distance:0}));
	const [from, setFrom] = React.useState(data.from);
	const [to, setTo] = React.useState(data.to);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        // prevent refresh
        event.preventDefault()
        //setItem("comparison", {from, to});
        await dirRequest(from, to, "DRIVING");

        setData(getTypedItem<ComparisonType>('comparison', {to:'', from:'', distance:0}));
    }

	let stapleData = [
		{
			title: "Car",
			icon: <CarIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		{
			title: "Plane",
			icon: <AirplaneIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		{
			title: "Public Transport",
			icon: <PublicTransportIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		{
			title: "Bicycle",
			icon: <BikeIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		{
			title: "Electric Scooter",
			icon: <ElectricScooterIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		{
			title: "Walking",
			icon: <WalkIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
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
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm>
                            <TextField label="from" fullWidth value={from} onChange={e => setFrom(e.target.value)} />
                        </Grid>
                        <Grid xs={12} sm>
                            <TextField label="to" fullWidth value={to} onChange={e => setTo(e.target.value)} />
                        </Grid>
                        <Grid xs sm={1}>
                            <Button style={{height: '100%'}} fullWidth type="submit" variant="contained" disabled={to === '' || from === ''}> Sök </Button>
                        </Grid>
                    </Grid>
                </form>

				<StapleDiagram staples={stapleData} />
			</Box>
			<Box>
				{Everyday_image_list}
			</Box>
		</Template>
	);
}


export default ComparisonPage;
