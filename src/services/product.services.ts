import prisma from "../db/config/prisma.config";
import { Product, ProductPayload } from "../types";

export const getProducts = async (page: number, limit = 5) => {
  const count = await prisma.product.count({
    where: {
      is_deleted: false,
    },
  });

  const products = await prisma.product.findMany({
    where: {
      is_deleted: false,
    },
    orderBy: {
      updated_at: "desc",
    },
    select: {
      product_id: true,
      name: true,
      description: true,
      price: true,
    },
    take: limit,
    skip: (page - 1) * limit,
  });

  const totalPages = Math.ceil(count / limit);

  return {
    products,
    totalPages,
  };
};

export const getProduct = async (product_id: number) => {
  const product = await prisma.product.findUnique({
    where: {
      product_id: product_id,
    },
  });
  return product;
};

export const createProduct = async (product: Product) => {
  const newProduct = await prisma.product.create({
    data: {
      ...product,
    },
  });
  return newProduct;
};

export const updateProduct = async (
  product_id: number,
  payload: ProductPayload
) => {
  const updatedProduct = await prisma.product.update({
    where: {
      product_id: product_id,
    },
    data: {
      ...payload,
    },
  });
  return updatedProduct;
};

export const deleteProduct = async (product_id: number) => {
  await prisma.$transaction(async (tx) => {
    const deletedProduct = await tx.product.update({
      where: {
        product_id: product_id,
      },
      data: {
        is_deleted: true,
      },
    });

    await tx.productStock.updateMany({
      where: {
        product_id: product_id,
      },
      data: {
        quantity: 0,
        is_deleted: true,
      },
    });

    await tx.productIngredient.deleteMany({
      where: {
        product_id: product_id,
      },
    });

    return deletedProduct;
  });
};
