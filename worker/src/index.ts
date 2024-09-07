import { redisClient } from "./utils/redis";
import dotenv from "dotenv";

async function main() {
  dotenv.config();
  redisClient.on("connect", () => {
    console.log("redis connected successfully");
  });

  while (1) {
    try {
      const response = await redisClient.brpop("problems", 0);
      const data = await redisClient.publish(
        "problem_done",
        JSON.stringify({ problemId: 1, status: "TLE", userId: 1 })
      );
    } catch (err) {
      console.log(err);
    }
  }
}

main();
