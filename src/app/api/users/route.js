import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    const foundUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (foundUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
      select: {
        name: true,
        email: true,
        password: true,
      },
    });

    return NextResponse.json(
      { message: "User successfully created", data: newUser },
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
