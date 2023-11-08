import Joi from "joi";

const product_ingredient_id = Joi.number().integer();
const product_id = Joi.number().integer();
const ingredient_id = Joi.number().integer();
const quantity = Joi.number();

const getProductIngredientSchema = Joi.object({
  product_ingredient_id: product_ingredient_id.required(),
});

const getProductIngredientsByProductIdSchema = Joi.object({
  product_id: product_id.required(),
});

const createProductIngredientSchema = Joi.object({
  product_id: product_id.required(),
  ingredient_id: ingredient_id.required(),
  quantity: quantity.required(),
});

const createManyProductIngredientSchema = Joi.object({
  data: Joi.array()
    .items(
      Joi.object({
        product_id: product_id.required(),
        ingredient_id: ingredient_id.required(),
        quantity: quantity.required(),
      })
    )
    .required(),
});

const updateProductIngredientSchema = Joi.object({
  product_id,
  ingredient_id,
  quantity,
});

const deleteProductIngredientSchema = Joi.object({
  product_ingredient_id: product_ingredient_id.required(),
});

const deleteManyProductIngredientSchema = Joi.object({
  data: Joi.array().items(Joi.number().integer().required()).required(),
});

export {
  getProductIngredientSchema,
  getProductIngredientsByProductIdSchema,
  createProductIngredientSchema,
  createManyProductIngredientSchema,
  updateProductIngredientSchema,
  deleteProductIngredientSchema,
  deleteManyProductIngredientSchema,
};
