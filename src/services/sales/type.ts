type SaleType = {
  id?: number;
  shift_id: number;
  product_id: number;
  quantity: number;
  payment_method: string;
  sale_time?: string;
};

export { SaleType };
