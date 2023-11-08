import { Router } from "express";
import {
  createProductStockMovement,
  getProductStockMovements,
  getProductStockMovement,
} from "../services/productStockMovement.services";
import validatorHandler from "../middlewares/validationHandler";
import {
  createProductStockMovementSchema,
  getProductStockMovementSchema,
} from "../schemas/productStockMovement.schema";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const stockMovement = await getProductStockMovements();
    res.json(stockMovement);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:movement_id",
  validatorHandler(getProductStockMovementSchema, "params"),
  async (req, res, next) => {
    try {
      const stockMovement = await getProductStockMovement(
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
  validatorHandler(createProductStockMovementSchema, "body"),
  async (req, res, next) => {
    try {
      const stockMovement = await createProductStockMovement(req.body);
      res.json(stockMovement);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
