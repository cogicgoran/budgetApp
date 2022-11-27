import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      //get recent receipts
      const recentReceipts: any = [];
      return res.json(recentReceipts);
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  } else {
    res.statusCode = 405;
    return res.send("Method not allowed.");
  }
};
