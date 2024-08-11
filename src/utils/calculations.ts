// utils/calculations.ts
import { UserMeasurements, SportData } from './types';

export function calculateCompatibility(
    userMeasurements: UserMeasurements,
    sportsData: SportData[]
): { sport: SportData; compatibility: number }[] {
    return sportsData.map((sport) => {
        const heightDiff = Math.abs(userMeasurements.height - sport.averageHeight) / sport.averageHeight;
        const weightDiff = Math.abs(userMeasurements.weight - sport.averageWeight) / sport.averageWeight;
        const wingspanDiff = Math.abs(userMeasurements.wingspan - sport.averageWingspan) / sport.averageWingspan;

        const compatibility = 1 - (heightDiff + weightDiff + wingspanDiff) / 3;

        return { sport, compatibility: Math.max(0, Math.min(1, compatibility)) };
    });
}