import { ProductType } from "./type";
import { updateProduct, findProductByBarCode } from "./repository";
import { findCategoryById } from "../category/repository";
import { ApiError } from "../../config/Error";

const updateProductService = async ({
  id,
  bar_code,
  category_id,
  name,
  price,
  unit,
}: ProductType) => {
  try {
    if (!id || !bar_code || !category_id || !name || !price || !unit)
      throw new ApiError("Dados inválidos", null);

    const category = await findCategoryById(category_id);

    if (!category) throw new ApiError("Categoria não encontrada", null);

    const productExists = await findProductByBarCode(bar_code);

    const product_id = productExists!.getDataValue("id");

    if (productExists && id != product_id)
      throw new ApiError("Codigo de barras já cadastrado", null);

    await updateProduct({
      id,
      bar_code,
      category_id,
      name,
      price,
      unit,
    });

    return { message: "Produto atualizado com sucesso" };
  } catch (error) {
    throw new ApiError("Erro ao atualizar produto", error);
  }
};

export { updateProductService };
