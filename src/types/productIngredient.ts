export interface ProductIngredient {
  product_ingredient_id: number;
  product_id: number;
  ingredient_id: number;
  quantity: number;
}

export interface ProductIngredientPayload {
  product_id?: number;
  ingredient_id?: number;
  quantity?: number;
}
