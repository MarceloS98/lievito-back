import prisma from "../db/config/prisma.config";
import { Ingredient, IngredientPayload } from "../types";

export const getIngredients = async ({ page = 1, limit = 5, all = false }) => {
  const count = await prisma.ingredient.count({
    where: {
      is_deleted: false,
    },
  });

  let ingredients;

  if (all) {
    ingredients = await prisma.ingredient.findMany({
      where: {
        is_deleted: false,
      },
      orderBy: {
        updated_at: "desc",
      },
      select: {
        ingredient_id: true,
        name: true,
        description: true,
        price_kg: true,
      },
    });
  } else {
    ingredients = await prisma.ingredient.findMany({
      where: {
        is_deleted: false,
      },
      orderBy: {
        updated_at: "desc",
      },
      select: {
        ingredient_id: true,
        name: true,
        description: true,
        price_kg: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  const totalPages = Math.ceil(count / limit);

  return {
    ingredients,
    totalPages,
  };
};

export const getIngredient = async (ingredient_id: number) => {
  const ingredient = await prisma.ingredient.findUnique({
    where: {
      ingredient_id: ingredient_id,
    },
  });
  return ingredient;
};

export const createIngredient = async (ingredient: Ingredient) => {
  const newIngredient = await prisma.ingredient.create({
    data: {
      ...ingredient,
    },
  });
  return newIngredient;
};

export const updateIngredient = async (
  ingredient_id: number,
  payload: IngredientPayload
) => {
  const updatedIngredient = await prisma.ingredient.update({
    where: {
      ingredient_id: ingredient_id,
    },
    data: {
      ...payload,
    },
  });
  return updatedIngredient;
};

export const deleteIngredient = async (ingredient_id: number) => {
  await prisma.$transaction(async (tx) => {
    const deletedIngredient = await tx.ingredient.update({
      where: {
        ingredient_id: ingredient_id,
      },
      data: {
        is_deleted: true,
      },
    });

    await tx.ingredientStock.updateMany({
      where: {
        ingredient_id: ingredient_id,
      },
      data: {
        quantity_kg: 0,
        is_deleted: true,
      },
    });

    return deletedIngredient;
  });
};
