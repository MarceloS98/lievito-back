import Joi from "joi";

const ingredient_id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const description = Joi.string().min(3).max(255);
const price_kg = Joi.number().integer();

const getIngredientSchema = Joi.object({
  ingredient_id: ingredient_id.required(),
});

const createIngredientSchema = Joi.object({
  name: name.required(),
  description,
  price_kg: price_kg.required(),
});

const updateIngredientSchema = Joi.object({
  name,
  description,
  price_kg,
});

const deleteIngredientSchema = Joi.object({
  ingredient_id: ingredient_id.required(),
});

export {
  getIngredientSchema,
  createIngredientSchema,
  updateIngredientSchema,
  deleteIngredientSchema,
};
