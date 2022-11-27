import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const marketplaces = await prisma.marketplace.findMany();
      return res.json(marketplaces);
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  } else {
    res.statusCode = 405;
    return res.send("Method not allowed.");
  }
};
