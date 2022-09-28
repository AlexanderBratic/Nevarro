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
import {getTypedItem} from "../src/sessionStorage";
import {ComparisonType} from "../types/sessionStorageTypes";

 const CarSettings: NextPage = () => {

     const submitHandler = (event: FormEvent) => {
            event.preventDefault()
            console.log(`vehicle=${JSON.stringify(vehicle)}, emission=${emission}, distance=${data.distance}`)
     }

     const data = getTypedItem<ComparisonType>("comparison", {from: "", to: "", distance: 1})

     const vehicleTypes: {name: string, variants: {name: string, emission: number }[] }[] = [
         {name: "suv", variants: [{name: "bensin", emission: 0.1694}]},
         {name: "car", variants: [{name: "bensin", emission: 0.136}, {name: "diesel", emission: 0.119}]},
         {name: "motorcycle", variants: [{name: "bensin", emission: 0.075}]},
     ]

     const [vehicle, setVehicle] = useState(vehicleTypes[0])
     const [vehicleName, setVehicleName] = useState(vehicle.name)
     const [emission, setEmission] = useState(vehicleTypes[0].variants[0].emission)
     const [CO2PerLiter, setCO2PerLiter] = useState<"" | number>("")
     const [LiterPerKm, setLiterPerKm] = useState<"" | number>("")

     const changeVehicle = (e: React.MouseEvent, v: string) => {
         if(!v){
             return
         }

         console.log(v)
         setVehicleName(v)
         const vehicle = vehicleTypes.find(e => e.name === v)
         if(!vehicle){
             return
         }
         setVehicle(vehicle)
         setEmission(vehicle.variants[0].emission)
     }

     const changeEmissionManual = () => {
         if(!CO2PerLiter || !LiterPerKm){
             return
         }
         setEmission(CO2PerLiter / LiterPerKm)
     }

     const getTotalEmission = () => {
            return emission * (data.distance ?? 1)
     }

    return (
        <Template>
            <Container maxWidth="md">
                <form onSubmit={submitHandler}>
                    <Grid container spacing={1}>
                        <Grid xs={12}>
                            <Typography variant="h3" textAlign="center"> Bil Inställningar </Typography>
                        </Grid>
                        <Grid xs minWidth="300px">
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
                                    <ToggleButton value={fuelType.emission}>{fuelType.name}</ToggleButton>
                                )) }
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid xs maxWidth="90px">
                            <Typography variant="subtitle2"> Utsläpp: </Typography>
                            <Typography variant="body2"> {getTotalEmission()} CO2 kg </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMore/>}> Avancerat </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1}>
                                        <Grid xs minWidth="200px">
                                            <TextField fullWidth type="number" value={CO2PerLiter}
                                                       onChange={e => {setCO2PerLiter(parseFloat(e.target.value)); changeEmissionManual()}}
                                                       label="KG Koldioxid per Liter" />
                                        </Grid>
                                        <Grid xs minWidth="200px">
                                            <TextField fullWidth type="number" label="Liter per Kilometer" value={LiterPerKm}
                                                       onChange={e => {setLiterPerKm(parseFloat(e.target.value)); changeEmissionManual()}}/>
                                        </Grid>
                                        <Grid xs minWidth="200px">
                                            <TextField fullWidth type="number" value={emission}
                                                       onChange={(e) => setEmission(parseFloat(e.target.value))} label="KG CO2 per Kilometer" />
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>
                        </Grid>
                        <Grid xs={12}>
                            <Button type="submit" variant="contained" fullWidth> Spara </Button>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </Template>
    )
}

export default CarSettings
