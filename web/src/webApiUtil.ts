/**
 * Function to connect to RoutesDirectionApiService.
 */
import {setItem} from "./sessionStorage";

async function dirRequest(destination: String, origin: String, mean: String){
    let httpAddress= {url:"http://localhost:8080/routes?destination="+destination+"&origin="+origin+"&mean="+mean};
    let data = await fetch(httpAddress.url)
        .then(response => response.json())
    setItem('googlemaps',data)
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