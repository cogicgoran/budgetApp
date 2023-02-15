import { PrismaClient } from "@prisma/client";

const currencies = [
  {
    id: 1,
    code: "RSD",
  },
  {
    id: 2,
    code: "EUR",
  },
  {
    id: 3,
    code: "USD",
  },
  {
    id: 4,
    code: "BAM",
  },
  {
    id: 5,
    code: "HRK",
  },
];

const marketplaces = [
  {
    id: 1,
    name: "IDEA",
    address: "Jožefa Atile 6, Novi Sad, Serbia",
  },
  {
    id: 2,
    name: "Univerexport",
    address: "Bulevar patrijarha Pavla 6, Novi Sad, Serbia",
  },
];

async function seedCurrencies(prisma: PrismaClient) {
  await prisma.currency.createMany({
    data: currencies,
    skipDuplicates: true,
  });
  console.log("Currencies seeded successfully!");
}

async function seedMarketplaces(prisma: PrismaClient) {
  await prisma.marketplace.createMany({
    data: marketplaces,
    skipDuplicates: true,
  });
  console.log("Marketplaces seeded successfully!");
}

async function main() {
  const prisma = new PrismaClient();
  try {
    await seedCurrencies(prisma);
    await seedMarketplaces(prisma);
    console.log("Seeding completed");
  } catch (error: unknown) {
    console.error(JSON.stringify(error, null, 2));
    console.error("Seeding failed.");
  } finally {
    await prisma.$disconnect();
  }
}

main();
