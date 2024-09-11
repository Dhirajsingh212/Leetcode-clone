import dotenv from "dotenv";
import { handleCode, handleJavaCode } from "./utils/code";
import { redisClient } from "./utils/redis";
import { cleanProblemData } from "./utils/functions";

// Define the types for your response data and code response
interface ProblemData {
  problemId: string;
  userId: string;
  code: string;
  language: string;
  testcase: any; // Adjust type as needed
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
      // GET DATA FROM THE QUEUE
      const response = await redisClient.brpop("problems", 0);
      const parsedResponseData: ProblemData | null = response
        ? JSON.parse(response[1] || "")
        : null;

      if (parsedResponseData) {
        const { problemId, userId, code, language, testcase } =
          parsedResponseData;

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
