import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    return NextResponse.json(
      { message: "User successfully created" },
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
