import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {MouseEvent, useEffect, useRef, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {useRouter} from "next/router";
import {getItem, getTypedItem, updateItemObj} from "../src/sessionStorage";
import {AutoCompleteType, ComparisonType} from "../types/sessionStorageTypes";
import {dirRequest} from "../src/webApiUtil";
import {autoCompleteRequest} from "../src/webAutoCompleteApiUtil"
import { Autocomplete } from '@mui/material';

let start_suggestions = [""]
let destination_suggestions = [""]

const Home: NextPage  = () => {
    const [startVal, setstartVal] = useState<string | null>('');
    const [endVal, setendVal] = useState<string | null>('');
    const router = useRouter();
    function NulltoString(input: string | null){
      if(typeof input === "string"){return input}
      else{return ""}
    }

    const handleSubmit = async (event: React.FormEvent) => {
        // prevent refresh
        event.preventDefault()

        await dirRequest(NulltoString(startVal), NulltoString(endVal), "DRIVING");

        await router.push('/comparison')
    }

    //Triggered whenever someone writes something in the boxes, one for the start and end box
    async function whenstartchanged(newval: string){
      setstartVal(newval)
      if(newval.length>=4){
        let output = await autoCompleteRequest(newval);
          start_suggestions = [];
          output.predictions.forEach(function (value){
              start_suggestions.push(value.description)
          })
      }
    }
    async function whenendchanged(newval: string){
      if(newval.length>=4){
          let output = await autoCompleteRequest(newval);
          destination_suggestions = [];
          output.predictions.forEach(function (value){
              destination_suggestions.push(value.description)
          })
        //Add places request here
      }
      setendVal(newval)
    }

    // html
  return (
    <Container maxWidth="md" style={{marginTop: '20px'}}>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={1}>
            <Grid xs={12}>
              <Typography variant="h3" component="h1" gutterBottom align="center">
                  Eco Travel Planner
              </Typography>
            </Grid>
            <Grid xs={12} sm={6} md={5}>
              <Autocomplete
                value={startVal}
                onChange={(event: any, newValue:string | null)=>{setstartVal(newValue)}}
                disablePortal
                id="combo-box-demo"
                options={start_suggestions}
                isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Start" variant='filled' value={startVal} onChange={(event)=>whenstartchanged(event.target.value)} fullWidth/>}
              />
            </Grid>
            <Grid xs={12} sm={6} md={5}>
              <Autocomplete
                  value={endVal}
                  onChange={(event: any, newValue:string | null)=>{setendVal(newValue)}}
                  disablePortal
                  id="combo-box-demo"
                  options={destination_suggestions}
                  isOptionEqualToValue={(option, value) => option.valueOf === value.valueOf}
                  sx={{ width: 300 }}
                  renderInput={(params) => <TextField {...params} label="Destination" variant='filled' value={startVal} onChange={(event)=>whenendchanged(event.target.value)}  fullWidth/>}
              />
              </Grid>
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

      <br/>

      <Typography variant="h5"> Why use Eco Travel Planer </Typography>

      <Typography textAlign="justify">
            Have you ever wondered the amount of carbon dioxide emissions you produce when you travel between two places,
            for example from home to work? You can compare several travel methods such as walking, cycling, driving and public transport
            to find the best alternative. Sometimes a car can be more efficient than switching between several buses.
            You can also compare your emissions to standard everyday items!
            To get started, you can choose a starting point and destination as well as customising your vehicle settings.
      </Typography>

    </Container>
  );
};

export default Home;
