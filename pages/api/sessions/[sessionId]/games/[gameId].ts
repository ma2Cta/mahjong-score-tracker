import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameId } = req.query;
  if (typeof gameId === "undefined") {
    res.status(400).json({ error: "ID is required" });
    return;
  }

  // 配列ならエラー
  if (Array.isArray(gameId)) {
    res.status(400).json({ error: "Multiple IDs are not supported" });
    return;
  }

  // idがnumberに変換できない場合エラー
  if (!gameId.match(/^[0-9]+$/)) {
    res.status(400).json({ error: "ID must be number" });
    return;
  }

  const gameIdNumber = Number(gameId);
  switch (req.method) {
    case "GET":
      const game = await prisma.game.findUnique({
        where: { id: gameIdNumber }
      });
      if (game) {
        res.status(200).json(game);
      } else {
        res.status(404).json({ error: "Game not found" });
      }
      break;
    case "DELETE":
      await prisma.game.delete({
        where: { id: gameIdNumber },
      });
      res.status(200).json({ success: true });
      break;
    }
}
