import { prisma } from "../db/db";
import { genToken, hashPassword, verifyHashedPassword } from "../utils";

export async function LoginFunction(req: any, res: any) {
  try {
    const { username, password } = req.body;
    const user = await prisma.user.findFirst({
      where: {
        username,
      },
    });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found or wrong credentials",
      });
    }

    const decoded = await verifyHashedPassword(password, user?.password);

    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Wrong credentials",
      });
    }

    const token = genToken(user?.id, user?.username);
    res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    return res.status(200).json({
      success: true,
      message: "successfull",
      id: user.id,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function SignupFunction(req: any, res: any) {
  try {
    const { username, password } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    const token = genToken(newUser.id, newUser.username);

    return res
      .cookie("access_token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      })
      .status(200)
      .json({
        success: true,
        message: "successfull",
        id: newUser.id,
      });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}

export async function GetAllUsers(req: any, res: any) {
  try {
    const allUser = await prisma.user.findMany({
      where: {
        id: {
          not: req.body.userId,
        },
      },
      select: {
        id: true,
        username: true,
      },
    });
    return res.status(200).json({
      success: true,
      allUser,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
    });
  }
}

export async function GetSingleUser(req: any, res: any) {
  try {
    const id = req.params.id;
    const user = await prisma.user.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        username: true,
      },
    });
    return res.status(200).json({
      success: true,
      user,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
