import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    const user_id = session.user.id;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

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
            next_watering: true,
            next_fertilization: true,
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
            next_watering: true,
            next_fertilization: true,
          },
        }),
      ]);

    const warningPlantsMap = new Map();

    for (const plant of wateringWarningPlants) {
      const { next_watering, next_fertilization, ...rest } = plant;

      const urgency =
        next_watering < next_fertilization ? next_watering : next_fertilization;

      warningPlantsMap.set(plant.id, { ...rest, urgency, needs: ["regar"] });
    }

    for (const plant of fertilizationWarningPlants) {
      if (warningPlantsMap.has(plant.id)) {
        warningPlantsMap.get(plant.id).needs.push("fertilizar");
      } else {
        const { next_watering, next_fertilization, ...rest } = plant;

        const urgency =
          next_watering < next_fertilization
            ? next_watering
            : next_fertilization;

        warningPlantsMap.set(plant.id, {
          ...rest,
          urgency,
          needs: ["fertilizar"],
        });
      }
    }

    const warningPlants = Array.from(warningPlantsMap.values()).sort((a, b) => a.urgency - b.urgency);

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
