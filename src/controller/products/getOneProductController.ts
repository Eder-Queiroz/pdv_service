import { Request, Response } from "express";
import { getOneProductService } from "../../services/products/getOneProductService";

const getOneProductController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const product = await getOneProductService(parseInt(id));

    res.status(200).json(product);
  } catch (error) {
    res.status(400).json(error);
  }
};

export { getOneProductController };
