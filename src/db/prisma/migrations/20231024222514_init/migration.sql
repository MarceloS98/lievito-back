-- CreateTable
CREATE TABLE "Product" (
    "product_id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "description" TEXT,
    "price" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("product_id")
);

-- CreateTable
CREATE TABLE "Presentation" (
    "presentation_id" SERIAL NOT NULL,
    "name" VARCHAR(80) NOT NULL,
    "size_gr" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Presentation_pkey" PRIMARY KEY ("presentation_id")
);

-- CreateTable
CREATE TABLE "ProductStock" (
    "product_stock_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "presentation_id" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "fabrication_date" TIMESTAMP(3) NOT NULL,
    "expiration_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProductStock_pkey" PRIMARY KEY ("product_stock_id")
);

-- CreateTable
CREATE TABLE "OutgoingProducts" (
    "outgoing_products_id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "concept" TEXT,
    "outgoing_date" TIMESTAMP(3) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "product_stock_id" INTEGER NOT NULL,

    CONSTRAINT "OutgoingProducts_pkey" PRIMARY KEY ("outgoing_products_id")
);

-- CreateTable
CREATE TABLE "Ingredient" (
    "ingredient_id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price_kg" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Ingredient_pkey" PRIMARY KEY ("ingredient_id")
);

-- CreateTable
CREATE TABLE "IngredientStock" (
    "ingredient_stock_id" SERIAL NOT NULL,
    "quantity_kg" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "expiration_date" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "ingredient_id" INTEGER NOT NULL,

    CONSTRAINT "IngredientStock_pkey" PRIMARY KEY ("ingredient_stock_id")
);

-- CreateTable
CREATE TABLE "OutgoingIngredient" (
    "outgoing_ingredient_id" SERIAL NOT NULL,
    "outgoing_date" TIMESTAMP(3) NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "concept" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ingredient_stock_id" INTEGER NOT NULL,

    CONSTRAINT "OutgoingIngredient_pkey" PRIMARY KEY ("outgoing_ingredient_id")
);

-- CreateTable
CREATE TABLE "ProductIngredient" (
    "product_ingredient_id" SERIAL NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "product_id" INTEGER NOT NULL,
    "ingredient_id" INTEGER NOT NULL,

    CONSTRAINT "ProductIngredient_pkey" PRIMARY KEY ("product_ingredient_id")
);

-- CreateTable
CREATE TABLE "ProductPresentation" (
    "product_presentation_id" SERIAL NOT NULL,
    "product_id" INTEGER NOT NULL,
    "presentation_id" INTEGER NOT NULL,

    CONSTRAINT "ProductPresentation_pkey" PRIMARY KEY ("product_presentation_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductStock" ADD CONSTRAINT "ProductStock_presentation_id_fkey" FOREIGN KEY ("presentation_id") REFERENCES "Presentation"("presentation_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutgoingProducts" ADD CONSTRAINT "OutgoingProducts_product_stock_id_fkey" FOREIGN KEY ("product_stock_id") REFERENCES "ProductStock"("product_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientStock" ADD CONSTRAINT "IngredientStock_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OutgoingIngredient" ADD CONSTRAINT "OutgoingIngredient_ingredient_stock_id_fkey" FOREIGN KEY ("ingredient_stock_id") REFERENCES "IngredientStock"("ingredient_stock_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductIngredient" ADD CONSTRAINT "ProductIngredient_ingredient_id_fkey" FOREIGN KEY ("ingredient_id") REFERENCES "Ingredient"("ingredient_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPresentation" ADD CONSTRAINT "ProductPresentation_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "Product"("product_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductPresentation" ADD CONSTRAINT "ProductPresentation_presentation_id_fkey" FOREIGN KEY ("presentation_id") REFERENCES "Presentation"("presentation_id") ON DELETE RESTRICT ON UPDATE CASCADE;
