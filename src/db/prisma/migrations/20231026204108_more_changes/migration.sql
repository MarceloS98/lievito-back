-- DropForeignKey
ALTER TABLE "IngredientStock" DROP CONSTRAINT "IngredientStock_ingredient_id_fkey";

-- DropForeignKey
ALTER TABLE "OutgoingIngredient" DROP CONSTRAINT "OutgoingIngredient_ingredient_stock_id_fkey";

-- AlterTable
ALTER TABLE "IngredientStock" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "IngredientStock" ADD CONSTRAINT "IngredientStock_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutgoingIngredient" ADD CONSTRAINT "OutgoingIngredient_ingredient_stock_id_fkey" FOREIGN KEY ("ingredient_stock_id") REFERENCES "IngredientStock"("ingredient_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;
