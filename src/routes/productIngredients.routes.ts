import { Router } from "express";
import {
  // createProductIngredient,
  createManyProductIngredients,
  deleteProductIngredient,
  deleteManyProductIngredients,
  getProductIngredient,
  getProductIngredients,
  updateProductIngredient,
  getProductIngredientsByProductId,
} from "../services/productIngredient.services";
import {
  createProductIngredientSchema,
  createManyProductIngredientSchema,
  getProductIngredientSchema,
  getProductIngredientsByProductIdSchema,
  deleteProductIngredientSchema,
  deleteManyProductIngredientSchema,
  updateProductIngredientSchema,
} from "../schemas/productIngredient.schema";
import validatorHandler from "../middlewares/validationHandler";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const productIngredients = await getProductIngredients();
    res.json(productIngredients);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:product_id",
  validatorHandler(getProductIngredientsByProductIdSchema, "params"),
  async (req, res, next) => {
    try {
      const productIngredients = await getProductIngredientsByProductId(
        Number(req.params.product_id)
      );

      if (!productIngredients) {
        return res.status(404).json({
          message: "Product ingredients not found",
        });
      }

      res.json(productIngredients);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createManyProductIngredientSchema, "body"),
  async (req, res, next) => {
    try {
      const productIngredients = req.body.data;
      const count = await createManyProductIngredients(productIngredients);
      res.json(count);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:product_ingredient_id",
  validatorHandler(getProductIngredientSchema, "params"),
  validatorHandler(updateProductIngredientSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedProductIngredient = await updateProductIngredient(
        Number(req.params.product_ingredient_id),
        req.body
      );

      res.json(updatedProductIngredient);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:product_ingredient_id",
  validatorHandler(deleteProductIngredientSchema, "params"),
  async (req, res, next) => {
    try {
      const deletedProductIngredient = await deleteProductIngredient(
        Number(req.params.product_ingredient_id)
      );

      res.json(deletedProductIngredient);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/",
  validatorHandler(deleteManyProductIngredientSchema, "body"),
  async (req, res, next) => {
    try {
      const productIngredients = req.body.data;
      const count = await deleteManyProductIngredients(productIngredients);
      res.json(count);
    } catch (error) {
      next(error);
    }
  }
);
export default router;
