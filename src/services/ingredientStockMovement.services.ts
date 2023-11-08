import prisma from "../db/config/prisma.config";
import {
  IngredientStockMovement,
  IngredientStockMovementPayload,
} from "../types";

export const getIngredientStockMovements = async () => {
  const stockMovements = await prisma.ingredientStockMovement.findMany({
    include: {
      ingredient_stock: {
        include: {
          ingredient: {
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

export const getIngredientStockMovement = async (movement_id: number) => {
  const stockMovement = await prisma.ingredientStockMovement.findUnique({
    where: {
      movement_id: movement_id,
    },
    include: {
      ingredient_stock: {
        include: {
          ingredient: {
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

export const createIngredientStockMovement = async (
  stockMovement: IngredientStockMovementPayload
) => {
  await prisma.$transaction(async (tx) => {
    const newOutgoingIngredient = await tx.ingredientStockMovement.create({
      data: {
        ...stockMovement,
      },
    });

    const { ingredient_stock_id, quantity, movement_type } =
      newOutgoingIngredient;

    const updatedIngredientStock = await tx.ingredientStock.update({
      where: { ingredient_stock_id: ingredient_stock_id },
      data: {
        quantity_kg: {
          [movement_type === "entry" ? "increment" : "decrement"]: quantity,
        },
      },
    });

    if (updatedIngredientStock.quantity_kg < 0) {
      throw new Error("Not enough stock");
    }

    return newOutgoingIngredient;
  });
};

export const updateIngredientStockMovement = async (
  movement_id: number,
  payload: IngredientStockMovementPayload
) => {
  const updatedStockMOvement = await prisma.ingredientStockMovement.update({
    where: {
      movement_id: movement_id,
    },
    include: {
      ingredient_stock: { include: { ingredient: true } },
    },
    data: {
      ...payload,
    },
  });
  return updatedStockMOvement;
};

export const deleteIngredientStockMovement = async (movement_id: number) => {
  const deletedStockMovement = await prisma.ingredientStockMovement.delete({
    where: {
      movement_id: movement_id,
    },
    include: {
      ingredient_stock: { include: { ingredient: true } },
    },
  });
  return deletedStockMovement;
};
