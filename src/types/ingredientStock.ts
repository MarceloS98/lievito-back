export interface IngredientStock {
  ingredient_stock_id: number;
  ingredient_id: number;
  quantity_kg: number;
  expiration_date: Date | null;
}
