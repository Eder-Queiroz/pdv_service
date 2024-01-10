import { Request, Response } from "express";
import { createCategoryService } from "../../services/category/createCategoryService";

const createCategoryController = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;

    const category = await createCategoryService({ name });

    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export { createCategoryController };
