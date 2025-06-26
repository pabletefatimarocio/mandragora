import prisma from "@/lib/db";
import { NextResponse } from "next/server";
import { faker } from "@faker-js/faker";
import { auth } from "@/lib/auth";

const plants = [
  {
    name: "Helecho Doméstico",
    scientific: "Nephrolepis exaltata",
    watering: 3,
    fertilization: 15,
    img: "https://jardinjasmin.com/wp-content/uploads/2020/03/nephrolepsis-boston.png",
    img_width: 500,
    img_height: 500,
    location_type: "Exterior",
    location_place: "Balcón trasero",
    under_rain: true,
  },

  {
    name: "Girasol",
    scientific: "Helianthus annuus",
    watering: 7,
    fertilization: 18,
    img: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-173230110-64c785f97fe37.jpg",
    img_width: 500,
    img_height: 500,
    location_type: "Exterior",
    location_place: "Jardín",
    under_rain: true,
  },
  {
    name: "Jade",
    scientific: "Crassula ovata",
    watering: 15,
    fertilization: 20,
    img: "https://growsomething.ca/cdn/shop/files/PXL_20230704_215448408.PORTRAIT_2.jpg?v=1688557844&width=1946",
    img_width: 500,
    img_height: 500,
    location_type: "Exterior",
    location_place: "Ventana",
    under_rain: false,
  },
  {
    name: "Caracola Roja",
    scientific: "Iresine herbstii",
    watering: 6,
    fertilization: 30,
    img: "https://www.plantasyhongos.es/herbarium/i/Iresine_herbstii_01b.jpg",
    img_width: 500,
    img_height: 500,
    location_type: "Interior",
    location_place: "Junto a la ventana",
    under_rain: false,
  },
  {
    name: "Jazmín",
    scientific: "Jasminum",
    watering: 2,
    fertilization: 15,
    img: "https://azaleatiendabotanica.home.blog/wp-content/uploads/2020/09/gardenia-5097886_1920.jpg?w=1024",
    img_width: 500,
    img_height: 500,
    location_type: "Exterior",
    location_place: "Vereda",
    under_rain: true,
  },
  {
    name: "Amapola silvestre",
    scientific: "Papaver rhoeas",
    watering: 10,
    fertilization: 15,
    img: "https://m.media-amazon.com/images/I/61JFejExUmL._AC_UF894,1000_QL80_.jpg",
    img_width: 500,
    img_height: 500,
    location_type: "Exterior",
    location_place: "Balcón delantero",
    under_rain: false,
  },
  {
    name: "Sansevieria",
    scientific: "Sansevieria",
    watering: 8,
    fertilization: 18,
    img: "https://phantom-elmundo.uecdn.es/1cf0b5241f5717cf941be61bb9a16472/resize/828/f/webp/assets/multimedia/imagenes/2023/01/13/16736014713489.jpg",
    img_width: 500,
    img_height: 500,
    location_type: "Exterior",
    location_place: "Garaje",
    under_rain: false,
  },
  {
    name: "Cerimán",
    scientific: "Monstera deliciosa",
    watering: 4,
    fertilization: 30,
    img: "https://viverocuipo.com/cdn/shop/articles/monstera_deliciosa_panama.png?v=1662413766",
    img_width: 500,
    img_height: 500,
    location_type: "Interior",
    location_place: "Baño",
    under_rain: false,
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

export async function POST() {
  try {
    const session = await auth();
    const user_id = session.user.id;
    // const { user_id } = await request.json();

    // VERIFY POPULATION
    const previousPlant = await prisma.plant.findFirst({
      where: {
        user_id,
        name: plants[0].name,
        scientific: plants[0].scientific,
      },
    });

    if (previousPlant) {
      return NextResponse.json(
        { error: "Mock plants already planted" },
        { status: 400 }
      );
    }

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
          img_width: plant.img_width,
          img_height: plant.img_height,
          watering: plant.watering,
          waterings,
          next_watering,
          fertilization: plant.fertilization,
          fertilizations,
          next_fertilization,
          location_type: plant.location_type,
          location_place: plant.location_place,
          under_rain: plant.under_rain,
        },
      });

      createdPlants.push(newMockPlant);
    }

    // NOTES & TAGS
    for (const plant of createdPlants) {
      // CREATE NOTES
      for (let i = 0; i < Math.ceil(Math.random() * 5) + 1; i++) {
        const content = faker.lorem.paragraph();
        const created_at = faker.date.past();
        const updated_at = created_at;

        await prisma.note.create({
          data: {
            plant_id: plant.id,
            content,
            created_at,
            updated_at,
          },
        });
      }

      // ADD MOCK TAGS
      for (const tag of createdTags) {
        if (Math.random() > 0.5) {
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
        notes: {
          omit: {
            plant_id: true,
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
