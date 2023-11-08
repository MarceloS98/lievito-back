import prisma from "../db/config/prisma.config";
import { ProductStock } from "../types";

export const getProductStock = async ({ page = 1, limit = 5, all = false }) => {
  const count = await prisma.productStock.count({
    where: {
      is_deleted: false,
    },
  });

  let productStock;

  if (all) {
    productStock = await prisma.productStock.findMany({
      where: {
        is_deleted: false,
      },
      orderBy: {
        updated_at: "desc",
      },
      select: {
        product_stock_id: true,
        product: {
          select: {
            product_id: true,
            name: true,
            description: true,
            price: true,
          },
        },
        quantity: true,
        expiration_date: true,
        created_at: true,
      },
    });
  } else {
    productStock = await prisma.productStock.findMany({
      where: {
        is_deleted: false,
      },
      orderBy: {
        updated_at: "desc",
      },
      select: {
        product_stock_id: true,
        product: {
          select: {
            product_id: true,
            name: true,
            description: true,
            price: true,
          },
        },
        quantity: true,
        expiration_date: true,
        created_at: true,
      },
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  const totalPages = Math.ceil(count / limit);

  return { productStock, totalPages };
};

export const getProductStockById = async (product_stock_id: number) => {
  const productStock = await prisma.productStock.findUnique({
    where: {
      product_stock_id: product_stock_id,
    },
    include: {
      product: true,
    },
  });

  if (!productStock) {
    throw new Error("Stock not found");
  }

  return productStock;
};

export const createProductStock = async (productStock: ProductStock) => {
  const productStockCreated = await prisma.productStock.create({
    data: {
      ...productStock,
    },
  });

  return productStockCreated;
};

export const updateProductStock = async (
  product_stock_id: number,
  productStock: ProductStock
) => {
  const productStockUpdated = await prisma.productStock.update({
    where: {
      product_stock_id: product_stock_id,
    },
    data: {
      ...productStock,
    },
  });

  return productStockUpdated;
};

export const deleteProductStock = async (product_stock_id: number) => {
  const productStockDeleted = await prisma.productStock.update({
    where: {
      product_stock_id: product_stock_id,
    },
    data: {
      is_deleted: true,
    },
  });

  return productStockDeleted;
};
