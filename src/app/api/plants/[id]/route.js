import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import prisma from "@/lib/db";
// import { v2 as cloudinary } from "cloudinary";
// import env from "@/env";
import { plantEditInfoSchema } from "@/schemas/zod/plants";
import { createNextDate } from "@/lib/createNextDate";
import { tagsUpdateSchema } from "@/schemas/zod/tags";

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
      // ZOD PARSE
      const zodResponse = tagsUpdateSchema.safeParse(tags);

      if (!zodResponse.success) {
        return NextResponse.json({ error: "Invalid data or missing form fields" }, { status: 500 });
      }

      const updatingTags = zodResponse.data;

      // FIND_PLANT_TO_UPDATE
      const toUpdatePlant = await prisma.plant.findUnique({
        where: {
          id,
          user_id,
        },
        select: {
          tags: true,
        },
      });

      // SPLIT_TAGS_INTO_ACTIONS
      const toRemoveTags = [];
      const toMaintainTags = [];
      const toConnectTags = [];

      toUpdatePlant.tags.forEach((prevTag) => {
        let found = false;
        updatingTags.forEach((updatingTag) => {
          // TO_MAINTAIN_TAGS
          if (prevTag.id === updatingTag.id) {
            found = true;
            toMaintainTags.push(prevTag);
          }
        });

        // TO_REMOVE_TAGS
        if (!found) toRemoveTags.push(prevTag);
      });

      // TO_CONNECT_TAGS
      updatingTags.forEach((updatingTag) => {
        let discard = false;

        [...toRemoveTags, ...toMaintainTags].forEach((discardingTag) => {
          if (updatingTag.id === discardingTag.id) {
            discard = true;
          }
        });

        if (!discard) toConnectTags.push(updatingTag);
      });

      toRemoveTags.forEach(async (toRemoveTag) => {
        await prisma.plant.update({
          where: {
            id,
            user_id,
          },
          data: {
            tags: {
              disconnect: {
                id: toRemoveTag.id,
              },
            },
          },
        });
      });

      // CONNECT_TAGS
      toConnectTags.forEach(async (tag) => {
        const foundTag = await prisma.tag.findUnique({
          where: {
            id: tag.id,
            user_id,
          },
        });

        if (foundTag) {
          // CONNECT_EXISTING_TAGS
          await prisma.plant.update({
            where: {
              id,
              user_id,
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
          // CREATE_&_CONNECT_NEW_TAGS
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
              id,
              user_id,
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

      return NextResponse.json({ message: "Plant successfully updated" }, { status: 201 });
    } else {
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
