import Joi from "joi";

const product_stock_id = Joi.number().integer();
const product_id = Joi.number().integer();
const presentation_id = Joi.number().integer();
const quantity = Joi.number();
const expiration_date = Joi.date();

const getProductStockSchema = Joi.object({
  product_stock_id: product_stock_id.required(),
});

const createProductStockSchema = Joi.object({
  product_id: product_id.required(),
  presentation_id: presentation_id.required(),
  quantity: quantity.required(),
  expiration_date: expiration_date,
});

const updateProductStockSchema = Joi.object({
  // product_id,
  // presentation_id,
  // quantity,
  expiration_date,
});

const deleteProductStockSchema = Joi.object({
  product_stock_id: product_stock_id.required(),
});

export {
  getProductStockSchema,
  createProductStockSchema,
  updateProductStockSchema,
  deleteProductStockSchema,
};
