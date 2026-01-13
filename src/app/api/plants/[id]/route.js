import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import env from "@/env";
import { plantEditInfoSchema } from "@/schemas/zod/plants";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

    console.log("ID: ", id);

    const session = await auth();

    const user_id = session.user.id;

    const body = await request.json();
    const { imageFile, tags, ...rest } = body;

    if (imageFile) {
      //TODO: update img
    } else if (tags) {
      //TODO: update tags
    } else {
      //TODO: update info
      const zodResponse = plantEditInfoSchema.safeParse(rest);

      if (!zodResponse.success) {
        console.log(zodResponse.error.issues);
        return NextResponse.json({ error: "Invalid data or missing form fields" }, { status: 500 });
      }

      const data = zodResponse.data;

      const updatedPlant = await prisma.plant.update({ where: { id, user_id }, data });

      return NextResponse.json({ message: "Plant successfully updated", data: updatedPlant }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
