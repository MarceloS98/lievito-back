import prisma from "../db/config/prisma.config";
import { IngredientStock } from "../types";

export const getIngredientStock = async (page: number, limit = 5) => {
  const count = await prisma.ingredientStock.count({
    where: {
      is_deleted: false,
    },
  });

  const ingredientStock = await prisma.ingredientStock.findMany({
    where: {
      is_deleted: false,
    },
    orderBy: {
      updated_at: "desc",
    },
    select: {
      ingredient_stock_id: true,
      ingredient: {
        select: {
          ingredient_id: true,
          name: true,
          description: true,
          price_kg: true,
        },
      },
      quantity_kg: true,
      expiration_date: true,
      created_at: true,
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalPages = Math.ceil(count / limit);

  return { ingredientStock, totalPages };
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
    throw new Error("Stock not found");
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
