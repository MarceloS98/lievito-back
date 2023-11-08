import { IngredientStock } from "./ingredientStock";

export interface IngredientStockMovement {
  movement_id: number;
  movement_date: Date;
  quantity: number;
  movement_type: string;
  concept?: string;
  created_at: Date;
  ingredient_stock: IngredientStock;
  ingredient_stock_id: number;
}

export interface IngredientStockMovementPayload {
  movement_date: Date;
  quantity: number;
  movement_type: string;
  concept?: string;
  ingredient_stock_id: number;
}
