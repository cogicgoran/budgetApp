import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";
import {
    queryReceiptsView,
} from "../../../server/repository/receipt";
import { buildReceiptsReport } from "../../../server/service/receipt";

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const receipts = await queryReceiptsView(prisma);
      const builtReceipts = buildReceiptsReport(receipts);
      const data = {
        items: builtReceipts,
        currentPage: 1,
        totalPages:2,
        hasMore: true,
        totalCount: 15,
        itemsPerPage: 10
      }
      return res.json(data);
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
