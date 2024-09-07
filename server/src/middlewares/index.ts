import { verifyToken } from "../utils";

export async function middleware(req: any, res: any, next: any) {
  try {
    const token = req.headers.cookie;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "unauthorized returned 1",
      });
    }
    const regex = /access_token=([^;]+)/;

    const match = token.match(regex);
    const accessToken = match ? match[1] : null;

    if (!accessToken) {
      return res.status(400).json({
        success: false,
        message: "unauthorized returned 2",
      });
    }
    const decoded = verifyToken(accessToken);
    if (!decoded) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized access 3",
      });
    }
    req.body.userId = (decoded as any).id;
    next();
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
