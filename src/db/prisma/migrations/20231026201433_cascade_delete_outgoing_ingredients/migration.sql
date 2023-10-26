-- DropForeignKey
ALTER TABLE "OutgoingIngredient" DROP CONSTRAINT "OutgoingIngredient_ingredient_stock_id_fkey";

-- AddForeignKey
ALTER TABLE "OutgoingIngredient" ADD CONSTRAINT "OutgoingIngredient_ingredient_stock_id_fkey" FOREIGN KEY ("ingredient_stock_id") REFERENCES "IngredientStock"("ingredient_stock_id") ON DELETE NO ACTION ON UPDATE CASCADE;
