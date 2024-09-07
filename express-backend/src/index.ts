import dotenv from "dotenv";
import express from "express";
import { redisClient } from "./utils/redis";
const app = express();

app.use(express.json());

dotenv.config();

app.post("/submit", async (req, res) => {
  try {
    const { problemId, userId, code, language } = req.body;
    await redisClient.lpush(
      "problems",
      JSON.stringify({
        problemId,
        userId,
        code,
        language,
      })
    );
    return res.status(200).json({
      success: true,
      message: "Pushed to queue",
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

async function startServer() {
  try {
    redisClient.on("connect", () => {
      console.log("redis connected successfully");
    });

    app.listen(8000, () => {
      console.log("server is running on port 8000");
    });
  } catch (err) {
    console.log("Failed to start server");
  }
}

startServer();
