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


