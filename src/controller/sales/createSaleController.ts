import { Request, Response } from "express";
import { createSaleService } from "../../services/sales/createSaleService";

const createSaleController = async (req: Request, res: Response) => {
  const { shift_id, product_id, quantity, payment_method } = req.body;

  try {
    const newSale = await createSaleService({
      shift_id,
      product_id,
      quantity,
      payment_method,
    });

    res.status(201).json(newSale);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export { createSaleController };
