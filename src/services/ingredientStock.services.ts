import prisma from "../db/config/prisma.config";
import { IngredientStock } from "../types";

export const getIngredientStock = async () => {
  const ingredientStock = await prisma.ingredientStock.findMany({
    include: {
      ingredient: true,
    },
  });
  return ingredientStock;
};

export const getIngredientStockById = async (ingredient_stock_id: number) => {
  const ingredientStock = await prisma.ingredientStock.findUnique({
    where: {
      ingredient_stock_id: ingredient_stock_id,
    },
    include: {
      ingredient: true,
    },
  });

  if (!ingredientStock) {
    throw new Error("Ingredient Stock not found");
  }

  return ingredientStock;
};

export const createIngredientStock = async (
  ingredientStock: IngredientStock
) => {
  const newIngredientStock = await prisma.ingredientStock.create({
    data: {
      ...ingredientStock,
    },
    include: {
      ingredient: true,
    },
  });
  return newIngredientStock;
};

export const updateIngredientStock = async (
  ingredient_stock_id: number,
  payload: IngredientStock
) => {
  const updatedIngredientStock = await prisma.ingredientStock.update({
    where: {
      ingredient_stock_id: ingredient_stock_id,
    },
    include: {
      ingredient: true,
    },
    data: {
      ...payload,
    },
  });
  return updatedIngredientStock;
};

export const deleteIngredientStock = async (ingredient_stock_id: number) => {
  const deletedIngredientStock = await prisma.ingredientStock.delete({
    where: {
      ingredient_stock_id: ingredient_stock_id,
    },
    include: {
      ingredient: true,
    },
  });
  return deletedIngredientStock;
};
