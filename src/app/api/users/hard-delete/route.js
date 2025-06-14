import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function DELETE() {
  try {
    const session = await auth();
    const { id } = session.user;

    if (!id) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 403 });
    }

    const deletedUser = await prisma.user.delete({
      where: {
        id,
      },
    });

    return NextResponse.json(
      { message: "User successfully deleted", data: deletedUser },
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
