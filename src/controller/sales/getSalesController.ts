import { Response, Request } from "express";
import { getSalesService } from "../../services/sales/getSalesService";

const getSalesController = async (req: Request, res: Response) => {
  const {
    shift_id,
    product_id,
    payment_method,
    start_sale_time,
    end_sale_time,
    limit,
    offset,
  } = req.query;

  try {
    const sales = await getSalesService({
      shift_id,
      product_id,
      payment_method,
      start_sale_time,
      end_sale_time,
      limit,
      offset,
    });

    res.status(200).json(sales);
  } catch (error: any) {
    res.status(500).json(error.message);
  }
};

export { getSalesController };
