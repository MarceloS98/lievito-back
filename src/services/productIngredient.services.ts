import prisma from "../db/config/prisma.config";
import { ProductIngredient, ProductIngredientPayload } from "../types";

export const getProductIngredients = async () => {
  const productIngredients = await prisma.productIngredient.findMany({
    include: {
      ingredient: {
        select: {
          ingredient_id: true,
          name: true,
          price_kg: true,
        },
      },
    },
  });
  return productIngredients;
};

export const getProductIngredient = async (product_ingredient_id: number) => {
  const productIngredient = await prisma.productIngredient.findUnique({
    where: {
      product_ingredient_id: product_ingredient_id,
    },
  });
  return productIngredient;
};

export const getProductIngredientsByProductId = async (product_id: number) => {
  const productIngredients = await prisma.productIngredient.findMany({
    where: {
      product_id: product_id,
    },
    select: {
      product_ingredient_id: true,
      product_id: true,
      ingredient: {
        select: {
          ingredient_id: true,
          name: true,
          price_kg: true,
        },
      },
      quantity: true,
    },
  });
  return productIngredients;
};

export const createManyProductIngredients = async (
  productIngredients: ProductIngredient[]
) => {
  const newProductIngredients = await prisma.productIngredient.createMany({
    data: productIngredients,
  });
  return newProductIngredients;
};

export const updateProductIngredient = async (
  product_ingredient_id: number,
  payload: ProductIngredientPayload
) => {
  const updatedProductIngredient = await prisma.productIngredient.update({
    where: {
      product_ingredient_id: product_ingredient_id,
    },
    data: {
      ...payload,
    },
  });
  return updatedProductIngredient;
};

export const deleteProductIngredient = async (
  product_ingredient_id: number
) => {
  const deletedProductIngredient = await prisma.productIngredient.delete({
    where: {
      product_ingredient_id: product_ingredient_id,
    },
  });
  return deletedProductIngredient;
};

export const deleteManyProductIngredients = async (
  product_ingredient_ids: number[]
) => {
  const deletedProductIngredients = await prisma.productIngredient.deleteMany({
    where: {
      product_ingredient_id: {
        in: product_ingredient_ids,
      },
    },
  });
  return deletedProductIngredients;
};
