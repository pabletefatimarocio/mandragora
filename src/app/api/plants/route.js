import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
import { v2 as cloudinary } from "cloudinary";
import env from "@/env";
import { plantInputSchema } from "@/schemas/zod/plants";

cloudinary.config({
  cloud_name: env.CLOUDINARY_CLOUD_NAME,
  api_key: env.CLOUDINARY_API_KEY,
  api_secret: env.CLOUDINARY_API_SECRET,
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

    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    // SESSION USER_ID CHECK
    const session = await auth();

    const user_id = session.user.id;

    if (!user_id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // BODY ZOD PARSE
    const body = await request.json();

    const zodResponse = plantInputSchema.safeParse(body);

    if (!zodResponse.success) {
      console.log(zodResponse.error.issues);
      return NextResponse.json({ error: "Invalid data or missing form fields" }, { status: 500 });
    }

    const {
      name,
      scientific,
      location_place,
      location_type,
      under_rain,
      watering,
      waterings,
      fertilization,
      fertilizations,
      tags,
      imageFile,
    } = zodResponse.data;

    let next_watering = null;
    let next_fertilization = null;

    if (waterings.length) {
      const MILLISECOND_TIME = 1000;
      const SECOND_TIME = 60;
      const MINUTE_TIME = 60;
      const HOUR_TIME = 24;

      const lastWateringTime = new Date(waterings[waterings.length - 1]).getTime();

      const nextWateringTime = lastWateringTime + MILLISECOND_TIME * SECOND_TIME * MINUTE_TIME * HOUR_TIME * watering;

      next_watering = new Date(nextWateringTime).toISOString();
    }

    if (fertilizations.length) {
      const MILLISECOND_TIME = 1000;
      const SECOND_TIME = 60;
      const MINUTE_TIME = 60;
      const HOUR_TIME = 24;

      const lastFertilizationTime = new Date(fertilizations[fertilizations.length - 1]).getTime();

      const nextWateringTime =
        lastFertilizationTime + MILLISECOND_TIME * SECOND_TIME * MINUTE_TIME * HOUR_TIME * fertilization;

      next_fertilization = new Date(nextWateringTime).toISOString();
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
      return NextResponse.json({ error: "Plant name already in use" }, { status: 400 });
    }

    // CLOUDINARY IMAGE UPLOAD
    const public_id = imageFile.name.split(".").slice(0, -1).join(".");
    const newImage = {};

    try {
      const result = await cloudinary.uploader.upload(imageFile.file, {
        public_id,
        folder: env.CLOUDINARY_FOLDER,
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
        location_place,
        location_type,
        under_rain,
        watering,
        waterings,
        next_watering,
        fertilization,
        fertilizations,
        next_fertilization,
        img,
        img_width,
        img_height,
      },
      select: {
        id: true,
      },
    });

    //TAGS
    tags.forEach(async (tag) => {
      const foundTag = await prisma.tag.findUnique({
        where: {
          id: tag.id,
        },
      });

      if (foundTag) {
        await prisma.plant.update({
          where: {
            id: newPlant.id,
          },
          data: {
            tags: {
              connect: {
                id: foundTag.id,
              },
            },
          },
        });
      } else {
        const newTag = await prisma.tag.create({
          data: {
            user_id,
            name: tag.name,
            color: tag.color,
          },
          select: {
            id: true,
          },
        });

        await prisma.plant.update({
          where: {
            id: newPlant.id,
          },
          data: {
            tags: {
              connect: {
                id: newTag.id,
              },
            },
          },
        });
      }
    });

    return NextResponse.json({ message: "Plant successfully created", data: newPlant }, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }

    await cloudinary.uploader.destroy(`${env.CLOUDINARY_FOLDER}/${imageFile.name}`);

    return NextResponse.json({ error: error.message || "Internal server error" }, { status: 500 });
  }
}
