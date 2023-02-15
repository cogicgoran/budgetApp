import { NextApiRequest, NextApiResponse } from "next";
import {
  CurrentMonthReceiptsQuery,
  queryCurrentMonthReceipts,
} from "../../../server/repository/receipt";
import prisma from "../../../prisma/lib/prisma";
import { Category } from "@prisma/client";

function buildCurrentMonthReceiptsReport(
  receipts: CurrentMonthReceiptsQuery[]
) {
  let total = 0;
  let currency = "RSD";
  const categoryMap = new Map<string, number>();
  const categoryNameMap = new Map<string, Category>();

  receipts.forEach((receipt) => {
    if(receipt.currency.code !== "RSD") return; // Only use receipts with RSD currency
    receipt.articles.forEach((article) => {
      total += article.unitPrice;
      const mappedValue = categoryMap.get(article.category.name);
      if (!mappedValue) {
        categoryMap.set(article.category.name, article.unitPrice);
        categoryNameMap.set(article.category.name, article.category)
        return;
      }
      categoryMap.set(article.category.name, mappedValue + article.unitPrice);
    });
  });

  const perCategoryNameReport = Array.from(categoryMap.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3);

  const perCategoryReport = perCategoryNameReport.map((categoryData) => {
    return {
      category: categoryNameMap.get(categoryData[0]),
      total: categoryData[1]
    }
  })

  return {
    total,
    currency,
    perCategory: perCategoryReport,
  };
}

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const receipts = await queryCurrentMonthReceipts(prisma);
      const currentMonthReceiptsReport =
        buildCurrentMonthReceiptsReport(receipts);
      return res.json(currentMonthReceiptsReport);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  } else {
    res.statusCode = 405;
    return res.send("Method not allowed.");
  }
};

export default routeHandler;
