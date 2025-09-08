import express from "express";
import { configDotenv } from "dotenv";
import axios from "axios";
import querystring from "querystring";
import cookieParser from "cookie-parser";
import indexRouter from "./routes/router.js"

const app = express();
const port = 9090;

configDotenv();
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use("/", indexRouter)

app.listen(port, () => {
  console.log(`${port}에서 듣고 있습니다.`);
});
