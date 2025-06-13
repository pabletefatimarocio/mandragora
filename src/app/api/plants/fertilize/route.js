import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { id } = await request.json();

    const session = await auth();

    const user_id = session.user.id;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const foundPlant = await prisma.plant.findUnique({
      where: {
        id,
        user_id,
      },
    });

    const fertilizations = [...foundPlant.fertilizations, new Date()];
    const next_fertilization = new Date(
      new Date().getTime() + foundPlant.fertilization * 1000 * 60 * 60 * 24
    );

    await prisma.plant.update({
      where: {
        id,
        user_id,
      },
      data: {
        fertilizations,
        next_fertilization,
      },
    });

    return NextResponse.json(
      { message: "Plant successfully fertilized" },
      { status: 200 }
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
