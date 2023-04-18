import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";
import { ReceiptDto } from "../../../utils/dto/receipt.dto";
import { ZodError } from "zod";

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      // happy path
      const receiptId = Number(req.query.id);
      const receipt = await prisma.receipt.findFirst({
        where: {
          id: {
            equals: receiptId,
          },
        },
        select: {
          articles: {
            select: {
              id: true,
              amount: true,
              category: true,
              name: true,
              unitPrice: true,
            },
          },
          currency: {
            select: {
              id: true,
              code: true,
            },
          },
          date: true,
          marketplace: true,
          id: true,
        },
      });

      return res.json({
        receipt: receipt ?? null,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "PUT") {
    try {
      const receiptId = Number(req.query.id);
      const payload = ReceiptDto.parse(req.body);
      await prisma.$transaction([
        prisma.receipt.update({
          data: {
            date: new Date(payload.date),
            currency: { connect: { id: payload.currencyId } },
            marketplace: { connect: { id: payload.marketplaceId } },
          },
          where: {
            id: receiptId,
          },
        }),
        prisma.article.deleteMany({
          where: {
            receiptId: {
              equals: receiptId,
            },
            id: {
              notIn: payload.articles
                .filter((article) => !!article.id)
                .map((article) => article.id as number),
            },
          },
        }),
        ...payload.articles.map((article) => {
          return prisma.article.upsert({
            create: {
              amount: article.amount,
              name: article.name,
              unitPrice: article.unitPrice,
              categoryId: article.category,
              currencyId: payload.currencyId,
              receiptId: receiptId,
            },
            update: {
              amount: article.amount,
              name: article.name,
              unitPrice: article.unitPrice,
              categoryId: article.category,
              currencyId: payload.currencyId,
              receiptId: receiptId,
            },
            where: {
              id: article.id ?? 0,
            },
          });
        }),
      ]);
      return res.json({ message: "Action successfull" });
    } catch (error) {
      console.log(error);

      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.issues.map((issue) => issue.message),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  } else if (req.method === "DELETE") {
    const receiptId = Number(req.query.id);
    try {
      if (isNaN(receiptId)) {
        // throw exception
      }

      await prisma.$transaction([
        prisma.article.deleteMany({
          where: {
            receiptId: {
              equals: receiptId,
            },
          },
        }),
        prisma.receipt.delete({
          where: {
            id: receiptId,
          },
        }),
      ]);
      return res.json({ message: "Action successfull" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal server error" });
    }
  } else {
    res.statusCode = 405;
    return res.send("Method not allowed.");
  }
};

export default routeHandler;
