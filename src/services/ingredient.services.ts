import prisma from "../db/config/prisma.config";

// Get all ingredients
// Create a new ingredient
// Update an ingredient
// Delete an ingredient

export const getAllIngredients = async () => {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return ingredients;
  } catch (error) {
    console.error(error);
  }
};

export const createIngredient = async (ingredient) => {
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

export const updateIngredient = async (ingredient_id, ingredient) => {
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

export const deleteIngredient = async (ingredient_id) => {
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
