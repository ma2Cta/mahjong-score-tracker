import { NextApiRequest, NextApiResponse } from "next";
import { Game, GameRound, toGameRound } from "../../../../types/game";
import prisma from "../../../../lib/prisma";

const fetchGames = async (sessionId: number): Promise<Game[]> => {
  const games = await prisma.game.findMany({
    where: { sessionId },
    orderBy: { date: "desc" },
  });
  return games.map((game) => ({
    id: game.id,
    date: game.date,
    session_id: game.sessionId,
    round: toGameRound(game.gameRound),
  }));
};

const createGame = async (sessionId: number, date: Date, round: GameRound): Promise<void> => {
  const isoDate = date.toISOString();
  await prisma.game.create({
    data: {
      date: isoDate,
      gameRound: round,
      session: {
        connect: { id: sessionId },
      },
    },
  });
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse | ErrorResponse>
) {
  const { sessionId } = req.query;
  switch (req.method) {
    case "GET":
      try {
        const games = await fetchGames(Number(sessionId));
        res.status(200).json({ games });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    case "POST":
      try {
        const { date, round } = req.body;
        await createGame(Number(sessionId), new Date(date), round);
        res.status(201).json({ success: true });
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
      }
      break;
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

type GetResponse = {
  games: Game[];
};

type PostResponse = {
  success: boolean;
};

type ErrorResponse = {
  message: string;
}