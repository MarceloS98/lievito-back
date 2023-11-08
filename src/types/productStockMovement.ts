import { ProductStock } from "./productStock";

export interface ProductStockMovement {
  movement_id: number;
  movement_date: Date;
  quantity: number;
  movement_type: string;
  concept?: string;
  created_at: Date;
  product_stock: ProductStock;
  product_stock_id: number;
}

export interface ProductStockMovementPayload {
  movement_date: Date;
  quantity: number;
  movement_type: string;
  concept?: string;
  product_stock_id: number;
}
