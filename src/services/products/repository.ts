import { ProductType } from "./type";
import { Product } from "../../model/product";
import { Op } from "sequelize";

interface filterProductType {
  category_id: number;
  bar_code: string;
  name: string;
  limit: number;
  offset: number;
}

const createProduct = async (product: ProductType) =>
  await Product.create(product);

const findProductByBarCode = async (bar_code: string) =>
  Product.findOne({
    where: { bar_code },
    include: "category",
    attributes: { exclude: ["category_id"] },
  });

const findProductById = async (id: number) =>
  Product.findByPk(id, {
    include: "category",
    attributes: { exclude: ["category_id"] },
  });

const findProducts = async ({
  category_id,
  bar_code,
  name,
  limit,
  offset,
}: filterProductType) => {
  let where = {};

  if (category_id) {
    where = { category_id };
  }

  if (bar_code) {
    where = { ...where, bar_code: { [Op.like]: `%${bar_code}%` } };
  }

  if (name) {
    where = { ...where, name: { [Op.iLike]: `%${name}%` } };
  }

  return Product.findAndCountAll({
    include: "category",
    where,
    attributes: { exclude: ["category_id"] },
    order: [["id", "ASC"]],
    limit,
    offset,
  });
};

const updateProduct = async (product: ProductType) =>
  Product.update(product, { where: { id: product.id } });

export {
  createProduct,
  findProductByBarCode,
  findProducts,
  findProductById,
  updateProduct,
};
