import { findProductById } from "./repository";
import { ApiError } from "../../config/Error";

const getOneProductService = async (id: number) => {
  try {
    const product = await findProductById(id);

    if (!product) throw new ApiError("Produto não encontrado", 404);

    return product;
  } catch (error) {
    throw new ApiError("Erro ao buscar produto", error);
  }
};

export { getOneProductService };
