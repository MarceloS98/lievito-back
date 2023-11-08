import express, { Application } from "express";

import ingredientsRouter from "./ingredients.routes";
import ingredientsStockRouter from "./ingredientsStock.routes";
import ingredientsStockMovementsRouter from "./ingredientsStockMovements.routes";

import presentationRouter from "./presentations.routes";
import productsRouter from "./products.routes";
import productsStockRouter from "./productsStock.routes";
import productIngredientsRouter from "./productIngredients.routes";
import productStockMovementsRouter from "./productStockMovements.routes";

function routerApi(app: Application) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/ingredients", ingredientsRouter);
  router.use("/ingredientsStock", ingredientsStockRouter);
  router.use("/ingredientsStockMovements", ingredientsStockMovementsRouter);

  router.use("/products", productsRouter);
  router.use("/presentation", presentationRouter);
  router.use("/productsStock", productsStockRouter);
  router.use("/productIngredients", productIngredientsRouter);
  router.use("/productStockMovements", productStockMovementsRouter);
}

export default routerApi;
