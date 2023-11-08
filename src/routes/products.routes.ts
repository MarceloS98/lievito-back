import { Router } from "express";
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../services/product.services";
import {
  createProductSchema,
  getProductSchema,
  deleteProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";
import validatorHandler from "../middlewares/validationHandler";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { page } = req.query;
    const { products, totalPages } = await getProducts(Number(page));
    res.json({ products, totalPages });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:product_id",
  validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
    try {
      const product = await getProduct(Number(req.params.product_id));

      if (!product) {
        return res.status(404).json({
          message: "Product not found",
        });
      }

      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createProductSchema, "body"),
  async (req, res, next) => {
    try {
      const newProduct = await createProduct(req.body);
      res.json(newProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:product_id",
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedProduct = await updateProduct(
        Number(req.params.product_id),
        req.body
      );
      res.json(updatedProduct);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:product_id",
  validatorHandler(deleteProductSchema, "params"),
  async (req, res, next) => {
    try {
      const deletedProduct = await deleteProduct(Number(req.params.product_id));
      res.json(deletedProduct);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
