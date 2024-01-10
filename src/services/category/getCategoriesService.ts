import { findCategories } from "./repository";
import { ApiError } from "../../config/Error";

const getCategoriesService = async () => {
  try {
    const categories = await findCategories();

    return categories;
  } catch (error) {
    throw new ApiError("Erro ao buscar categorias", error);
  }
};

export { getCategoriesService };
