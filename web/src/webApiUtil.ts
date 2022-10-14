/**
 * Function to connect to RoutesDirectionApiService.
 */
import {setItem, updateItemObj} from "./sessionStorage";
import {GoggleMapsType} from "../types/sessionStorageTypes";

interface Place {
    description: string;
    place_id: string;
}

async function dirRequest(destination: Place, origin: Place, mean: "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT"): Promise<GoggleMapsType> {
    let httpAddress= {url:"http://localhost:8080/routes?destination=place_id:"+destination.place_id+"&origin=place_id:"+origin.place_id+"&mean="+mean};
    let data: GoggleMapsType = await fetch(httpAddress.url)
        .then(response => response.json())
    setItem('googlemaps',data)
    setItem('comparison', {to: destination, from: origin, distance: data.routes[0].legs[0].distance.value / 1000})
    return data;
}

export {dirRequest};


