
import {getTypedItem} from '../src/sessionStorage';

export type SessionStorageTypes = string | "googlemaps" | "comparison" | "car" | "bicycle" | "plane" | "walking" | "public transit" | "stapleheights";

export interface Place {
	description: string;
	place_id: string;
}
export interface ComparisonType {
    from: Place;
    to: Place;
    distance: number;
    selectedItemTitles: string[];
}
export function getComparisonData(): ComparisonType {
	return getTypedItem<ComparisonType>('comparison', {
		from: {description: "", place_id: ""}, 
		to: { description: "", place_id: ""}, 
		distance: 1,
		selectedItemTitles: []
	});
}

export interface CarType {
    emissionPerKm: number
    vehicleType: string
    litersPerKm: string
    CO2PerLiter: string
}

export interface BusType {
    vehicleType: string
    emissionPerKm: number
}
export interface TrainType {
    vehicleType: string
    emissionPerKm: number
}

export interface BicycleType {
    vehicleType: string,
    porpulsionType: string,
	emissionPerKm: number
}

export interface AutoCompleteType {
    predictions: {
        description: string;
        matched_substrings: {
            length: number;
            offset: number;
        }[];
        place_id: string;
        reference: string;
        structured_formatting: {
            main_text: string;
            main_text_matched_substrings: {
                length: number;
                offset: number;
            }[];
            secondary_text: string;
        }
        terms: {
            offset: number;
            value: string;
        }[];
        types: (string | "locality" | "political" | "geocode" )[];
    }[];
    status: string | "OK" | "ZERO_RESULTS" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "INVALID_REQUEST" | "UNKNOWN_ERROR";
}

export interface GoggleMapsType {
    geocoded_waypoints: {
        geocoder_status: string | "OK" | "ZERO_RESULTS" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "INVALID_REQUEST" | "UNKNOWN_ERROR";
        place_id: string;
        types: (string | "locality" | "political" | "geocode")[];
    }[];
    routes: {
        bounds: {
            northeast: {
                lat: number;
                lng: number;
            }
            southwest: {
                lat: number;
                lng: number;
            }
        }
        copyrights: string;
        legs: {
            distance: {
                text: string;
                value: number;
            }
            duration: {
                text: string;
                value: number;
            }
            end_address: string;
            end_location: {
                lat: number;
                lng: number;
            }
            start_address: string;

            start_location: {
                lat: number;
                lng: number;
            }

            steps: {
                distance: {
                    text: string;
                    value: number;
                }
                duration: {
                    text: string;
                    value: number;
                }
                end_location: {
                    lat: number;
                    lng: number;
                }
                html_instructions: string;
                polyline: {
                    points: string;
                }
                start_location: {
                    lat: number;
                    lng: number;
                }
                travel_mode: string | "DRIVING" | "WALKING" | "BICYCLING" | "TRANSIT";
                maneuver: string | undefined;
            }[]

            traffic_speed_entry: any[];
            via_waypoint: any[];

        }[]
        overview_polyline: {
            points: string;
        }
        summary: string;
        warnings: any[];
        waypoint_order: any[];
    }[];
    status: string | "OK" | "ZERO_RESULTS" | "MAX_WAYPOINTS_EXCEEDED" | "MAX_ROUTE_LENGTH_EXCEEDED" | "INVALID_REQUEST" | "OVER_QUERY_LIMIT" | "REQUEST_DENIED" | "UNKNOWN_ERROR";
}

export type StaplePartHeights = Record<string, number>;
export type StapleHeights = Record<string, StaplePartHeights>;
