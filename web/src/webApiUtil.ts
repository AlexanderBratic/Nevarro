/**
 * Function to connect to RoutesDirectionApiService.
 */
import {setItem, updateItemObj} from "./sessionStorage";
import {GoggleMapsType} from "../types/sessionStorageTypes";

async function dirRequest(destination: string, origin: string, mean: "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT"): Promise<GoggleMapsType> {
    let httpAddress= {url:"http://localhost:8080/routes?destination="+destination+"&origin="+origin+"&mean="+mean};
    let data: GoggleMapsType = await fetch(httpAddress.url)
        .then(response => response.json())
    setItem('googlemaps',data)
    setItem('comparison', {to: destination, from: origin, distance: data.routes[0].legs[0].distance.value / 1000})
    return data;
}

export {dirRequest};


/*
Radera!!
    .then(res => {
        if(res.ok){
            console.log("GETRequest SUCCESSFUL")
        }else {
            console.log("GETRequest FAILED")
        }
        res.json()
    })
    .then(data => console.log(data));

 yarn dev från web mappen i terminalen
let httpAddress: String = "http://localhost:8080/routes?destination="+destination+"&origin="+origin+"&mean="+mean;
fetch("http://localhost:8080/routes?destination="+destination+"&origin="+origin+"&mean="+mean)
.then(res => console.log(res.routes[0].legs[0])) //Vägbeskrivning Göteborg till Malmö
*/
//  .then(res => console.log(res.routes[0].legs[0].distance)) //.routes[0].legs[0].distance, JSON path to get the distant from origin to destination.
//  .catch(error => console.log(error))
//console.log("Jajajajajajjaja");
// return httpAddress.url;
//* Prints the distant from origin to destination in terminal on format: { text: '(some distant)  km', value: (som value in meters) }
