import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();

    const user_id = session.user.id;

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const tags = await prisma.tag.findMany({
      where: {
        user_id,
      },
      select: {
        id: true,
        name: true,
        color: true,
        updated_at: true,
      },
    });

    return NextResponse.json({ msg: "UNDER_DEV", data: tags }, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }

    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
