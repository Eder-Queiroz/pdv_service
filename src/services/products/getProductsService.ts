import { findProducts } from "./repository";
import { ApiError } from "../../config/Error";

const getProductsService = async ({
  category_id,
  bar_code,
  name,
  limit,
  offset,
}: any) => {
  try {
    const products = await findProducts({
      category_id,
      bar_code,
      name,
      limit,
      offset,
    });

    return products;
  } catch (error) {
    throw new ApiError("Erro ao buscar produtos", error);
  }
};

export { getProductsService };
