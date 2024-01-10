import { Category } from "../../model/category";
import { CategoryType } from "./type";

const createCategory = async (category: CategoryType) =>
  Category.create(category);

const findCategoryByName = async (name: string) =>
  Category.findOne({ where: { name } });

const findCategoryById = async (id: number) => Category.findByPk(id);

const findCategories = async () => Category.findAll();

const updateCategory = async (category: CategoryType) =>
  Category.update(category, { where: { id: category.id } });

export {
  createCategory,
  findCategoryByName,
  findCategories,
  updateCategory,
  findCategoryById,
};
