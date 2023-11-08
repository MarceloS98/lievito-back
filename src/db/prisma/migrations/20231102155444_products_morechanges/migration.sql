/*
  Warnings:

  - You are about to drop the `ProductPresentation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ProductPresentation" DROP CONSTRAINT "ProductPresentation_presentation_id_fkey";

-- DropForeignKey
ALTER TABLE "ProductPresentation" DROP CONSTRAINT "ProductPresentation_product_id_fkey";

-- DropTable
DROP TABLE "ProductPresentation";
