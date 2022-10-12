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
import { Autocomplete } from '@mui/material';

let start_suggestions = ['Alingsås', 'Arboga', 'Arvika', 'Askersund', 'Avesta', 'Boden', 'Bollnäs', 'Borgholm', 'Borlänge', 'Borås', 'Djursholm', 'Eksjö', 'Enköping', 'Eskilstuna', 'Eslöv', 'Fagersta', 'Falkenberg', 'Falköping', 'Falsterbo', 'Falun', 'Filipstad', 'Flen', 'Göteborg', 'Gränna', 'Gävle', 'Hagfors', 'Halmstad', 'Haparanda', 'Hedemora', 'Helsingborg', 'Hjo', 'Hudiksvall', 'Huskvarna', 'Härnösand', 'Hässleholm', 'Höganäs', 'Jönköping', 'Kalmar', 'Karlshamn', 'Karlskoga', 'Karlskrona', 'Karlstad', 'Katrineholm', 'Kiruna', 'Kramfors', 'Kristianstad', 'Kristinehamn', 'Kumla', 'Kungsbacka', 'Kungälv', 'Köping', 'Laholm', 'Landskrona', 'Lidingö', 'Lidköping', 'Lindesberg', 'Linköping', 'Ljungby', 'Ludvika', 'Luleå', 'Lund', 'Lycksele', 'Lysekil', 'Malmö', 'Mariefred', 'Mariestad', 'Marstrand', 'Mjölby', 'Motala', 'Nacka', 'Nora', 'Norrköping', 'Norrtälje', 'Nybro', 'Nyköping', 'Nynäshamn', 'Nässjö', 'Oskarshamn', 'Oxelösund', 'Piteå', 'Ronneby', 'Sala', 'Sandviken', 'Sigtuna', 'Simrishamn', 'Skanör', 'Skanör med Falsterbo', 'Skara', 'Skellefteå', 'Skänninge', 'Skövde', 'Sollefteå', 'Solna', 'Stockholm', 'Strängnäs', 'Strömstad', 'Sundbyberg', 'Sundsvall', 'Säffle', 'Säter', 'Sävsjö', 'Söderhamn', 'Söderköping', 'Södertälje', 'Sölvesborg', 'Tidaholm', 'Torshälla', 'Tranås', 'Trelleborg', 'Trollhättan', 'Trosa', 'Uddevalla', 'Ulricehamn', 'Umeå', 'Uppsala', 'Vadstena', 'Varberg', 'Vaxholm', 'Vetlanda', 'Vimmerby', 'Visby', 'Vänersborg', 'Värnamo', 'Västervik', 'Västerås', 'Växjö', 'Ystad', 'Åmål', 'Ängelholm', 'Örebro', 'Öregrund', 'Örnsköldsvik', 'Östersund', 'Östhammar']
let destination_suggestions = ['Alingsås', 'Arboga', 'Arvika', 'Askersund', 'Avesta', 'Boden', 'Bollnäs', 'Borgholm', 'Borlänge', 'Borås', 'Djursholm', 'Eksjö', 'Enköping', 'Eskilstuna', 'Eslöv', 'Fagersta', 'Falkenberg', 'Falköping', 'Falsterbo', 'Falun', 'Filipstad', 'Flen', 'Göteborg', 'Gränna', 'Gävle', 'Hagfors', 'Halmstad', 'Haparanda', 'Hedemora', 'Helsingborg', 'Hjo', 'Hudiksvall', 'Huskvarna', 'Härnösand', 'Hässleholm', 'Höganäs', 'Jönköping', 'Kalmar', 'Karlshamn', 'Karlskoga', 'Karlskrona', 'Karlstad', 'Katrineholm', 'Kiruna', 'Kramfors', 'Kristianstad', 'Kristinehamn', 'Kumla', 'Kungsbacka', 'Kungälv', 'Köping', 'Laholm', 'Landskrona', 'Lidingö', 'Lidköping', 'Lindesberg', 'Linköping', 'Ljungby', 'Ludvika', 'Luleå', 'Lund', 'Lycksele', 'Lysekil', 'Malmö', 'Mariefred', 'Mariestad', 'Marstrand', 'Mjölby', 'Motala', 'Nacka', 'Nora', 'Norrköping', 'Norrtälje', 'Nybro', 'Nyköping', 'Nynäshamn', 'Nässjö', 'Oskarshamn', 'Oxelösund', 'Piteå', 'Ronneby', 'Sala', 'Sandviken', 'Sigtuna', 'Simrishamn', 'Skanör', 'Skanör med Falsterbo', 'Skara', 'Skellefteå', 'Skänninge', 'Skövde', 'Sollefteå', 'Solna', 'Stockholm', 'Strängnäs', 'Strömstad', 'Sundbyberg', 'Sundsvall', 'Säffle', 'Säter', 'Sävsjö', 'Söderhamn', 'Söderköping', 'Södertälje', 'Sölvesborg', 'Tidaholm', 'Torshälla', 'Tranås', 'Trelleborg', 'Trollhättan', 'Trosa', 'Uddevalla', 'Ulricehamn', 'Umeå', 'Uppsala', 'Vadstena', 'Varberg', 'Vaxholm', 'Vetlanda', 'Vimmerby', 'Visby', 'Vänersborg', 'Värnamo', 'Västervik', 'Västerås', 'Växjö', 'Ystad', 'Åmål', 'Ängelholm', 'Örebro', 'Öregrund', 'Örnsköldsvik', 'Östersund', 'Östhammar']

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
    function whenstartchanged(newval: string){
      if(newval.length>=4){
        //Add places request here
      }
      setstartVal(newval)
    }
    function whenendchanged(newval: string){
      if(newval.length>=4){
        //Add places request here
      }
      setstartVal(newval)
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
                Sök
              </Button>
            </Grid>
        </Grid>
      </form>

      <br/>

      <Typography variant="h5"> Varför använda Eco Travel Planer? </Typography>

      <Typography textAlign="justify">
            Har du någonsin undrat hur mycket koldioxidutsläpp du producerar när du reser mellan två platser,
            till exempel från hemmet till jobbet? Du kan jämföra flera resmetoder såsom promenad, cykling, körning och kollektivtrafik
            för att hitta det bästa alternativet. Ibland kan en bil vara mer effektiv än att byta mellan flera bussar. Du kan också hitta
            ut en uppskattad årlig utsläpp om du tar samma rutt regelbundet. För att komma igång kan du välja en startpunkt och destination
            tillsammans med anpassning av fordonet.
      </Typography>

    </Container>
  );
};

export default Home;
