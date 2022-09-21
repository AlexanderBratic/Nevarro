import {NextPage} from "next";
import Grid from "@mui/material/Unstable_Grid2";
import {Button, Container, TextField, ToggleButton, ToggleButtonGroup, Typography} from "@mui/material";
import {FormEvent, useState} from "react";

 const Carsettings: NextPage = () => {

     const submitHandler = (event: FormEvent) => {
            event.preventDefault()
            console.log(`reg=${reg}, vehicle=${vehicle}, fuel=${fuel}`)
     }

     const vehicleTypes = [ "Bil", "Elbil", "Lastbil", "Buss", "SUV" ]
     const fuelTypes = [ "Bensin", "Diesel", "El", "Biogas" ]

     const [vehicle, setVehicle] = useState(vehicleTypes[0])
     const [fuel, setFuel] = useState(fuelTypes[0])
     const [reg, setReg] = useState("")

    return (
        <Container maxWidth="md">
            <form onSubmit={submitHandler}>
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        <Typography variant="h3" textAlign="center"> Bil Inställningar </Typography>
                    </Grid>
                    <Grid xs>
                        <TextField
                            label="Registreringsnummer"
                            variant="filled"
                            fullWidth
                            value={reg}
                            onChange={(event) => setReg(event.target.value)}
                        />
                    </Grid>
                    <Grid xs>
                        <Typography variant="subtitle2"> Bil typ </Typography>
                        <ToggleButtonGroup
                            size="small"
                            exclusive
                            onChange={(e,v) => setVehicle(v)}
                            value={vehicle}
                            color="primary"
                            fullWidth
                        >
                            { vehicleTypes.map((vehicleType) => (
                                <ToggleButton value={vehicleType}>{vehicleType}</ToggleButton>
                            )) }
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid xs>
                        <Typography variant="subtitle2"> Bränsle typ </Typography>
                        <ToggleButtonGroup
                            size="small"
                            exclusive
                            onChange={(e,v) => setFuel(v)}
                            value={fuel}
                            color="primary"
                            fullWidth
                        >
                            { fuelTypes.map((fuelType) => (
                                <ToggleButton value={fuelType}>{fuelType}</ToggleButton>
                            )) }
                        </ToggleButtonGroup>
                    </Grid>
                    <Grid xs={12}>
                        <Button type="submit" variant="contained" fullWidth> Spara </Button>
                    </Grid>
                </Grid>
            </form>
        </Container>
    )
}

export default Carsettings
