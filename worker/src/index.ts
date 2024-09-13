import axios from "axios";
import dotenv from "dotenv";
import { redisClient } from "./utils/redis";

interface ProblemData {
  problemId: string;
  userId: string;
  token: string;
  count: number;
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
        const { problemId, userId, token, count } = parsedResponseData;

        try {
          console.log(`Code submitted by ${userId}`);

          const url = `${process.env.JUDGE0_URL}/${token}` || "";

          const response = await axios.get(url, {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${process.env.JUDGE0_API_KEY}`,
            },
          });

          if (count < 5 && response.data.status.description === "Processing") {
            redisClient.lpush(
              "problems",
              JSON.stringify({
                ...parsedResponseData,
                count: count + 1,
              })
            );
          } else {
            console.log(response.data);
            await redisClient.publish(
              "problem_done",
              JSON.stringify({
                problemId: problemId,
                status: response.data.status.description,
                success:
                  response.data.status.description === "Accepted" || false,
                error: response.data.status.description === "Accepted" || true,
                userId: userId,
                compile_output: response.data.compile_output,
              })
            );
          }
        } catch (err: any) {
          await redisClient.publish(
            "problem_done",
            JSON.stringify({
              problemId: problemId,
              status: "Compilation error",
              success: false,
              error: true,
              userId: userId,
              compile_output: "",
            })
          );
        }
      }
    } catch (err: any) {
      console.error("An error occurred:", err.response.data.error);
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
}

main();
