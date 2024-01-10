import { findSales } from "./repository";
import { ApiError } from "../../config/Error";

const getSalesService = async ({
  shift_id,
  product_id,
  payment_method,
  start_sale_time,
  end_sale_time,
  limit,
  offset,
}: any) => {
  try {
    const sales = await findSales({
      shift_id,
      product_id,
      payment_method,
      start_sale_time,
      end_sale_time,
      limit,
      offset,
    });

    return sales;
  } catch (error) {
    throw new ApiError("Erro ao buscar vendas", error);
  }
};

export { getSalesService };
