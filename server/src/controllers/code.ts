import { redisClient } from "../utils/redis";

export async function SubmitFunction(req: any, res: any) {
  try {
    const { problemId, userId, code, language, testcase } = req.body;

    await redisClient.lpush(
      "problems",
      JSON.stringify({
        problemId,
        userId,
        code,
        language,
        testcase,
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
