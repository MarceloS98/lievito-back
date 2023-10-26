-- DropForeignKey
ALTER TABLE "IngredientStock" DROP CONSTRAINT "IngredientStock_ingredient_id_fkey";

-- AddForeignKey
ALTER TABLE "IngredientStock" ADD CONSTRAINT "IngredientStock_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("ingredient_id") ON DELETE CASCADE ON UPDATE CASCADE;
