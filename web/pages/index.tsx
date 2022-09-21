import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import {MouseEvent, useEffect, useRef, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";

const Home: NextPage<{ 
  // prop types
  onSearch: (from:string, to: string) => void | undefined
}>  = ( 
  // props
  { onSearch }
  ) => {

    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const handleSubmit = (event: React.FormEvent) => {
      // prevent refresh
      event.preventDefault()

      // send callbsck function to template if provided
      if(onSearch){
        onSearch(from, to)
      }
      else{
        console.log(`from=${from} & to=${to}`)
      }
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
                <TextField
                  label="Start"
                  variant="filled"
                  onChange={(event) => setFrom(event.target.value)}
                  value={from}
                  fullWidth
                  />
              </Grid>
            <Grid xs={12} sm={6} md={5}>
                <TextField
                    label="Destination"
                    variant="filled"
                    onChange={(event) => setTo(event.target.value)}
                    value={to}
                    fullWidth
                />
            </Grid>
            <Grid xs>
              <Button 
                style={{height: '100%'}}
                variant="contained" 
                fullWidth
                disabled={from === '' || to === ''}
                type="submit"
              > 
                Sök 
              </Button>
            </Grid>
        </Grid>
      </form>

      <br/>

      <Typography variant="h5"> Why use Eco Travel Planer </Typography>

      <Typography textAlign="justify">
        Ever wondered how much carbon dioxide emissions you produce when traveling between two between two places, 
        such as from home to work? You can compare multiple travel methods such as walking, cycling, driving and public transport
        to find the best option. Sometimes a car can be more efficient than switching between multiple busses. You can also find
        out an estimated yearly emission if you take that route regularly. To get started you can choose a start point and destination
        along with customizing vehicle options.
      </Typography>

    </Container>
  );
};

export default Home;
