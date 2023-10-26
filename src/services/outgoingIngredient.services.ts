import prisma from "../db/config/prisma.config";
import { outgoingIngredient } from "../types";

export const getOutgoingIngredient = async () => {
  const outgoingIngredient = await prisma.outgoingIngredient.findMany({
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
  return outgoingIngredient;
};

export const getOutgoingIngredientById = async (
  outgoing_ingredient_id: number
) => {
  const outgoingIngredient = await prisma.outgoingIngredient.findUnique({
    where: {
      outgoing_ingredient_id: outgoing_ingredient_id,
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

  if (!outgoingIngredient) {
    throw new Error("Outgoing Ingredient not found");
  }

  return outgoingIngredient;
};

export const createOutgoingIngredient = async (
  outgoingIngredient: outgoingIngredient
) => {
  await prisma.$transaction(async (tx) => {
    const newOutgoingIngredient = await tx.outgoingIngredient.create({
      data: { ...outgoingIngredient },
    });

    const { ingredient_stock_id, quantity } = newOutgoingIngredient;

    const updatedIngredientStock = await tx.ingredientStock.update({
      where: { ingredient_stock_id: ingredient_stock_id },
      data: {
        quantity_kg: {
          decrement: quantity,
        },
      },
    });

    if (updatedIngredientStock.quantity_kg < 0) {
      throw new Error("Not enough stock");
    }

    return newOutgoingIngredient;
  });
};

export const updateOutgoingIngredient = async (
  outgoing_ingredient_id: number,
  payload: outgoingIngredient
) => {
  const updatedOutgoingIngredient = await prisma.outgoingIngredient.update({
    where: {
      outgoing_ingredient_id: outgoing_ingredient_id,
    },
    include: {
      ingredient_stock: { include: { ingredient: true } },
    },
    data: {
      ...payload,
    },
  });
  return updatedOutgoingIngredient;
};

export const deleteOutgoingIngredient = async (
  outgoing_ingredient_id: number
) => {
  const deletedOutgoingIngredient = await prisma.outgoingIngredient.delete({
    where: {
      outgoing_ingredient_id: outgoing_ingredient_id,
    },
    include: {
      ingredient_stock: { include: { ingredient: true } },
    },
  });
  return deletedOutgoingIngredient;
};
