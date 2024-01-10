import { Response, Request } from "express";
import { getProductByBarCodeService } from "../../services/products/getProductByBarCodeService";

const getProductByBarCodeController = async (req: Request, res: Response) => {
  const { bar_code } = req.params;

  try {
    const product = await getProductByBarCodeService(bar_code);

    return res.status(200).json(product);
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
};

export { getProductByBarCodeController };
