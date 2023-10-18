import boom from "@hapi/boom";
import Joi from "joi";
import { Request, Response, NextFunction } from "express";

type Property = "body" | "query" | "params" | "headers" | "cookies";

function validatorHandler<T>(schema: Joi.Schema<T>, property: Property) {
  return (req: Request, res: Response, next: NextFunction) => {
    const data = req[property];
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
      next(boom.badRequest(error));
    }
    next();
  };
}

export default validatorHandler;
