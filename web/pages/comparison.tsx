import * as React from 'react';

import Image from 'next/image';

import {Box, TextField, Button} from '@mui/material';

import type { NextPage } from 'next';
import Template from '../src/components/Template';
import {Staple, StapleDiagram, STAPLE_COLORS} from '../src/components/StapleDiagram';

import {ComparisonType} from '../types/sessionStorageTypes';
import {setItem, getItem, getTypedItem } from '../src/sessionStorage';

import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import AirplaneIcon from '@mui/icons-material/AirplanemodeActiveRounded';
import ElectricScooterIcon from '@mui/icons-material/ElectricScooterRounded';
import WalkIcon from '@mui/icons-material/DirectionsWalkRounded';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ItemsJson from "../src/items.json";
import Grid from "@mui/material/Unstable_Grid2";
import {dirRequest} from "../src/webApiUtil";
import {useRouter} from "next/router";
import {getCarStaples} from './car';
import {getBicycleStaples} from './bicycle';
import {getPublicTransportStaples} from './public-transport';
import { useState } from 'react';

interface ItemType {
  title: string;
  img: string;
  co2: number;
}
interface ItemProps {
  item: any;
  selected: boolean;
  toggleItem: any;
};
const Item = ({item, selected, toggleItem}: ItemProps) => {
  function itemClicked() {
    toggleItem(item.title);
  }

	let css1 = {
		transition: "all 0.2s",
		opacity: "100%",
		borderRadius: "5px",
		"&:hover": {opacity: "80%",}
	};

	let css2 = {
		transition: "all 0.2s",
		opacity: "100%",
		filter: "contrast(120%)",
		borderRadius: "30px",
		"&:hover": {opacity: "80%",}
	};
	
  let borderRadius = selected ? css2.borderRadius : css1.borderRadius;
  
  return (
    <ImageListItem key={item.img} onClick={itemClicked} sx={selected ? css2 : css1}>
			  <Image 
          src={item.img + "?w=165&fit=crop&auto=format"} 
          alt="" 
          width={165} 
          height={165} 
          layout="responsive" 
          style={{borderRadius: borderRadius}}
        />
			  <ImageListItemBar
          title={item.title}
          subtitle={`Co2e: ${item.co2}g`}
          style={{
            borderRadius: borderRadius,
            backgroundColor: selected ? "#2ecc7199" : "#00000033"
          }}
			  />
		</ImageListItem>
  );
};

const ComparisonPage: NextPage = () => {

	let [comparisonData, setComparisonData] = useState(getTypedItem<ComparisonType>('comparison', {
    to:'', 
    from:'', 
    distance:10,
    selectedItemTitles: []
  }));
	const [from, setFrom] = React.useState(comparisonData.from);
	const [to, setTo] = React.useState(comparisonData.to);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent) => {
        // prevent refresh
        event.preventDefault()
        //setItem("comparison", {from, to});
        await dirRequest(from, to, "DRIVING");

        setComparisonData(getTypedItem<ComparisonType>('comparison', {to:'', from:'', distance:0, selectedItemTitles: []}));
    }
  
  const [selectedItemTitles, setSelectedItemTitles] = React.useState(comparisonData.selectedItemTitles);
  
  function toggleItem(title: string) {
    let newSelectedItemTitles = [...selectedItemTitles];
   
    let index = selectedItemTitles.indexOf(title);
    if (index != -1)
      delete newSelectedItemTitles[index];
    else
      newSelectedItemTitles.push(title);
  
    setSelectedItemTitles(newSelectedItemTitles);
    comparisonData.selectedItemTitles = newSelectedItemTitles;
    setItem('comparison', comparisonData);
  }
  
  function getItemStaple(item: ItemType) {
    return {
      title: item.title,
			icon: <CoffeeIcon/>,
			parts: [
				{
          color: STAPLE_COLORS.PRODUCTION, 
          value: item.co2, 
          hint: "Production emissions"
        }
			]
    };
  }
  
  function getSelectedItemStaples(selectedItemTitles: string[]) {
    let result: any[] = [];
    
    selectedItemTitles.forEach((title) => {
      let item = null;
      for (let i = 0; i < ItemsJson.Items.length; i++) {
        if (ItemsJson.Items[i].title === title) {
          item = ItemsJson.Items[i];
          break;
        }
      }
      if (item !== null)
        result.push(getItemStaple(item));
    });
    
    return result;
  }

	let staples = [
		...getCarStaples(comparisonData.distance),
		...getPublicTransportStaples(comparisonData.distance),
		...getBicycleStaples(comparisonData.distance),
    ...getSelectedItemStaples(selectedItemTitles)
	];

	return (
		<Template>
			<Box>
				<h1>Comparison</h1>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm>
                            <TextField label="Start" fullWidth value={from} onChange={e => setFrom(e.target.value)} />
                        </Grid>
                        <Grid xs={12} sm>
                            <TextField label="Destination" fullWidth value={to} onChange={e => setTo(e.target.value)} />
                        </Grid>
                        <Grid xs sm={1}>
                            <Button style={{height: '100%'}} fullWidth type="submit" variant="contained" disabled={to === '' || from === ''}> Search </Button>
                        </Grid>
                    </Grid>
                </form>
				<div style={{marginTop: '40px'}}>
					<StapleDiagram staples={staples} />
				</div>
			</Box>
			<h3>Select the items you want to compare with in the diagram above</h3>
			<Box>
				<ImageList cols={6} >
          {ItemsJson.Items.map((item) =>
            <Item 
              key={item.title} 
              item={item} 
              selected={selectedItemTitles.includes(item.title)}
              toggleItem={toggleItem} 
            />
          )}
        </ImageList>
			</Box>
		</Template>
	);
}


export default ComparisonPage;
