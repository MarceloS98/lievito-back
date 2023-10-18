import prisma from "../db/config/prisma.config";
import { Ingredient } from "../types";

export const getIngredients = async () => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return ingredients;
  } catch (error) {
    console.error(error);
  }
};

export const createIngredient = async (ingredient: Ingredient) => {
  try {
    const newIngredient = await prisma.ingredient.create({
      data: {
        ...ingredient,
      },
    });
    return newIngredient;
  } catch (error) {
    console.error(error);
  }
};

export const updateIngredient = async (
  ingredient_id: number,
  ingredient: Ingredient
) => {
  try {
    const updatedIngredient = await prisma.ingredient.update({
      where: {
        ingredient_id: ingredient_id,
      },
      data: {
        ...ingredient,
      },
    });
    return updatedIngredient;
  } catch (error) {
    console.error(error);
  }
};

export const deleteIngredient = async (ingredient_id: number) => {
  try {
    const deletedIngredient = await prisma.ingredient.delete({
      where: {
        ingredient_id: ingredient_id,
      },
    });
    return deletedIngredient;
  } catch (error) {
    console.error(error);
  }
};
