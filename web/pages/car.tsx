import {NextPage} from "next";
import Grid from "@mui/material/Unstable_Grid2";
import {
    Accordion, AccordionDetails,
    AccordionSummary,
    Button,
    Container,
    TextField,
    ToggleButton,
    ToggleButtonGroup,
    Typography
} from "@mui/material";
import React, {FormEvent, useState} from "react";
import Template from "../src/components/Template";
import {ExpandMore} from "@mui/icons-material";
import {getTypedItem, setItem} from "../src/sessionStorage";
import {CarType, ComparisonType} from "../types/sessionStorageTypes";
import {useRouter} from "next/router";

import {Staple, STAPLE_COLORS} from '../src/components/StapleDiagram';
import CarIcon from '@mui/icons-material/DirectionsCarRounded';

const vehicleTypes: {name: string, variants: {name: string, emission: number }[] }[] = [
	{name: "bil", variants: [
		{name: "bensin", emission: 168},
		{name: "diesel", emission: 188},
		{name: "el", emission: 100},
		{name: "väte", emission: 120},
		{name: "hybrid", emission: 143},
		{name: "etanol", emission: 108},
		{name: "gasol", emission: 111},
		{name: "biodiesel", emission: 179},
	]},
	{name: "Lätt lastbil", variants: [{name: "bensin", emission: 376}, {name: "diesel", emission: 421}]},
	{name: "Lastbil", variants: [{name: "bensin", emission: 1045}, {name: "diesel", emission: 1169}]},
	{name: "motorcykel", variants: [{name: "bensin", emission: 103}, {name: "diesel", emission: 115}]},
];

function getCarData(): CarType {
	const defaultData: CarType = {
		emissionPerKm: vehicleTypes[0].variants[0].emission, 
		vehicleType: vehicleTypes[0].name, 
		CO2PerLiter: "", 
		litersPerKm: ""
	};
	
	return getTypedItem<CarType>("car", defaultData);
}

export function getCarStaples(distance: number): Staple[] {
	let carData = getCarData();
	return [
		{
			title: "Car",
			icon: <CarIcon key={"Car"} />,
			parts: [
				{ color: STAPLE_COLORS.ROUTE, value: carData.emissionPerKm * distance, hint: "Emissions for the route"  }
			]
		}
	];
}

const CarSettings: NextPage = () => {

     const router = useRouter()

     const submitHandler = (event: FormEvent) => {
            event.preventDefault()
            console.log(`vehicle=${JSON.stringify(vehicle)}, emission=${emission}, distance=${data.distance}`)
            setItem("car", {emissionPerKm: emission, vehicleType: vehicleName, litersPerKm: LiterPerKm, CO2PerLiter: CO2PerLiter} as CarType)
            router.push('/comparison')
     }

     const vehicleTypes: {name: string, variants: {name: string, emission: number }[] }[] = [
         {name: "bil", variants: [
                 {name: "bensin", emission: 168},
                 {name: "diesel", emission: 188},
                 {name: "el", emission: 100},
                 {name: "väte", emission: 120},
                 {name: "hybrid", emission: 143},
                 {name: "etanol", emission: 108},
                 {name: "gasol", emission: 111},
                 {name: "biodiesel", emission: 179},
             ]},
         {name: "Lätt lastbil", variants: [{name: "bensin", emission: 376}, {name: "diesel", emission: 421}]},
         {name: "Lastbil", variants: [{name: "bensin", emission: 1045}, {name: "diesel", emission: 1169}]},
         {name: "motorcykel", variants: [{name: "bensin", emission: 103}, {name: "diesel", emission: 115}]},
     ]

     const data = getTypedItem<ComparisonType>("comparison", {from: "", to: "", distance: 0})
     const carData = getCarData();

     const [vehicle, setVehicle] = useState(vehicleTypes.find(v => v.name === carData.vehicleType) ?? vehicleTypes[0])
     const [vehicleName, setVehicleName] = useState(carData.vehicleType)
     const [emission, setEmission] = useState(carData.emissionPerKm)
     const [CO2PerLiter, setCO2PerLiter] = useState<string>(carData.CO2PerLiter)
     const [LiterPerKm, setLiterPerKm] = useState<string>(carData.litersPerKm)

     const changeVehicle = (e: React.MouseEvent, v: string) => {
         if(!v){
             return
         }

         setVehicleName(v)
         const vehicle = vehicleTypes.find(e => e.name === v)
         if(!vehicle){
             return
         }
         setVehicle(vehicle)
         setEmission(vehicle.variants[0].emission)
     }

     const changeEmissionManual = (cpl: string, lpk: string) => {
         setCO2PerLiter(cpl)
         setLiterPerKm(lpk)
         if(!cpl || !lpk){
             return
         }
         const cl = parseFloat(cpl)
         const lk = parseFloat(lpk)
         if(isNaN(cl) || isNaN(lk)){
            return
         }
         setEmission(cl / lk)
     }

     const getTotalEmission = () => {
            return emission * (data.distance ?? 0)
     }

    return (
        <Template>
            <Container maxWidth="md">
                <form onSubmit={submitHandler}>
                    <Grid container spacing={1}>
                        <Grid xs={12}>
                            <Typography variant="h3" textAlign="center"> Bil Inställningar </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Typography variant="subtitle2"> Bil typ </Typography>
                            <ToggleButtonGroup
                                size="small"
                                exclusive
                                onChange={changeVehicle}
                                value={vehicleName}
                                color="primary"
                                fullWidth
                            >
                                { vehicleTypes.map((vehicleType) => (
                                    <ToggleButton key={vehicleType.name} value={vehicleType.name}>{vehicleType.name}</ToggleButton>
                                )) }
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid xs minWidth="300px">
                            <Typography variant="subtitle2"> Bränsle typ </Typography>
                            <ToggleButtonGroup
                                size="small"
                                exclusive
                                onChange={(e,v) => v ? setEmission(v): null}
                                value={emission}
                                color="primary"
                                fullWidth
                            >
                                { vehicle.variants.map((fuelType) => (
                                    <ToggleButton key={vehicle.name + "--" + fuelType.name} value={fuelType.emission}>{fuelType.name}</ToggleButton>
                                )) }
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid xs maxWidth="120px">
                            <Typography variant="subtitle2"> Utsläpp: </Typography>
                            <Typography variant="body2"> {getTotalEmission()} g av CO2 </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMore/>}> Avancerat </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1}>
                                        <Grid xs minWidth="200px">
                                            <TextField fullWidth type="number" value={CO2PerLiter}
                                                       onChange={e => changeEmissionManual(e.target.value, LiterPerKm)}
                                                       label="Gram Koldioxid per Liter" />
                                        </Grid>
                                        <Grid xs={12} sm minWidth="200px">
                                            <TextField fullWidth type="number" label="Liter per Kilometer" value={LiterPerKm}
                                                       onChange={e => changeEmissionManual(CO2PerLiter, e.target.value)}/>
                                        </Grid>
                                        <Grid xs minWidth="200px">
                                            <TextField fullWidth type="number" value={emission}
                                                       onChange={(e) => e.target.value ? setEmission(parseFloat(e.target.value)): null} label="Gram CO2 per Kilometer" />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid xs={12}>
                            <Button type="submit" variant="contained" disabled={carData.emissionPerKm === emission} fullWidth> Spara </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Template>
    )
}

export default CarSettings
