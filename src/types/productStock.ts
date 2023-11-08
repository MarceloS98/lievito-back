export interface ProductStock {
  product_stock_id: number;
  product_id: number;
  presentation_id: number;
  quantity: number;
  expiration_date?: Date;
}
