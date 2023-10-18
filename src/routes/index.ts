import express, { Application } from "express";

import ingredientsRouter from "./ingredients.routes";

function routerApi(app: Application) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/ingredients", ingredientsRouter);
}

export default routerApi;
