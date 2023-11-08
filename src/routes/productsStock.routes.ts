import { Router } from "express";
import {
  createProductStock,
  deleteProductStock,
  getProductStock,
  getProductStockById,
  updateProductStock,
} from "../services/productStock.services";
import validatorHandler from "../middlewares/validationHandler";
import {
  createProductStockSchema,
  deleteProductStockSchema,
  getProductStockSchema,
  updateProductStockSchema,
} from "../schemas/productStock.schema";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { page, all } = req.query;
    const { productStock, totalPages } = await getProductStock({
      page: Number(page),
      all: Boolean(all),
    });
    res.json({ productStock, totalPages });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:product_stock_id",
  validatorHandler(getProductStockSchema, "params"),
  async (req, res, next) => {
    try {
      const productStock = await getProductStockById(
        Number(req.params.product_stock_id)
      );

      if (!productStock) {
        return res.status(404).json({
          message: "Stock not found",
        });
      }

      res.json(productStock);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createProductStockSchema, "body"),
  async (req, res, next) => {
    try {
      const newProductStock = await createProductStock(req.body);
      res.json(newProductStock);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:product_stock_id",
  validatorHandler(getProductStockSchema, "params"),
  validatorHandler(updateProductStockSchema, "body"),
  async (req, res, next) => {
    try {
      const productStockUpdated = await updateProductStock(
        Number(req.params.product_stock_id),
        req.body
      );
      res.json(productStockUpdated);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:product_stock_id",
  validatorHandler(deleteProductStockSchema, "params"),
  async (req, res, next) => {
    try {
      const productStockDeleted = await deleteProductStock(
        Number(req.params.product_stock_id)
      );
      res.json(productStockDeleted);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
