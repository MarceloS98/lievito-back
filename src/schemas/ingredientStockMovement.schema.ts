import Joi from "joi";

const movement_id = Joi.number().integer();
const ingredient_stock_id = Joi.number().integer();
const movement_date = Joi.date();
const movement_type = Joi.string();
const quantity = Joi.number();
const concept = Joi.string().max(255);

const getIngredientStockMovementSchema = Joi.object({
  movement_id: movement_id.required(),
});

const createIngredientStockMovementSchema = Joi.object({
  ingredient_stock_id: ingredient_stock_id.required(),
  movement_date: movement_date.required(),
  movement_type: movement_type.required(),
  quantity: quantity.required(),
  concept: concept,
});

const updateIngredientStockMovementSchema = Joi.object({
  ingredient_stock_id,
  movement_date,
  quantity,
  concept,
});

const deleteIngredientStockMovementSchema = Joi.object({
  movement_id: movement_id.required(),
});

export {
  getIngredientStockMovementSchema,
  createIngredientStockMovementSchema,
  updateIngredientStockMovementSchema,
  deleteIngredientStockMovementSchema,
};
