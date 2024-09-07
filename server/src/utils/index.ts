import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { prisma } from "../db/db";

export function genToken(id: number, username: string): string {
  return jwt.sign({ id, username }, process.env.SECRET!, {
    expiresIn: process.env.END,
  });
}

export function verifyToken(token: string): JwtPayload | string {
  const decoded = jwt.verify(token, process.env.SECRET!);
  return decoded;
}

export async function hashPassword(password: string): Promise<string> {
  const hashedPassword = await bcrypt.hash(password, 12);
  return hashedPassword;
}

export async function verifyHashedPassword(
  password: string,
  dbpassword: string
): Promise<boolean> {
  const correct = await bcrypt.compare(password, dbpassword);
  if (correct) {
    return true;
  }
  return false;
}

export async function saveToDB({
  message,
  toId,
  fromId,
}: {
  message: string;
  toId: number;
  fromId: number;
}) {
  try {
    await prisma.messages.create({
      data: {
        msg: message,
        toId: Number(toId),
        fromId: Number(fromId),
      },
    });
    console.log("saved");
    return true;
  } catch (err) {
    return false;
  }
}
