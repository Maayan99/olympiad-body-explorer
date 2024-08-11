// utils/types.ts

export interface UserMeasurements {
    height: number;
    weight: number;
    wingspan?: number;
}

export interface SportData {
    name: string;
    averageHeight: number;
    averageWeight: number;
    averageWingspan: number;
    averageAge?: number;
    averageBodyFat?: number;
    notableAttributes?: string[];
}

export interface HistoricalData {
    year: number;
    sports: SportData[];
}