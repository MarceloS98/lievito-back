import { Router } from "express";
import {
  createIngredient,
  deleteIngredient,
  getIngredients,
  updateIngredient,
} from "../services/ingredient.services";
import validatorHandler from "../middlewares/validationHandler";
import {
  createIngredientSchema,
  getIngredientSchema,
} from "../schemas/ingredient.schema";

const router = Router();

router.get("/", async (req, res) => {
  const ingredients = await getIngredients();
  res.json(ingredients);
});

router.post(
  "/",
  validatorHandler(createIngredientSchema, "body"),
  async (req, res) => {
    const newIngredient = await createIngredient(req.body);
    res.json(newIngredient);
  }
);

router.put("/:ingredient_id", async (req, res) => {
  const updatedIngredient = await updateIngredient(
    Number(req.params.ingredient_id),
    req.body
  );
  res.json(updatedIngredient);
});

router.delete("/:ingredient_id", async (req, res) => {
  const deletedIngredient = await deleteIngredient(
    Number(req.params.ingredient_id)
  );
  res.json(deletedIngredient);
});

export default router;
