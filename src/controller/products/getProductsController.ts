import { Request, Response } from "express";
import { getProductsService } from "../../services/products/getProductsService";

const getProductsController = async (req: Request, res: Response) => {
  try {
    const { category_id, bar_code, name, limit, offset } = req.query;

    const products = await getProductsService({
      category_id,
      bar_code,
      name,
      limit,
      offset,
    });

    res.status(200).json(products);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export { getProductsController };
