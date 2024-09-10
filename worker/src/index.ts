import dotenv from "dotenv";
import { handleCode } from "./utils/code";
import { redisClient } from "./utils/redis";
import { cleanProblemData } from "./utils/functions";

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
        const { problemId, userId, code, language, testcase } =
          parsedResponseData;

        const cleanedTestCase = cleanProblemData(testcase);
        // console.log(cleanedTestCase);
        const codeResponse = await handleCode(code, language, testcase);

        const status = codeResponse.output || "something went wrong";

        const data = await redisClient.publish(
          "problem_done",
          JSON.stringify({
            problemId: problemId,
            status: status,
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
