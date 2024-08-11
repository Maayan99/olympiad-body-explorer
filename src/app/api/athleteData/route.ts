import { NextResponse } from 'next/server';
import { SportData } from '../../../utils/types';
import {olympicData} from "@/data/olympicData";

export async function GET() {
    return NextResponse.json(olympicData);
}