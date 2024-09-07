import { prisma } from "../db/db";

export async function GetAllMessages(req: any, res: any) {
  try {
    const userId = Number(req.body.userId);
    const fromId = Number(req.body.fromId);
    let userMessages = await prisma.messages.findMany({
      where: {
        OR: [
          {
            AND: [{ toId: userId }, { fromId: fromId }],
          },
          {
            AND: [{ toId: fromId }, { fromId: userId }],
          },
        ],
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    return res.status(200).json({
      success: true,
      userMessages,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
