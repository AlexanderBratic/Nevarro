import {NextPage} from "next";
import Grid from "@mui/material/Unstable_Grid2";
import {
    Container,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import React, {useState} from "react";
import Template from "../src/components/Template";
import {getTypedItem, setItem} from "../src/sessionStorage";
import {BusType, TrainType} from "../types/sessionStorageTypes";
import {Staple, STAPLE_COLORS} from '../src/components/StapleDiagram';
import ItemsJson from "../src/co2_transport.json";
import PublicTransportIcon from '@mui/icons-material/CommuteRounded';

const busVariants: {type: string, emission: number}[] = ItemsJson.Transport.find(t=>t.title == "Bus")?.variants as any
const trainVariants: {type: string, emission: number}[] = ItemsJson.Transport.find(t=>t.title == "Train")?.variants as any

function getTrainData(): TrainType {
	const defaultData: TrainType = {
		vehicleType: trainVariants[0].type,
		emissionPerKm: trainVariants[0].emission
	};
	
	return getTypedItem<TrainType>("train", defaultData);
}

function getBusData(): BusType {
	const defaultData: BusType = {
		vehicleType: busVariants[0].type,
		emissionPerKm: busVariants[0].emission
	};
	
	return getTypedItem<TrainType>("bus", defaultData);
}

export function getPublicTransportStaples(distance: number): Staple[] {
	let busData   = getBusData();
	let trainData = getTrainData();
	return [
		{ 
			title: "Train",
			icon: <PublicTransportIcon key={"Public Transport"} />,
			parts: [
				{ color: STAPLE_COLORS.ROUTE, value: trainData.emissionPerKm * distance, hint: "Emissions for the route"  }
			]
		},
		{ 
			title: "Bus",
			icon: <PublicTransportIcon key={"Public Transport"} />,
			parts: [
				{ color: STAPLE_COLORS.ROUTE, value: busData.emissionPerKm * distance, hint: "Emissions for the route"  }
			]
		}
	];
}

const TransitSettings: NextPage = () => {

    const busData = getBusData()
    const trainData = getTrainData()

    const [bus, setBus] = useState(busVariants.find(v=>v.type === busData.vehicleType) ?? busVariants[0])
    let [busType, setBusType] = useState(busData.vehicleType)
    const [busEmission, setBusEmission] = useState(busData.emissionPerKm)
    const [train, setTrain] = useState(trainVariants.find(v=>v.type === trainData.vehicleType) ?? trainVariants[0])
    let [trainType, setTrainType] = useState(trainData.vehicleType)
    const [trainEmission, setTrainEmission] = useState(trainData.emissionPerKm)
    busType = getBusData().vehicleType
    trainType = getTrainData().vehicleType
    
    const changeBusType = (e: React.MouseEvent, v: string) => {
        if(!v){return}

        setBusType(v)
        const bus = busVariants.find(e => e.type === v)

        if(!bus){return}

        setBus(bus)
        setBusEmission(bus.emission)

        setItem("bus", {emissionPerKm: bus.emission, vehicleType: bus.type} as BusType)
    }
    const changeTrainType = (e: React.MouseEvent, v: string) => {
        if(!v){return}

        setTrainType(v)
        const train = trainVariants.find(e => e.type === v)

        if(!train){return}

        setTrain(train)
        setTrainEmission(train.emission)

        setItem("train", {emissionPerKm: train.emission, vehicleType: train.type} as TrainType)
    }




    return(
        <Template>
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        <Typography variant="h3" textAlign="center">Public Transport Settings</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography>Buss Drive Types</Typography>
                        <ToggleButtonGroup
                                size="small"
                                exclusive
                                onChange={changeBusType}
                                value={busType}
                                color="primary"
                                fullWidth
                            >
                            { busVariants.map((transitTypes) => (
                                    <ToggleButton key={transitTypes.type} value={transitTypes.type}>{transitTypes.type}</ToggleButton>
                                )) }
                        </ToggleButtonGroup>    
                    </Grid>
                    <Grid xs={12}>
                        <Typography>Train Drive Types</Typography>
                        <ToggleButtonGroup
                                size="small"
                                exclusive
                                onChange={changeTrainType}
                                value={trainType}
                                color="primary"
                                fullWidth
                            >
                            { trainVariants.map((transitTypes) => (
                                    <ToggleButton key={transitTypes.type} value={transitTypes.type}>{transitTypes.type}</ToggleButton>
                                )) }
                        </ToggleButtonGroup>    
                    </Grid>
                </Grid>
            </Container>
        </Template>
    )
}

export default TransitSettings