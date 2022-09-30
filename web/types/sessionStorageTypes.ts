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