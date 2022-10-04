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
import {BusType, ComparisonType} from "../types/sessionStorageTypes";
import {useRouter} from "next/router";

const TransitSettings: NextPage = () => {

    
    const busVariants: {type: string, emission: number}[] = [{type: "Diesel", emission: 35},{type: "Electric", emission: 25},{type: "Hydrogen", emission: 30}]

    const busData = getTypedItem<BusType>("bus", {vehicleType: busVariants[0].type, emissionPerKm: busVariants[0].emission})

    const [bus, setBus] = useState(busVariants.find(v=>v.type === busData.vehicleType) ?? busVariants[0])
    const [busType, setBusType] = useState(busData.vehicleType)
    const [busEmission, setBusEmission] = useState(busData.emissionPerKm)

    const changeBusType = (e: React.MouseEvent, v: string) => {
        if(!v){return}
        
        
        setBusType(v)
        const bus = busVariants.find(e => e.type === v)
        if(!bus){return}
        setBus(bus)
        setBusEmission(bus.emission)

        setItem("bus", {emissionPerKm: bus.emission, vehicleType: bus.type} as BusType)
    }

    return(
        <Template>
            <Container maxWidth="md">
                <Grid container spacing={1}>
                    <Grid xs={12}>
                        <Typography variant="h3" textAlign="center">Public Transport Settings{busType}</Typography>
                    </Grid>
                    <Grid xs={12}>
                        <Typography variant="subtitle2">Buss Drive Types</Typography>
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
                </Grid>
            </Container>
        </Template>
    )
}

export default TransitSettings