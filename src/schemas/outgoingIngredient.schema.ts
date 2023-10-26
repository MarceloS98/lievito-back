import Joi from "joi";

const outgoing_ingredient_id = Joi.number().integer();
const ingredient_stock_id = Joi.number().integer();
const outgoing_date = Joi.date();
const quantity = Joi.number();
const concept = Joi.string().max(255);

const getOutGoingIngredientSchema = Joi.object({
  outgoing_ingredient_id: outgoing_ingredient_id.required(),
});

const createOutGoingIngredientSchema = Joi.object({
  ingredient_stock_id: ingredient_stock_id.required(),
  outgoing_date: outgoing_date.required(),
  quantity: quantity.required(),
  concept: concept.required(),
});

const updateOutGoingIngredientSchema = Joi.object({
  ingredient_stock_id,
  outgoing_date,
  quantity,
  concept,
});

const deleteOutGoingIngredientSchema = Joi.object({
  outgoing_ingredient_id: outgoing_ingredient_id.required(),
});

export {
  getOutGoingIngredientSchema,
  createOutGoingIngredientSchema,
  updateOutGoingIngredientSchema,
  deleteOutGoingIngredientSchema,
};
