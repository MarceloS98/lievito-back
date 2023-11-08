import Joi from "joi";

const movement_id = Joi.number().integer();
const product_stock_id = Joi.number().integer();
const movement_date = Joi.date();
const movement_type = Joi.string();
const quantity = Joi.number();
const concept = Joi.string().max(255);

const getProductStockMovementSchema = Joi.object({
  movement_id: movement_id.required(),
});

const createProductStockMovementSchema = Joi.object({
  product_stock_id: product_stock_id.required(),
  movement_date: movement_date.required(),
  movement_type: movement_type.required(),
  quantity: quantity.required(),
  concept: concept,
});

export { getProductStockMovementSchema, createProductStockMovementSchema };
