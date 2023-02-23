import { PrismaClient } from "@prisma/client";

export async function queryRecentReceipts(prisma: PrismaClient) {
  return await prisma.receipt.findMany({
    select: {
      id: true,
      date: true,
      marketplace: {
        select: {
          address: true,
        },
      },
      currency: {
        select: {
          code: true,
        },
      },
      articles: {
        select: {
          unitPrice: true,
          amount: true,
          category: true,
        },
      },
    },
    orderBy: {
      date: "desc",
    },
    take: 5,
  });
}

export async function queryCurrentMonthReceipts(prisma: PrismaClient) {
  return await prisma.receipt.findMany({
    select: {
      currency: true,
      articles: {
        select: {
          category: true,
          unitPrice: true,
          amount: true
        },
      },
    },
  });
}

export type RecentReceiptQuery = Awaited<
  ReturnType<typeof queryRecentReceipts>
>[number];

export type CurrentMonthReceiptsQuery = Awaited<
  ReturnType<typeof queryCurrentMonthReceipts>
>[number];
