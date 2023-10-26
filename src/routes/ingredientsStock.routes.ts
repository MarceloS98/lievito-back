import { Router } from "express";
import {
  createIngredientStock,
  getIngredientStock,
  getIngredientStockById,
  updateIngredientStock,
  deleteIngredientStock,
} from "../services/ingredientStock.services";
import validatorHandler from "../middlewares/validationHandler";
import {
  createIngredientStockSchema,
  deleteIngredientStockSchema,
  getIngredientStockSchema,
  updateIngredientStockSchema,
} from "../schemas/ingredientStock.schema";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const ingredientStock = await getIngredientStock();
    res.json(ingredientStock);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:ingredient_stock_id",
  validatorHandler(getIngredientStockSchema, "params"),
  async (req, res, next) => {
    try {
      const ingredientStock = await getIngredientStockById(
        Number(req.params.ingredient_stock_id)
      );

      if (!ingredientStock) {
        return res.status(404).json({
          message: "Ingredient Stock not found",
        });
      }

      res.json(ingredientStock);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createIngredientStockSchema, "body"),
  async (req, res, next) => {
    try {
      const newIngredientStock = await createIngredientStock(req.body);
      res.json(newIngredientStock);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:ingredient_stock_id",
  validatorHandler(getIngredientStockSchema, "params"),
  validatorHandler(updateIngredientStockSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedIngredientStock = await updateIngredientStock(
        Number(req.params.ingredient_stock_id),
        req.body
      );
      res.json(updatedIngredientStock);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:ingredient_stock_id",
  validatorHandler(deleteIngredientStockSchema, "params"),
  async (req, res, next) => {
    try {
      const deletedIngredientStock = await deleteIngredientStock(
        Number(req.params.ingredient_stock_id)
      );
      res.json(deletedIngredientStock);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
