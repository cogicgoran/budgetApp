import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../prisma/lib/prisma";
import { CreateCategoryPayload } from "../../../utils/function/category";

const routeHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany();
      return res.json(categories);
    } catch (error) {
      return res.status(500).send("Internal server error");
    }
  } else if (req.method === "POST") {
    try {
      // TODO: no color validation, no icon validation
      // TODO: validate body;
      const payload = req.body as CreateCategoryPayload;
      const existingCategory = await findCategoryByName(payload.name);
      if (existingCategory)
        return res.status(400).json({
          error: "Category name already exists",
          message: "Category name already exists",
        });
      const category = await saveCategory(payload);
      return res.json(category);
    } catch (error) {
      console.log(error);

      return res.status(500).send("Internal server error");
    }
  } else return res.status(405).send("Method not allowed.");
};

async function saveCategory(categoryPayload: CreateCategoryPayload) {
  return await prisma.category.create({ data: categoryPayload });
}

async function findCategoryByName(categoryName: string) {
  return await prisma.category.findFirst({
    where: {
      name: categoryName,
    },
  });
}

export default routeHandler;
