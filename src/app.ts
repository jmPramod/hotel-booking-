import express from "express";
import cors from "cors";
import morgan from "morgan";
import { authRoute } from "./routes/auth.routes";
import { connectDataBase } from "./config/db.connect";
import dotenv from "dotenv";
import { ErrorHandelingMiddlewear } from "./middlewear/global.middlewear";

import swaggerUI from "swagger-ui-express";

import * as swaggerDocument from "../src/config/swagger.json";
dotenv.config();
const app = express();
const runServer = () => {
  //!middlewear

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use(cors({ origin: "*", credentials: true }));
  app.use("/", authRoute);
  app.use(ErrorHandelingMiddlewear);
  connectDataBase();
  0;
};

export { runServer, app };
