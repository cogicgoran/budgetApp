import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const currencies = await prisma.currency.findMany();
      return res.json(currencies);
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  } else {
    return res.status(405).send("Method not allowed.");
  }
};
