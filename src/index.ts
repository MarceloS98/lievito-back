import express from "express";

import dotenv from "dotenv";
import routerApi from "./routes/index";

import {
  ormErrorHandler,
  boomErrorHandler,
  errorHandler,
  logErrors,
} from "./middlewares/errorHandler";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to Express & TypeScript Server");
});

routerApi(app);

app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
