
import { useState, 
		 FormEvent } from "react";
import { Autocomplete, 
		 TextField, 
		 Button, 
		 Typography } from "@mui/material";
import   Grid2  from '@mui/material/Unstable_Grid2';
import { dirRequest } from "../webApiUtil";
import { autoCompleteRequest } from "../webAutoCompleteApiUtil";

import {Place} from '../../types/sessionStorageTypes';
import {getItem} from '../sessionStorage';

interface DirectionApiInputProps {
	onSubmit?: () => void;
}
interface DirectionInputFieldProps {
	hint: string;
	setPlaceId: (place: Place) => void;
}

function DirectionInputField({hint, setPlaceId}: DirectionInputFieldProps) {
    const [options, setOptions] = useState<Place[]>([]);
    const [currentOption, setCurrentOption] = useState<Place|null>(null);

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
        <Grid2 xs={12} sm={6} md={5}>
            <Autocomplete
                value={currentOption}
                onChange={(event: any, newValue:any)=>{ setPlaceId(newValue); setCurrentOption(newValue);}}
                disablePortal
                id="combo-box-demo"
                options={options}
                isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
                getOptionLabel={(option) => option.description}
                sx={{ width: "100%" }}
                renderInput={(params) =>
                    <TextField {...params}
							
                               label={hint}
                               variant='filled'
                               value={currentOption !== null ? currentOption.description : ""}
                               onChange={
                                   (event) =>
                                       whenchanged(event.target.value)
                               }
                               fullWidth
					/>
				}
            />
        </Grid2>
    );
}

export default function DirectionApiInput({onSubmit}: DirectionApiInputProps) {
    const [startVal, setStartVal] = useState<Place|null>(null);
    const [endVal, setEndVal] = useState<Place|null>(null);

    const handleSubmit = async (event: FormEvent) => {
        // prevent refresh
        event.preventDefault()
		
		if (startVal !== null && endVal !== null) {
			await dirRequest(startVal, endVal, "DRIVING");
			
			if (onSubmit !== undefined && onSubmit !== null)
				await onSubmit();
		}
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid2 container spacing={1}>
                <DirectionInputField hint={"Start"} setPlaceId={(place: Place) => setStartVal(place)} />
                <DirectionInputField hint={"End"} setPlaceId={(place: Place) => setEndVal(place)} />
                <Grid2 xs md={2}>
                    <Button
                        style={{height: '100%'}}
                        variant="contained"
                        fullWidth
                        disabled={startVal === null || endVal === null}
                        type="submit"
                    >
                        Search
                    </Button>
                </Grid2>
            </Grid2>
        </form>
    );
}