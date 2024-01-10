import { SaleType } from "./type";
import { Sale } from "../../model/sale";
import { Op } from "sequelize";

interface filterSaleType {
  shift_id: number;
  product_id: number;
  payment_method: string;
  start_sale_time: string;
  end_sale_time: string;
  limit: number;
  offset: number;
}

const createSale = async (sale: SaleType) => Sale.create(sale);

const findSales = async ({
  shift_id,
  product_id,
  payment_method,
  start_sale_time,
  end_sale_time,
  limit,
  offset,
}: filterSaleType) => {
  let where = {};

  if (shift_id) {
    where = { shift_id };
  }

  if (product_id) {
    where = { ...where, product_id };
  }

  if (payment_method) {
    where = { ...where, payment_method };
  }

  if (start_sale_time && end_sale_time) {
    where = {
      ...where,
      sale_time: {
        [Op.between]: [
          new Date(start_sale_time).toISOString(),
          new Date(end_sale_time).toISOString(),
        ],
      },
    };
  }

  return Sale.findAndCountAll({
    include: [
      { association: "product" },
      {
        association: "shift",
        include: [{ association: "user", attributes: ["name"] }],
      },
    ],
    attributes: { exclude: ["product_id", "shift_id"] },
    where,
    order: [["id", "ASC"]],
    limit,
    offset,
  });
};

export { createSale, findSales };
