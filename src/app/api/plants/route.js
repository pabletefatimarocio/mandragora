import { NextResponse } from "next/server";
import { cardsPlants } from "@/utils/mock/plants";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const session = await auth();

    const user_id = session.user.id;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const plantsCards = await prisma.plant.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        name: true,
        scientific: true,
        img: true,
        updated_at: true,
      },
      orderBy: {
        updated_at: "desc",
      },
    });

    return NextResponse.json(plantsCards, { status: 200 });
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
