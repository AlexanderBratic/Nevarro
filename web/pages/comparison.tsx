import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import type { NextPage } from 'next';
import Template from '../src/components/Template';
import StapleDiagram from '../src/components/StapleDiagram';
import {setItem, getItem } from '../src/sessionStorage';

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

const ComparisonPage: NextPage = () => {
	const [count, actuallySetCount] = React.useState(getItem('comparison-count', 0));
	
	
	function setCount(value: number) {
		setItem('comparison-count', value);
		actuallySetCount(value);
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
				<h1>Comparison {count}</h1>
				<Button onClick={() => setCount(count + 1)}>Increment</Button>
				
				<StapleDiagram staples={stapleData} />
			</Box>
			<Box>
				{Everyday_image_list}
			</Box>
		</Template>
	);
}


export default ComparisonPage;
