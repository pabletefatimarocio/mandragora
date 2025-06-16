import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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
  // BODY CHECK
  const { name, scientific, imageFile, watering, fertilization } =
    await request.json();

  if (!name || !scientific || !imageFile.file || !watering || !fertilization) {
    return NextResponse.json({ error: "Missing form fields" }, { status: 500 });
  }
  try {
    // SESSION USER_ID CHECK
    const session = await auth();

    const user_id = session.user.id;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // PLANT PREVIOUS EXISTANCE CHECK
    const foundPlant = await prisma.plant.findFirst({
      where: {
        user_id,
        name,
      },
      select: {
        id: true,
      },
    });

    if (foundPlant) {
      return NextResponse.json(
        { error: "Plant name already in use" },
        { status: 400 }
      );
    }

    // CLOUDINARY IMAGE UPLOAD
    const public_id = imageFile.name.split(".").slice(0, -1).join(".");
    const newImage = {};

    try {
      const result = await cloudinary.uploader.upload(imageFile.file, {
        public_id,
        folder: process.env.CLOUDINARY_FOLDER,
      });

      newImage.img = result.secure_url;
      newImage.img_width = result.width;
      newImage.img_height = result.height;
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error }, { status: 500 });
    }

    const { img, img_width, img_height } = newImage;

    const newPlant = await prisma.plant.create({
      data: {
        user_id,
        name,
        scientific,
        img,
        img_width,
        img_height,
        watering: Number(watering),
        fertilization: Number(fertilization),
      },
      select: {
        id: true,
      },
    });

    return NextResponse.json(
      { message: "Plant successfully created", data: newPlant },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }

    await cloudinary.uploader.destroy(
      `${process.env.CLOUDINARY_FOLDER}/${imageFile.name}`
    );

    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}
