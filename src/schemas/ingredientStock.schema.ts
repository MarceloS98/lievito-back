import Joi from "joi";

const ingredient_stock_id = Joi.number().integer();
const ingredient_id = Joi.number().integer();
const quantity_kg = Joi.number();
const expiration_date = Joi.date();

const getIngredientStockSchema = Joi.object({
  ingredient_stock_id: ingredient_stock_id.required(),
});

const createIngredientStockSchema = Joi.object({
  ingredient_id: ingredient_id.required(),
  quantity_kg: quantity_kg.required(),
  expiration_date: expiration_date,
});

const updateIngredientStockSchema = Joi.object({
  ingredient_id,
  quantity_kg,
  expiration_date,
});

const deleteIngredientStockSchema = Joi.object({
  ingredient_stock_id: ingredient_stock_id.required(),
});

export {
  getIngredientStockSchema,
  createIngredientStockSchema,
  updateIngredientStockSchema,
  deleteIngredientStockSchema,
};
