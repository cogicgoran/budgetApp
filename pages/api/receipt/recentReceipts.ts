import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";
import {
  queryRecentReceipts,
} from "../../../server/repository/receipt";
import {
  buildRecentReceipts,
} from "../../../server/service/receipt";

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const receipts = await queryRecentReceipts(prisma);
      const recentReceipts = buildRecentReceipts(receipts);
      return res.json(recentReceipts);
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
