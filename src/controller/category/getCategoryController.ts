import { Request, Response } from "express";
import { getCategoriesService } from "../../services/category/getCategoriesService";

const getCategoriesController = async (req: Request, res: Response) => {
  try {
    const categories = await getCategoriesService();

    res.status(200).send(categories);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export { getCategoriesController };
