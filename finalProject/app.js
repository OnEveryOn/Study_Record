import express from "express";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import authRouter  from './routes/auth.js';
import indexRouter from './routes/index.js';
import orderRouter from './routes/order.js';
import chatRouter from "./routes/chat.js"
import { configDotenv } from "dotenv";
import {createServer} from "http";
import { Server } from "socket.io";

configDotenv();

const app = express();

/* 
 * Server Arch
 * httpServer 위에 websocket과 expressServer를 올린 구조
 * 현재 express server가 브라우저에 서빙하고 있기 때문에 cors 설정을 하지 않아도 됨
*/
const httpServer = createServer(app)
const io = new Server(httpServer)

configDotenv();

const PORT = process.env.PORT
app.use(bodyParser.urlencoded({ extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");


app.use("/auth", authRouter)
app.use("/sale", orderRouter)
app.use("/feat", chatRouter(io))
app.use("/", indexRouter)

httpServer.listen(PORT, () => {
  console.log("http://localhost:"+ `${PORT} 에서 듣고 있습니다.`);
});
