import Grid from "@mui/material/Unstable_Grid2";
import Typography from "@mui/material/Typography";
import {Autocomplete} from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import * as React from "react";
import {useState} from "react";
import {dirRequest} from "../webApiUtil";
import {autoCompleteRequest} from "../webAutoCompleteApiUtil";
import {useRouter} from "next/router";
import {getItem} from '../sessionStorage';

function DirectionInputField(props) {
    const setPlaceId = props.setPlaceId;
    const [options, setOptions] = React.useState<any[]>([]);
    const [currentOption, setCurrentOption] = React.useState(null);

    // Triggered whenever someone writes something in the boxes, one for the start and end box
    async function whenchanged(newval: string){
        if(newval.length>=4){
            let output = await autoCompleteRequest(newval);
            let newOptions = [];
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
                onChange={(event: any, newValue:any)=>{setPlaceId(newValue);setCurrentOption(newValue);}}
                disablePortal
                id="combo-box-demo"
                options={options}
                isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
                getOptionLabel={(option) => option.description}
                sx={{ width: 300 }}
                renderInput={(params) =>
                    <TextField {...params}
                               label="Start"
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

export default function DirectionApiInput(){
    const router = useRouter();
    const [startVal, setstartVal] = useState<string | null>('');
    const [endVal, setendVal] = useState<string | null>('');

    const handleSubmit = async (event: React.FormEvent) => {
        // prevent refresh
        event.preventDefault()

        await dirRequest(startVal, endVal, "DRIVING");

        await router.push('/comparison')
    }

    return (
        <form onSubmit={handleSubmit}>
            <Grid container spacing={1}>
                <Grid xs={12}>
                    <Typography variant="h3" component="h1" gutterBottom align="center">
                        Eco Travel Planner
                    </Typography>
                </Grid>
                <DirectionInputField setPlaceId={setstartVal} />
                <DirectionInputField setPlaceId={setendVal} />
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