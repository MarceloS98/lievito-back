import { Router } from "express";
import {
  createIngredientStockMovement,
  getIngredientStockMovements,
  getIngredientStockMovement,
  updateIngredientStockMovement,
  deleteIngredientStockMovement,
} from "../services/ingredientStockMovement.services";
import validatorHandler from "../middlewares/validationHandler";
import {
  createIngredientStockMovementSchema,
  deleteIngredientStockMovementSchema,
  getIngredientStockMovementSchema,
  updateIngredientStockMovementSchema,
} from "../schemas/ingredientStockMovement.schema";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const stockMovement = await getIngredientStockMovements();
    res.json(stockMovement);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:movement_id",
  validatorHandler(getIngredientStockMovementSchema, "params"),
  async (req, res, next) => {
    try {
      const stockMovement = await getIngredientStockMovement(
        Number(req.params.movement_id)
      );

      if (!stockMovement) {
        return res.status(404).json({
          message: "Record not found",
        });
      }

      res.json(stockMovement);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createIngredientStockMovementSchema, "body"),
  async (req, res, next) => {
    try {
      const stockMovement = await createIngredientStockMovement(req.body);
      res.json(stockMovement);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:movement_id",
  validatorHandler(getIngredientStockMovementSchema, "params"),
  validatorHandler(updateIngredientStockMovementSchema, "body"),
  async (req, res, next) => {
    try {
      const stockMovement = await updateIngredientStockMovement(
        Number(req.params.movement_id),
        req.body
      );
      res.json(stockMovement);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:movement_id",
  validatorHandler(deleteIngredientStockMovementSchema, "params"),
  async (req, res, next) => {
    try {
      const stockMovement = await deleteIngredientStockMovement(
        Number(req.params.movement_id)
      );
      res.json(stockMovement);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
