// utils/calculations.ts
import { UserMeasurements, SportData } from './types';

export function calculateCompatibility(
    userMeasurements: UserMeasurements,
    sportsData: SportData[]
): { sport: SportData; compatibility: number }[] {
    return sportsData.map((sport) => {
        const heightDiff = Math.abs(userMeasurements.height - sport.averageHeight) / sport.averageHeight;
        const weightDiff = Math.abs(userMeasurements.weight - sport.averageWeight) / sport.averageWeight;

        let wingspanDiff = 0;
        if (userMeasurements.wingspan !== undefined) {
            wingspanDiff = Math.abs(userMeasurements.wingspan - sport.averageWingspan) / sport.averageWingspan;
        }

        const totalDiff = userMeasurements.wingspan !== undefined
            ? (heightDiff + weightDiff + wingspanDiff) / 3
            : (heightDiff + weightDiff) / 2;

        const compatibility = 1 - totalDiff;

        return { sport, compatibility: Math.max(0, Math.min(1, compatibility)) };
    });
}