import { Router } from "express";
import {
  createOutgoingIngredient,
  getOutgoingIngredient,
  getOutgoingIngredientById,
  updateOutgoingIngredient,
  deleteOutgoingIngredient,
} from "../services/outgoingIngredient.services";
import validatorHandler from "../middlewares/validationHandler";
import {
  createOutGoingIngredientSchema,
  deleteOutGoingIngredientSchema,
  getOutGoingIngredientSchema,
  updateOutGoingIngredientSchema,
} from "../schemas/outgoingIngredient.schema";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const outgoingIngredient = await getOutgoingIngredient();
    res.json(outgoingIngredient);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:outgoing_ingredient_id",
  validatorHandler(getOutGoingIngredientSchema, "params"),
  async (req, res, next) => {
    try {
      const outgoingIngredient = await getOutgoingIngredientById(
        Number(req.params.outgoing_ingredient_id)
      );

      if (!outgoingIngredient) {
        return res.status(404).json({
          message: "Outgoing Ingredient not found",
        });
      }

      res.json(outgoingIngredient);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createOutGoingIngredientSchema, "body"),
  async (req, res, next) => {
    try {
      const newOutgoingIngredient = await createOutgoingIngredient(req.body);
      res.json(newOutgoingIngredient);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:outgoing_ingredient_id",
  validatorHandler(getOutGoingIngredientSchema, "params"),
  validatorHandler(updateOutGoingIngredientSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedOutgoingIngredient = await updateOutgoingIngredient(
        Number(req.params.outgoing_ingredient_id),
        req.body
      );
      res.json(updatedOutgoingIngredient);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:outgoing_ingredient_id",
  validatorHandler(deleteOutGoingIngredientSchema, "params"),
  async (req, res, next) => {
    try {
      const deletedOutgoingIngredient = await deleteOutgoingIngredient(
        Number(req.params.outgoing_ingredient_id)
      );
      res.json(deletedOutgoingIngredient);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
