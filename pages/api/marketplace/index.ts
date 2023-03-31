import { NextApiRequest, NextApiResponse } from "next";
import { ZodError } from "zod";
import prisma from "../../../prisma/lib/prisma";
import { AddMarketplaceDto } from "../../../utils/dto/marketplace.dto";

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const marketplaces = await prisma.marketplace.findMany();
      return res.json(marketplaces);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Internal server error");
    }
  } else if (req.method === "POST") {
    try {
      const marketplaceParsed = AddMarketplaceDto.parse(req.body);
      const marketplace = await prisma.marketplace.create({
        data: marketplaceParsed,
      })
      res.json(marketplace);
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      if (error instanceof ZodError) {
        return res.status(400).json({
          errors: error.issues.map((issue) => issue.message),
        });
      }
      return res.status(500).json({ message: "Internal server error" });
    }
  } 
  else {
    res.statusCode = 405;
    return res.send("Method not allowed.");
  }
};

export default routeHandler;
