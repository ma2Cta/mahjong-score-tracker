// pages/api/sessions/[sessionId]/games.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { Game, GameRound, toGameRound } from "../../../../types/game";
import prisma from "../../../../lib/prisma";

async function getGamesBySessionId(sessionId: number): Promise<Game[]> {
  const games = await prisma.game.findMany({
    where: {
      sessionId: sessionId,
    },
  });
  return games.map((game) => ({
    id: game.id,
    date: game.date,
    session_id: game.sessionId,
    round: toGameRound(game.gameRound),
  }));
}

const handler = (req: NextApiRequest, res: NextApiResponse<Game[]>) => {
  const { sessionId } = req.query;
  const games = getGamesBySessionId(Number(sessionId)).then((games) =>
    res.status(200).json(games)
  );
  return games;
};

export default handler;
