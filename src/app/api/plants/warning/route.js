import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    const { user_id } = session;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [wateringWarningPlants, fertilizationWarningPlants] =
      await Promise.all([
        prisma.plant.findMany({
          where: {
            user_id,
            next_watering: {
              lt: today,
            },
          },
          select: {
            id: true,
            name: true,
            scientific: true,
            img: true,
          },
        }),
        prisma.plant.findMany({
          where: {
            user_id,
            next_fertilization: {
              lt: today,
            },
          },
          select: {
            id: true,
            name: true,
            scientific: true,
            img: true,
          },
        }),
      ]);

    const warningPlantsMap = new Map();

    for (const plant of wateringWarningPlants) {
      warningPlantsMap.set(plant.id, { ...plant, needs: ["regar"] });
    }

    for (const plant of fertilizationWarningPlants) {
      if (warningPlantsMap.has(plant.id)) {
        warningPlantsMap.get(plant.id).needs.push("fertilizar");
      } else {
        warningPlantsMap.set(plant.id, { ...plant, needs: ["fertilizar"] });
      }
    }

    const warningPlants = Array.from(warningPlantsMap.values());

    return NextResponse.json(warningPlants, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
