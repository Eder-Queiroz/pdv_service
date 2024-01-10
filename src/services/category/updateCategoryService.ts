import { CategoryType } from "./type";
import { updateCategory } from "./repository";
import { ApiError } from "../../config/Error";

const updateCategoryService = async ({ id, name }: CategoryType) => {
  try {
    if (!id) throw new ApiError("Id não informado", null);

    if (!name) throw new ApiError("Nome não informado", null);

    await updateCategory({ id, name });

    return { message: "Categoria atualizada com sucesso" };
  } catch (error) {
    throw new ApiError("Erro ao atualizar categoria", error);
  }
};

export { updateCategoryService };
