import { NextApiRequest, NextApiResponse } from "next";
import { Session } from "../../../types/session";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;
  if (typeof sessionId === "undefined") {
    res.status(400).json({ error: "ID is required" });
    return;
  }

  // 配列ならエラー
  if (Array.isArray(sessionId)) {
    res.status(400).json({ error: "Multiple IDs are not supported" });
    return;
  }

  // idがnumberに変換できない場合エラー
  if (!sessionId.match(/^[0-9]+$/)) {
    res.status(400).json({ error: "ID must be number" });
    return;
  }

  const sessionIdNumber = Number(sessionId);
  switch (req.method) {
    case "GET":
      const session = await prisma.session.findUnique({
        where: { id: sessionIdNumber },
        include: { users: true },
      });
      if (session) {
        res.status(200).json(session);
      } else {
        res.status(404).json({ error: "Session not found" });
      }
      break;
    case "DELETE":
      console.log("delete executed");
      await prisma.session.delete({
        where: { id: sessionIdNumber },
      });
      res.status(200).json({ success: true });
      break;
    }
}
