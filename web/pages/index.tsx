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
import {ComparisonType} from "../types/sessionStorageTypes";
import {dirRequest} from "../src/webApiUtil";

const Home: NextPage  = () => {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        // prevent refresh
        event.preventDefault()
        await dirRequest(from, to, "DRIVING");

        await router.push('/comparison')
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
