import axios from "axios";
import { redisClient } from "../utils/redis";

interface LanguageMap {
  [language: string]: number;
}

const languageMap: LanguageMap = {
  cpp: 54,
  java: 62,
  python: 71,
  javascript: 97,
};

function cleanInput(input: string): string {
  return input.trim();
}

export async function SubmitFunction(req: any, res: any) {
  try {
    const { problemId, userId, code, language, testcase } = req.body;
    const cleanTestCaseInput = cleanInput(testcase.input);
    const cleanTestCaseOutput = cleanInput(testcase.output);

    const codeSubmissionBody = {
      language_id: languageMap[language],
      source_code: code,
      cpu_time_limit: 2,
      cpu_extra_time: 1,
      wall_time_limit: 5,
      memory_limit: 128000,
      stack_limit: 64000,
      stdin: `${cleanTestCaseInput}`,
      expected_output: cleanTestCaseOutput,
      redirect_stderr_to_stdout: true,
    };

    const response = await axios.post(
      process.env.JUDGE0_URL || "",
      codeSubmissionBody,
      {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${process.env.JUDGE0_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    await redisClient.lpush(
      "problems",
      JSON.stringify({
        problemId,
        userId,
        token: response.data.token,
        count: 1,
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
}
