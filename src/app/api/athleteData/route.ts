import { NextResponse } from 'next/server';
import { SportData } from '../../../utils/types';

const athleteData: SportData[] = [
    {
        name: 'Swimming',
        averageHeight: 188,
        averageWeight: 82,
        averageWingspan: 195,
        averageAge: 26,
        averageBodyFat: 10,
        notableAttributes: ['Long torso', 'Large hands and feet'],
    },
    {
        name: 'Gymnastics',
        averageHeight: 160,
        averageWeight: 56,
        averageWingspan: 165,
        averageAge: 20,
        averageBodyFat: 12,
        notableAttributes: ['Short stature', 'High strength-to-weight ratio'],
    },
    // Add more sports data here...
];

export async function GET() {
    return NextResponse.json(athleteData);
}