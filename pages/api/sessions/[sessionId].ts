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

  const session = await getSessionById(sessionId);
  if (session) {
    res.status(200).json(session);
  } else {
    res.status(404).json({ error: "Session not found" });
  }
}

async function getSessionById(id: string): Promise<Session | null> {
  // idがnumberに変換できない場合エラー
  if (!id.match(/^[0-9]+$/)) {
    throw new Error("Invalid ID");
  }

  return await prisma.session.findUnique({
    where: { id: Number(id) },
    include: { users: true },
  });
}
