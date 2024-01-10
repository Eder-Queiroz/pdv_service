import { Request, Response } from "express";
import { updateCategoryService } from "../../services/category/updateCategoryService";

const updateCategoryController = async (req: Request, res: Response) => {
  try {
    const { id, name } = req.body;

    const category = await updateCategoryService({ id, name });

    res.status(200).send(category);
  } catch (error: any) {
    res.status(400).send(error.message);
  }
};

export { updateCategoryController };
