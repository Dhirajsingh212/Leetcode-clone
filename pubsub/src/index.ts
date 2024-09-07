import express from "express";
import http, { IncomingMessage } from "http";
import { WebSocket, WebSocketServer } from "ws";
import { redisClient } from "./utils/redis";
import dotenv from "dotenv";
import { createClient } from "redis";

dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Working fine from pubsub");
});

const server = http.createServer(app);
const wss = new WebSocketServer({ noServer: true });

const redisSubscriber = createClient({
  url: process.env.REDIS_URL || "",
});

wss.on(
  "connection",
  function connection(ws: WebSocket, request: IncomingMessage) {
    ws.on("error", console.error);

    redisSubscriber.subscribe("problem_done", (message) => {
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
    redisSubscriber.on("connect", () => {
      console.log("redis subscriber connected successfully");
    });

    redisSubscriber.on("error", (err) => {
      console.error("Redis subscription error:", err);
    });

    await redisSubscriber.connect();

    server.listen(8080, function () {
      console.log(`Listening on 8080`);
    });
  } catch (err) {
    console.log(err);
  }
}

startServer();
