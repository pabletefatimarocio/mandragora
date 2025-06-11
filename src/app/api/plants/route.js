import { NextResponse } from "next/server";
import { cardsPlants } from '@/utils/mock/plants';

export async function GET(){
    return NextResponse.json(cardsPlants, {status: 200});
}