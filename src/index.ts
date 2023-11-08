import express from "express";

import dotenv from "dotenv";
import cors from "cors";
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

// const whitelist = ["http://localhost:5173"];

// const options = {
//   origin: (
//     origin: string | undefined,
//     callback: (err: Error | null, allow?: boolean) => void
//   ) => {
//     if (whitelist.includes(origin || "")) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
// };

app.use(cors());

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
