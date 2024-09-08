import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import http, { IncomingMessage } from "http";
import morgan from "morgan";
import { createClient } from "redis";
import { WebSocket, WebSocketServer } from "ws";
import authRoutes from "./routes/auth";
import codeRoutes from "./routes/code";

const redisClient = createClient({
  url: process.env.REDIS_URL || "",
});

const app = express();

dotenv.config();

app.use(
  cors({
    origin: process.env.ORIGIN,
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.send("Work fine");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/code", codeRoutes);

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

wss.on(
  "connection",
  function connection(ws: WebSocket, request: IncomingMessage) {
    ws.on("error", console.error);

    redisClient.subscribe("problem_done", (message) => {
      console.log("THIS IS MESSAGE: " + message);

      wss.clients.forEach((client: WebSocket) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify({ message }));
        }
      });
    });

    ws.send("connected through websocket");
  }
);

server.on("upgrade", (request: IncomingMessage, socket: any, head: Buffer) => {
  wss.handleUpgrade(request, socket, head, (ws: WebSocket) => {
    wss.emit("connection", ws, request);
  });
});

async function startServer() {
  try {
    redisClient.connect();
    console.log("redis connected.");

    server.listen(8000, function () {
      console.log(`Listening on 8000`);
    });
  } catch (err) {
    console.log("Failed to start server");
  }
}

startServer();
