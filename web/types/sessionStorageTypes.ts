export type SessionStorageTypes = string | "comparison" | "car" | "bicycle" | "plane" | "walking" | "public transit";

export interface ComparisonType {
    from: string;
    to: string;
    distance: number;
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