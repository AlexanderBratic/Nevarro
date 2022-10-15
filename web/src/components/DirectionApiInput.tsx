
import { useState, 
		 FormEvent } from "react";
import { Autocomplete, 
		 TextField, 
		 Button, 
		 Typography, 
		 Grid } from "@mui/material";
import { dirRequest } from "../webApiUtil";
import { autoCompleteRequest } from "../webAutoCompleteApiUtil";

import {Place} from '../../types/sessionStorageTypes';
import {getItem} from '../sessionStorage';

interface DirectionApiInputProps {
	onSubmit?: () => void;
}
interface DirectionInputFieldProps {
	hint: string;
	setPlaceId: (string) => void;
}

function DirectionInputField({hint, setPlaceId}: DirectionApiInputProps) {
    const [options, setOptions] = useState<any[]>([]);
    const [currentOption, setCurrentOption] = useState(null);

    // Triggered whenever someone writes something in the boxes, one for the start and end box
    async function whenchanged(newval: string){
        if(newval.length>=4){
            let output = await autoCompleteRequest(newval);
            let newOptions: Place[] = [];
            output.predictions.forEach(function (value){
                newOptions.push({
                    description: value.description,
                    place_id: value.place_id
                });
            });
            setOptions(newOptions);
        }
    }

    return (
        <Grid xs={12} sm={6} md={5}>
            <Autocomplete
                value={currentOption}
                onChange={(event: any, newValue:any)=>{ setPlaceId(newValue); setCurrentOption(newValue);}}
                disablePortal
                id="combo-box-demo"
                options={options}
                isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
                getOptionLabel={(option) => option.description}
                sx={{ width: 300 }}
                renderInput={(params) =>
                    <TextField {...params}
                               label={hint}
                               variant='filled'
                               value={currentOption !== null ? currentOption.description : ""}
                               onChange={
                                   (event) =>
                                       whenchanged(event.target.value)
                               }
                               fullWidth/>}
            />
        </Grid>
    );
}

export default function DirectionApiInput({onSubmit}: DirectionApiInputProps){
    const [startVal, setstartVal] = useState<string | null>('');
    const [endVal, setendVal] = useState<string | null>('');

    const handleSubmit = async (event: FormEvent) => {
        // prevent refresh
        event.preventDefault()

        await dirRequest(startVal, endVal, "DRIVING");
		
		if (onSubmit !== null)
			await onSubmit();
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Typography variant="h3" component="h1" gutterBottom align="center">
                        Eco Travel Planner
                    </Typography>
                </Grid>
                <DirectionInputField hint={"Start"} setPlaceId={setstartVal} />
                <DirectionInputField hint={"End"} setPlaceId={setendVal} />
                <Grid xs>
                    <Button
                        style={{height: '100%'}}
                        variant="contained"
                        fullWidth
                        disabled={startVal === '' || endVal === '' || startVal === null || endVal === null}
                        type="submit"
                    >
                        Search
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
}