import { SaleType } from "./type";
import { createSale } from "./repository";
import { findProductById, updateProduct } from "../products/repository";
import { findShiftById } from "../shifts/repository";
import { ApiError } from "../../config/Error";
import { payment } from "../../utils/constants/payment";

const createSaleService = async ({
  shift_id,
  product_id,
  quantity,
  payment_method,
}: SaleType) => {
  try {
    if (!shift_id || !product_id || !quantity || !payment_method)
      throw new ApiError("Dados inválidos", null);

    const shift = await findShiftById(shift_id);
    const is_opened = shift?.getDataValue("is_opened");

    if (!is_opened)
      throw new ApiError(
        "Não é possível registrar venda em um turno fechado",
        null
      );

    if (!Object.values(payment).includes(payment_method))
      throw new ApiError("Método de pagamento inválido", null);

    const product = await findProductById(product_id);
    const { id, bar_code, name, price, unit, category_id } = product!.get();

    if (!product) throw new ApiError("Produto não encontrado", null);

    const newProductQuantity = unit - quantity;

    if (newProductQuantity < 0)
      throw new ApiError("Quantidade insuficiente em estoque", null);

    const sale_time = new Date().toISOString();

    const newSale = await createSale({
      shift_id,
      product_id,
      quantity,
      payment_method,
      sale_time,
    });

    await updateProduct({
      id,
      bar_code,
      name,
      price,
      unit: newProductQuantity,
      category_id,
    });

    return newSale;
  } catch (error) {
    throw new ApiError("Erro ao registrar venda", error);
  }
};

export { createSaleService };
