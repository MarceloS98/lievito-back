import { Router } from "express";
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  getIngredient,
  updateIngredient,
} from "../services/ingredient.services";
import {
  createIngredientSchema,
  getIngredientSchema,
  deleteIngredientSchema,
  updateIngredientSchema,
} from "../schemas/ingredient.schema";
import validatorHandler from "../middlewares/validationHandler";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const ingredients = await getIngredients();
    res.json(ingredients);
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:ingredient_id",
  validatorHandler(getIngredientSchema, "params"),
  async (req, res, next) => {
    try {
      const ingredient = await getIngredient(Number(req.params.ingredient_id));

      if (!ingredient) {
        return res.status(404).json({
          message: "Ingredient not found",
        });
      }

      res.json(ingredient);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(createIngredientSchema, "body"),
  async (req, res, next) => {
    try {
      const newIngredient = await createIngredient(req.body);
      res.json(newIngredient);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  "/:ingredient_id",
  validatorHandler(getIngredientSchema, "params"),
  validatorHandler(updateIngredientSchema, "body"),
  async (req, res, next) => {
    try {
      const updatedIngredient = await updateIngredient(
        Number(req.params.ingredient_id),
        req.body
      );
      res.json(updatedIngredient);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:ingredient_id",
  validatorHandler(deleteIngredientSchema, "params"),
  async (req, res, next) => {
    try {
      const deletedIngredient = await deleteIngredient(
        Number(req.params.ingredient_id)
      );
      res.json(deletedIngredient);
    } catch (error) {
      next(error);
    }
  }
);

export default router;
