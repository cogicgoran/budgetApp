import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";
import { ZodError } from "zod";
import { ReceiptDto } from "../../../utils/dto/receipt.dto";

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    try {
      const payload = ReceiptDto.parse(req.body);
      const receipt = await prisma.receipt.create({
        data: {
          date: new Date(payload.date),
          articles: {
            createMany: {
              data: payload.articles.map((article) => ({
                amount: article.amount,
                name: article.name,
                unitPrice: article.unitPrice,
                categoryId: article.category,
                currencyId: payload.currencyId,
              })),
            },
          },
          currency: { connect: { id: payload.currencyId } },
          marketplace: { connect: { id: payload.marketplaceId } },
        },
      });

      return res.json(receipt);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));

      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.issues.map((issue) => issue.message),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.statusCode = 405;
    return res.send("Method not allowed.");
  }
};

export default routeHandler;
