import express, { Application } from "express";

import ingredientsRouter from "./ingredients.routes";
import ingredientsStockRouter from "./ingredientsStock.routes";
import outgoingIngredientRouter from "./outgoingIngredient.routes";

function routerApi(app: Application) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/ingredients", ingredientsRouter);
  router.use("/ingredientsStock", ingredientsStockRouter);
  router.use("/outgoingIngredient", outgoingIngredientRouter);
}

export default routerApi;
