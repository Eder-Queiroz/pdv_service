import { Request, Response } from "express";
import { createProductService } from "../../services/products/createProductService";

const createProductController = async (req: Request, res: Response) => {
  try {
    const { bar_code, category_id, name, price, unit } = req.body;

    const product = await createProductService({
      bar_code,
      category_id,
      name,
      price,
      unit,
    });

    res.status(201).json(product);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export { createProductController };
