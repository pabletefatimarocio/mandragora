import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  try {
    const { id } = await params;

    const session = await auth();

    const user_id = session.user.id;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const plantDetails = await prisma.plant.findUnique({
      where: {
        id,
        user_id,
      },
    });

    if (!plantDetails) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    return NextResponse.json(plantDetails, { status: 200 });
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
