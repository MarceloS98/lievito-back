export interface Ingredient {
  ingredient_id: number;
  name: string;
  description: string | null;
  price_kg: number;
}

export interface IngredientPayload extends Omit<Ingredient, "ingredient_id"> {}
