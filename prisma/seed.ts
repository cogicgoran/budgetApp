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

async function main() {
  const prisma = new PrismaClient();
  try {
    await prisma.currency.createMany({
      data: currencies,
      skipDuplicates: true
    });
    console.log("Currencies seeded successfully!");
  } catch (error: unknown) {
    console.error(JSON.stringify(error, null, 2));
    console.error("Failed to seed currencies");
  }
  finally {
    await prisma.$disconnect();
  }
}

main();