import prisma from "../db/config/prisma.config";
import {Product} from "../types";

export const getProducts = async () => {
  try {
    const products = await prisma.product.findMany();
    return products;
  } catch (error) {
    console.error(error);
  }
};

export const getProductById = async (product_id: number) => {
  try {
    const product = await prisma.product.findUnique({
      where: {
        product_id: product_id,
      },
    });
    return product;
  } catch (error) {
    console.error(error);
  }
};

export const createProduct = async (product: Product) => {
  try {
    const newProduct = await prisma.product.create({
      data: {
        ...product,
      },
    });
    return newProduct;
  } catch (error) {
    console.error(error);
  }
};

export const updateProduct = async (product_id: number, product: Product) => {
  try {
    const updatedProduct = await prisma.product.update({
      where: {
        product_id: product_id,
      },
      data: {
        ...product,
      },
    });
    return updatedProduct;
  } catch (error) {
    console.error(error);
  }
};

export const deleteProduct = async (product_id: number) => {
  try {
    const deletedProduct = await prisma.product.delete({
      where: {
        product_id: product_id,
      },
    });
    return deletedProduct;
  } catch (error) {
    console.error(error);
  }
};
