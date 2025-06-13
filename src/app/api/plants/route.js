import { NextResponse } from "next/server";
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

export async function POST(request) {
  try {
    const session = await auth();

    const user_id = session.user.id;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const {
      name,
      scientific,
      img,
      watering,
      fertilization
    } = await request.json();

    const foundPlant = await prisma.plant.findUnique({
      where: {
        user_id,
        name
      },
      select: {
        id: true
      }
    });

    if (foundPlant) {
      return NextResponse.json(
        { error: "Plant name already in use" },
        { status: 400 }
      );
    }

    const newPlant = await prisma.plant.create({
      data: {
        name,
        scientific,
        img,
        watering,
        fertilization
      },
      select: {
        id: true
      }
    });

    return NextResponse.json(
      { message: "Plant successfully created", data: newPlant },
      { status: 201 }
    );
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
