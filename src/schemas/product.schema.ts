import Joi from "joi";

const product_id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const description = Joi.string().min(3).max(255);
const price = Joi.number().integer();

const getProductSchema = Joi.object({
  product_id: product_id.required(),
});

const createProductSchema = Joi.object({
  name: name.required(),
  description,
  price: price.required(),
});

const updateProductSchema = Joi.object({
  name,
  description,
  price,
});

const deleteProductSchema = Joi.object({
  product_id: product_id.required(),
});

export {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
};
