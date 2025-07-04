import { createCalendar } from "@/lib/createCalendar";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(_request, { params }) {
  try {
    const { date } = await params;

    const rawDate = new Date(date);
    const year = rawDate.getFullYear();
    const month = rawDate.getMonth();

    const minDate = new Date(year, month - 1, 1);
    const maxDate = new Date(year, month + 2, 0);

    const [waterPlants, fertilizePlants] = await Promise.all([
      prisma.plant.findMany({
        where: {
          next_watering: {
            gt: minDate,
            lt: maxDate,
          },
        },
        select: {
          id: true,
          name: true,
          scientific: true,
          img: true,
          next_watering: true,
        },
      }),
      prisma.plant.findMany({
        where: {
          next_fertilization: {
            gt: minDate,
            lt: maxDate,
          },
        },
        select: {
          id: true,
          name: true,
          scientific: true,
          img: true,
          next_fertilization: true,
        },
      }),
    ]);

    const plantsInNeedMap = new Map();

    for (const plant of waterPlants) {
      plantsInNeedMap.set(plant.id, { ...plant });
    }

    for (const plant of fertilizePlants) {
      if (plantsInNeedMap.has(plant.id)) {
        plantsInNeedMap.get(plant.id).next_fertilization =
          plant.next_fertilization;
      } else {
        plantsInNeedMap.set(plant.id, { ...plant });
      }
    }

    const plantsInNeed = Array.from(plantsInNeedMap.values());

    const calendar = createCalendar(year, month);

    for (const plant of plantsInNeed) {
      const waterMonth = plant.next_watering?.getMonth();
      const waterDay = plant.next_watering?.getDate();
      const fertMonth = plant.next_fertilization?.getMonth();
      const fertDay = plant.next_fertilization?.getDate();
      let eventsMonth = month - 1;

      for (const row of calendar.calendar) {
        for (const tile of row) {
          if (tile.outline === "inside" && eventsMonth === month - 1) {
            eventsMonth += 1;
          }
          if (tile.outline === "outside" && eventsMonth === month) {
            eventsMonth += 1;
          }

          if (
            waterMonth === eventsMonth &&
            waterDay === tile.day &&
            fertMonth === eventsMonth &&
            fertDay === tile.day
          ) {
            tile.events.water = true;
            tile.events.fertilize = true;
            tile.events.plants.push(plant);
          } else if (waterMonth === eventsMonth && waterDay === tile.day) {
            tile.events.water = true;
            tile.events.plants.push(plant);
          } else if (fertMonth === eventsMonth && fertDay === tile.day) {
            tile.events.fertilize = true;
            tile.events.plants.push(plant);
          }
        }
      }
    }

    return NextResponse.json(calendar, { status: 200 });
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
