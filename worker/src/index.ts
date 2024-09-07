import dotenv from "dotenv";
import { executeCode } from "./utils";
import { redisClient } from "./utils/redis";

async function main() {
  dotenv.config();
  redisClient.on("connect", () => {
    console.log("redis connected successfully");
  });

  while (1) {
    try {
      //GET DATA FROM THE QUEUE
      const response = await redisClient.brpop("problems", 0);
      const parsedResponseData = JSON.parse(response?.[1] || "");

      if (parsedResponseData) {
        const { problemId, userId, code, language } = parsedResponseData;

        const codeResponse = await executeCode(code, language);

        console.log(codeResponse);

        const data = await redisClient.publish(
          "problem_done",
          JSON.stringify({
            problemId: problemId,
            status: "TLE",
            userId: userId,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  }
}

main();
