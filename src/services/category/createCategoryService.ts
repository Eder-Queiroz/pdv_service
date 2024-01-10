import { CategoryType } from "./type";
import { createCategory, findCategoryByName } from "./repository";
import { ApiError } from "../../config/Error";

const createCategoryService = async ({ name }: CategoryType) => {
  try {
    const categoryExists = await findCategoryByName(name);

    if (categoryExists) throw new ApiError("Categoria já existe", null);

    const category = await createCategory({ name });

    return category;
  } catch (error) {
    throw new ApiError("Erro ao criar uma categoria", error);
  }
};

export { createCategoryService };
