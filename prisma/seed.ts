import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

import data from "../seed-data/dish.json";

const dishes = data as unknown as {
  name: string;
  description: string;
  image: string;
}[];

async function main() {
  for (const dishName of dishes) {
    await prisma.dish.create({
      data: {
        name: dishName.name,
        description: dishName.description,
        image: dishName.image,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
