import prisma from "../db/config/prisma.config";
import { ProductStockMovement, ProductStockMovementPayload } from "../types";

export const getProductStockMovements = async () => {
  const stockMovements = await prisma.productStockMovement.findMany({
    include: {
      product_stock: {
        include: {
          product: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });
  return stockMovements;
};

export const getProductStockMovement = async (movement_id: number) => {
  const stockMovement = await prisma.productStockMovement.findUnique({
    where: {
      movement_id: movement_id,
    },
    include: {
      product_stock: {
        include: {
          product: {
            select: {
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!stockMovement) {
    throw new Error("Movement register not found");
  }

  return stockMovement;
};

export const createProductStockMovement = async (
  stockMovement: ProductStockMovementPayload
) => {
  await prisma.$transaction(async (tx) => {
    const newOutgoingProduct = await tx.productStockMovement.create({
      data: {
        ...stockMovement,
      },
    });

    const productStock = await tx.productStock.findUnique({
      where: {
        product_stock_id: stockMovement.product_stock_id,
      },
    });

    if (!productStock) {
      throw new Error("Product stock not found");
    }

    const newQuantity =
      stockMovement.movement_type === "entrada"
        ? productStock.quantity + stockMovement.quantity
        : productStock.quantity - stockMovement.quantity;

    const updatedProductStock = await tx.productStock.update({
      where: {
        product_stock_id: stockMovement.product_stock_id,
      },
      data: {
        quantity: newQuantity,
      },
    });

    if (updatedProductStock.quantity < 0) {
      throw new Error("Not enough stock");
    }

    return newOutgoingProduct;
  });
};
