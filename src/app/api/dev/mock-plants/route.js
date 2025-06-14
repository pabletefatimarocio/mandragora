import prisma from "@/lib/db";
import { NextResponse } from "next/server";

const plants = [
  {
    name: "Helecho Doméstico",
    scientific: "Nephrolepis exaltata",
    watering: 3,
    fertilization: 15,
    img: "https://jardinjasmin.com/wp-content/uploads/2020/03/nephrolepsis-boston.png",
  },

  {
    name: "Girasol",
    scientific: "Helianthus annuus",
    watering: 7,
    fertilization: 18,
    img: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-173230110-64c785f97fe37.jpg",
  },
  {
    name: "Jade",
    scientific: "Crassula ovata",
    watering: 15,
    fertilization: 20,
    img: "https://growsomething.ca/cdn/shop/files/PXL_20230704_215448408.PORTRAIT_2.jpg?v=1688557844&width=1946",
  },
  {
    name: "Caracola Roja",
    scientific: "Iresine herbstii",
    watering: 6,
    fertilization: 30,
    img: "https://www.plantasyhongos.es/herbarium/i/Iresine_herbstii_01b.jpg",
  },
  {
    name: "Jazmín",
    scientific: "Jasminum",
    watering: 2,
    fertilization: 15,
    img: "https://azaleatiendabotanica.home.blog/wp-content/uploads/2020/09/gardenia-5097886_1920.jpg?w=1024",
  },
  {
    name: "Amapola silvestre",
    scientific: "Papaver rhoeas",
    watering: 10,
    fertilization: 15,
    img: "https://m.media-amazon.com/images/I/61JFejExUmL._AC_UF894,1000_QL80_.jpg",
  },
  {
    name: "Sansevieria",
    scientific: "Sansevieria",
    watering: 8,
    fertilization: 18,
    img: "https://phantom-elmundo.uecdn.es/1cf0b5241f5717cf941be61bb9a16472/resize/828/f/webp/assets/multimedia/imagenes/2023/01/13/16736014713489.jpg",
  },
  {
    name: "Cerimán",
    scientific: "Monstera deliciosa",
    watering: 4,
    fertilization: 30,
    img: "https://viverocuipo.com/cdn/shop/articles/monstera_deliciosa_panama.png?v=1662413766",
  },
];

const tags = [
  {
    name: "Sol indirecto",
    color: "#247F89",
  },
  {
    name: "Agua de plátano",
    color: "#897D24",
  },
  {
    name: "Estopa de coco",
    color: "#5C8924",
  },
  {
    name: "Podar las hojas secas",
    color: "#612489",
  },
  {
    name: "Buen drenaje",
    color: "#892424",
  },
];

export async function POST(request) {
  try {
    const { user_id } = await request.json();

    // MOCK TAGS
    const createdTags = [];
    for (const tag of tags) {
      const newTag = await prisma.tag.create({
        data: {
          user_id,
          name: tag.name,
          color: tag.color,
        },
      });

      createdTags.push(newTag);
    }

    const FULL_DAY_TIME = 86400000;
    const TODAY = new Date().getTime();

    const createdPlants = [];
    for (const plant of plants) {
      // MOCK WATERINGS
      const waterings = [];
      const randomDays =
        Math.floor(Math.random() * 60 * FULL_DAY_TIME) +
        plant.watering * FULL_DAY_TIME;
      let watering = TODAY - randomDays;

      if (Math.random() < 0.7) {
        while (watering < TODAY) {
          waterings.push(new Date(watering));
          watering += FULL_DAY_TIME * plant.watering;
        }
      } else {
        while (watering < TODAY - plant.watering * FULL_DAY_TIME) {
          waterings.push(new Date(watering));
          watering += FULL_DAY_TIME * plant.watering;
        }
      }

      // MOCK NEXT WATERING
      const lastWatering = waterings[waterings.length - 1].getTime();
      const daysUntilNextWatering = plant.watering * FULL_DAY_TIME;
      const next_watering = new Date(lastWatering + daysUntilNextWatering);

      // MOCK FERTILIZATIONS
      const fertilizations = [];
      const fertilizationRandomDays =
        Math.floor(Math.random() * 90 * FULL_DAY_TIME) +
        plant.fertilization * FULL_DAY_TIME;
      let fertilization = TODAY - fertilizationRandomDays;

      if (Math.random() < 0.7) {
        while (fertilization < TODAY) {
          fertilizations.push(new Date(fertilization));
          fertilization += FULL_DAY_TIME * plant.fertilization;
        }
      } else {
        while (fertilization < TODAY - plant.fertilization * FULL_DAY_TIME) {
          fertilizations.push(new Date(fertilization));
          fertilization += FULL_DAY_TIME * plant.fertilization;
        }
      }

      // MOCK NEXT FERTILIZATION
      const lastFertilization =
        fertilizations[fertilizations.length - 1].getTime();
      const daysUntilNextFertilization = plant.fertilization * FULL_DAY_TIME;
      const next_fertilization = new Date(
        lastFertilization + daysUntilNextFertilization
      );

      const newMockPlant = await prisma.plant.create({
        data: {
          user_id,
          name: plant.name,
          scientific: plant.scientific,
          img: plant.img,
          watering: plant.watering,
          waterings,
          next_watering,
          fertilization: plant.fertilization,
          fertilizations,
          next_fertilization,
        },
      });

      createdPlants.push(newMockPlant);
    }

    // ADD_MOCK_TAGS
    for (const plant of createdPlants) {
      for (const tag of createdTags) {
        if (Math.random() > 0.6) {
          await prisma.plant.update({
            where: {
              id: plant.id,
            },
            data: {
              tags: {
                connect: {
                  id: tag.id,
                },
              },
            },
          });
        }
      }
    }

    const mockedPlants = await prisma.plant.findMany({
      where: {
        user_id,
      },
      include: {
        tags: {
          omit: {
            user_id: true,
            updated_at: true,
          },
        },
      },
    });

    return NextResponse.json(mockedPlants, { status: 201 });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.stack);
    }
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
