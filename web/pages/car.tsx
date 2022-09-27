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
import {FormEvent, useState} from "react";
import Template from "../src/components/Template";
import {ExpandMore} from "@mui/icons-material";

 const CarSettings: NextPage = () => {

     const submitHandler = (event: FormEvent) => {
            event.preventDefault()
            console.log(`reg=${reg}, vehicle=${vehicle}, fuel=${fuel}`)
     }

     const vehicleTypes = [ "bil", "lastbil", "skåpbil", "combi", "buss", "suv" ]
     const fuelTypes = [ "bensin", "diesel", "el", "biogas", "etanol" ]

     const [vehicle, setVehicle] = useState(vehicleTypes[0])
     const [fuel, setFuel] = useState(fuelTypes[0])
     const [reg, setReg] = useState("")

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
                                onChange={(e,v) => v ? setVehicle(v): null}
                                value={vehicle}
                                color="primary"
                                fullWidth
                            >
                                { vehicleTypes.map((vehicleType) => (
                                    <ToggleButton value={vehicleType}>{vehicleType}</ToggleButton>
                                )) }
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid xs minWidth="300px">
                            <Typography variant="subtitle2"> Bränsle typ </Typography>
                            <ToggleButtonGroup
                                size="small"
                                exclusive
                                onChange={(e,v) => v ? setFuel(v): null}
                                value={fuel}
                                color="primary"
                                fullWidth
                            >
                                { fuelTypes.map((fuelType) => (
                                    <ToggleButton value={fuelType}>{fuelType}</ToggleButton>
                                )) }
                            </ToggleButtonGroup>
                        </Grid>
                        <Grid xs maxWidth="90px">
                            <Typography variant="subtitle2"> Utsläpp: </Typography>
                            <Typography variant="body2"> 0.0 CO2/km </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <Accordion>
                                <AccordionSummary expandIcon={<ExpandMore/>}> Avancerat </AccordionSummary>
                                <AccordionDetails>
                                    <Grid container spacing={1}>
                                        <Grid xs={12} md={6}>
                                            <TextField fullWidth label="Koldioxid per Liter" />
                                        </Grid>
                                        <Grid xs>
                                            <TextField fullWidth label="Liter per Kilometer" />
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
