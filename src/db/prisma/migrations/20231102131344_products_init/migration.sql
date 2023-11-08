/*
  Warnings:

  - You are about to drop the column `fabrication_date` on the `ProductStock` table. All the data in the column will be lost.
  - You are about to drop the `OutgoingProducts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "OutgoingProducts" DROP CONSTRAINT "OutgoingProducts_product_stock_id_fkey";

-- DropIndex
DROP INDEX "Product_name_key";

-- AlterTable
ALTER TABLE "Presentation" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "name" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "ProductStock" DROP COLUMN "fabrication_date",
ADD COLUMN     "is_deleted" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "OutgoingProducts";

-- CreateTable
CREATE TABLE "ProductStockMovement" (
    "movement_id" SERIAL NOT NULL,
    "movement_date" TIMESTAMP(3) NOT NULL,
    "quantity" INTEGER NOT NULL,
    "movement_type" TEXT NOT NULL,
    "concept" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_stock_id" INTEGER NOT NULL,

    CONSTRAINT "ProductStockMovement_pkey" PRIMARY KEY ("movement_id")
);

-- AddForeignKey
ALTER TABLE "ProductStockMovement" ADD CONSTRAINT "ProductStockMovement_product_stock_id_fkey" FOREIGN KEY ("product_stock_id") REFERENCES "ProductStock"("product_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;
