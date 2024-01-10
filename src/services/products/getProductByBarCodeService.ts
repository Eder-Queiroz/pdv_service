import { findProductByBarCode } from "./repository";
import { ApiError } from "../../config/Error";

const getProductByBarCodeService = async (bar_code: string) => {
  try {
    const product = await findProductByBarCode(bar_code);

    if (!product) {
      throw new ApiError("Product not found", 404);
    }

    return product;
  } catch (error) {
    throw new ApiError("Error ao buscar produto", error);
  }
};

export { getProductByBarCodeService };
