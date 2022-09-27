import * as React from 'react';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import type { NextPage } from 'next';
import Template from '../src/components/Template';
import StapleDiagram from '../src/components/StapleDiagram';
import {setItem, getItem } from '../src/sessionStorage';

import CarIcon from '@mui/icons-material/DirectionsCarRounded';
import AirplaneIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import PublicTransportIcon from '@mui/icons-material/CommuteRounded';
import BikeIcon from '@mui/icons-material/DirectionsBikeRounded';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooterRounded';
import WalkIcon from '@mui/icons-material/DirectionsWalkRounded';



const ComparisonPage: NextPage = () => {
	const [count, actuallySetCount] = React.useState(getItem('comparison-count', 0));

	function setCount(value: number) {
		setItem('comparison-count', value);
		actuallySetCount(value);
	}

	let stapleData = {
		"car": {
			title: "Car",
			icon: <CarIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		"plane": {
			title: "Plane",
			icon: <AirplaneIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		"public-transport": {
			title: "Public Transport",
			icon: <PublicTransportIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		"bicycle": {
			title: "Bicycle",
			icon: <BikeIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		"electric-scooter": {
			title: "Electric Scooter",
			icon: <ElectricScooterIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		},
		"walking": {
			title: "Walking",
			icon: <WalkIcon />,
			parts: [
				{ color: 0xf1c40f, value: 20, hint: "Production emissions"  },
				{ color: 0xecf0f1, value: 50, hint: "Emissions for the route"  }
			]
		}
	};

	return (
        <Template>
            <Box>
                <h1>Comparison {count}</h1>
                <Button onClick={() => setCount(count + 1)}>Increment</Button>

                <StapleDiagram staples={stapleData} />
            </Box>
        </Template>
	);
}

export default ComparisonPage;
