import express, {Application} from "express";

import ingredientsRouter from "./ingredients.routes";
import productRouter from "./product.routes";

function routerApi(app: Application) {
  const router = express.Router();
  app.use("/api/v1", router);
  router.use("/ingredients", ingredientsRouter);
  router.use("/products", productRouter);
}

export default routerApi;
