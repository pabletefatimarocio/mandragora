import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import env from "@/env";
import { plantEditInfoSchema } from "@/schemas/zod/plants";
import { createNextDate } from "@/lib/createNextDate";

export async function PATCH(request, { params }) {
  try {
    const { id } = await params;

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
        return NextResponse.json({ error: "Invalid data or missing form fields" }, { status: 500 });
      }

      const data = zodResponse.data;

      if (data.waterings.length) {
        data.next_watering = createNextDate(data.watering, data.waterings);
      } else {
        return NextResponse.json({ error: "Invalid data or missing form fields" }, { status: 500 });
      }

      if (data.fertilizations.length) {
        data.next_fertilization = createNextDate(data.fertilization, data.fertilizations);
      }

      const updatedPlant = await prisma.plant.update({ where: { id, user_id }, data });

      return NextResponse.json({ message: "Plant successfully updated", data: updatedPlant }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    const session = await auth();
    const user_id = session.user.id;

    const deletedPlant = await prisma.plant.delete({ where: { id, user_id } });

    return NextResponse.json({ message: "Plant successfully deleted", data: deletedPlant }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
