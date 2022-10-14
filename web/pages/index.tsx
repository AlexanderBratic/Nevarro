import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import {useRouter} from "next/router";
import DirectionApiInput from '../src/components/DirectionApiInput';

const Home: NextPage  = () => {
    // html
  return (
    <Container maxWidth="md" style={{marginTop: '20px'}}>
      <DirectionApiInput />

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
