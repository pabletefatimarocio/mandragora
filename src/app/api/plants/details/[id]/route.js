import { cardsPlants } from '@/utils/mock/plants';
import { NextResponse } from "next/server"

export async function GET(request, { params }) {
  const { id } = await params;

  console.log(id);

  const plantDetails = cardsPlants.find((plant) => plant.id === JSON.parse(id));

  if (!plantDetails) {
    return NextResponse.json(
      { error: 'Plant not found' },
      { status: 404 }
    );
  }

  return NextResponse.json(
    plantDetails,
    { status: 200 }
  );
}