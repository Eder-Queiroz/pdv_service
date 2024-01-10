import { ProductType } from "./type";
import { createProduct, findProductByBarCode } from "./repository";
import { findCategoryById } from "../category/repository";
import { ApiError } from "../../config/Error";

const createProductService = async ({
  bar_code,
  category_id,
  name,
  price,
  unit,
}: ProductType) => {
  try {
    if (!bar_code || !category_id || !name || !price || !unit)
      throw new ApiError("Dados inválidos", null);

    const category = await findCategoryById(category_id);

    if (!category) throw new ApiError("Categoria não encontrada", null);

    const productExists = await findProductByBarCode(bar_code);

    if (productExists) throw new ApiError("Produto já cadastrado", null);

    const product = await createProduct({
      bar_code,
      category_id,
      name,
      price,
      unit,
    });

    return product;
  } catch (error) {
    throw new ApiError("Erro ao criar produto", error);
  }
};

export { createProductService };
