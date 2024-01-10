import { Request, Response } from "express";
import { updateProductService } from "../../services/products/updateProductService";

const updateProductController = async (req: Request, res: Response) => {
  try {
    const { id, bar_code, category_id, name, price, unit } = req.body;

    const product = await updateProductService({
      id,
      bar_code,
      category_id,
      name,
      price,
      unit,
    });

    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).send({ message: error.message });
  }
};

export { updateProductController };
