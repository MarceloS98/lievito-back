import Joi from "joi";

const id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const description = Joi.string().min(3).max(255);
const price = Joi.number().integer();

const getAllProductsSchema = Joi.object({
  name,
  description,
  price,
});

const getProductSchema = Joi.object({
  product_id: id.required(),
});

const createProductSchema = Joi.object({
  name: name.required(),
  description,
  price: price.required(),
});

const updateProductSchema = Joi.object({
  product_id: id.required(),
  name,
  description,
  price,
});

const deleteProductSchema = Joi.object({
  product_id: id.required(),
});

export {
  getAllProductsSchema,
  getProductSchema,
  createProductSchema,
  updateProductSchema,
  deleteProductSchema,
};
