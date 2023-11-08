import Joi from "joi";

const presentation_id = Joi.number().integer();
const name = Joi.string().min(3).max(30);
const size_gr = Joi.number().integer();

const getPresentationSchema = Joi.object({
  presentation_id: presentation_id.required(),
});

const createPresentationSchema = Joi.object({
  name: name.required(),
  size_gr: size_gr.required(),
});

const updatePresentationSchema = Joi.object({
  name,
  size_gr,
});

const deletePresentationSchema = Joi.object({
  presentation_id: presentation_id.required(),
});

export {
  getPresentationSchema,
  createPresentationSchema,
  updatePresentationSchema,
  deletePresentationSchema,
};
