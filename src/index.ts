import dotenv from "dotenv";
import { app, runServer } from "./app";
dotenv.config();
const Port = process.env.PORT;

runServer();

app.listen(Port, () => {
  console.log(`server is running http://localhost:${Port} `);
});
