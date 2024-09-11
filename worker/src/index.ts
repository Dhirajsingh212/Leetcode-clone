import dotenv from "dotenv";
import { handleCode, handleJavaCode } from "./utils/code";
import { redisClient } from "./utils/redis";
import { cleanProblemData } from "./utils/functions";

interface ProblemData {
  problemId: string;
  userId: string;
  code: string;
  language: string;
  testcase: any;
}

interface CodeResponse {
  success?: boolean;
  error?: boolean;
  output?: string;
}

async function main() {
  dotenv.config();

  redisClient.on("connect", () => {
    console.log("Redis connected successfully");
  });

  while (true) {
    try {
      const response = await redisClient.brpop("problems", 0);
      const parsedResponseData: ProblemData | null = response
        ? JSON.parse(response[1] || "")
        : null;

      if (parsedResponseData) {
        const { problemId, userId, code, language, testcase } =
          parsedResponseData;

        console.log(`Code submitted by ${userId}`);

        const cleanedTestCase = cleanProblemData(testcase);
        let codeResponse: CodeResponse;

        if (language === "java") {
          codeResponse = await handleJavaCode(code, cleanedTestCase);
        } else {
          codeResponse = await handleCode(code, language, cleanedTestCase);
        }

        const status = codeResponse?.output || "Test cases failed";

        await redisClient.publish(
          "problem_done",
          JSON.stringify({
            problemId: problemId,
            status: status,
            success: codeResponse.success,
            error: codeResponse.error || null,
            userId: userId,
          })
        );
      }
    } catch (err) {
      console.error("An error occurred:", err);
    }
  }
}

main();
