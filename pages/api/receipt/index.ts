import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const payload = req.body;
      const receipt = await prisma.receipt.create({
        data: {
          date: new Date(payload.date),
          articles: {
            createMany: {
              data: payload.articles.map((article: any) => ({
                amount: 1,
                name: article.name,
                unitPrice: article.price,
                categoryId: Number(article.category.id),
                currencyId: Number(payload.currencyId),
              })),
            },
          },
          currency: { connect: { id: Number(payload.currencyId) } },
          marketplace: { connect: { id: Number(payload.marketplaceId) } },
        },
      });

      return res.json(receipt);
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
