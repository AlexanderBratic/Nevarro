import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Link from '../src/components/Link';
import {MouseEvent, useEffect, useRef, useState} from "react";
import Grid from "@mui/material/Unstable_Grid2";
import {Step, StepLabel, Stepper} from "@mui/material";
import {Wrapper} from "@googlemaps/react-wrapper";

const Home: NextPage = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');

    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    function submitHandler(event: MouseEvent<HTMLButtonElement>) {
        console.log(event);
        console.log(from);
        console.log(to);
    }

  return (
    <Container maxWidth="lg" style={{marginTop: '20px'}}>
        <Grid container spacing={0.5}>
            <Grid xs={4} sm={3} md={2}>
                <Stepper orientation="vertical" style={{display: 'inline-block'}}>
                    <Step>
                        <StepLabel>Planera Rutt</StepLabel>
                    </Step>
                    <Step>
                        <StepLabel> Resealternativ </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel> Energialternativ </StepLabel>
                    </Step>
                    <Step>
                        <StepLabel> Resultat </StepLabel>
                    </Step>
                </Stepper>
            </Grid>

            <Grid xs>
              <Grid container spacing={1}>
                  <Grid xs={12}>
                    <Typography variant="h4" component="h1" gutterBottom align="center">
                        Eco Travel Planner
                    </Typography>
                  </Grid>
                    <Grid xs={12} sm={6}>
                      <TextField
                        label="Start"
                        variant="filled"
                        onChange={(event) => setFrom(event.target.value)}
                        value={from}
                        fullWidth
                        />
                    </Grid>
                  <Grid xs={12} sm={6}>
                      <TextField
                          label="Destination"
                          variant="filled"
                          onChange={(event) => setTo(event.target.value)}
                          value={to}
                          fullWidth
                      />
                  </Grid>
                  <Grid xs={9} md={10}>
                    <Button onClick={submitHandler} variant="contained" fullWidth> Sök </Button>
                  </Grid>
                  <Grid xs={3} md={2}>
                    <Button href="/about" color="secondary" variant="contained" LinkComponent={Link} fullWidth>
                      About
                    </Button>
                  </Grid>
              </Grid>
            </Grid>
        </Grid>

        <Wrapper apiKey={''}>
            <div ref={ref} />
        </Wrapper>
    </Container>
  );
};

export default Home;
