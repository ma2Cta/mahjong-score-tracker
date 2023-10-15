import { NextApiRequest, NextApiResponse } from "next";
import { Game, RoundLength, toRoundLength } from "../../../../types/game";
import prisma from "../../../../lib/prisma";

type GetResponse = {
  games: Game[];
};

type PostResponse = {
  success: boolean;
};

type ErrorResponse = {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse | ErrorResponse>
) {
  const { sessionId } = req.query;
  const sessionIdNumber = Number(sessionId);
  switch (req.method) {
    case "GET":
      return getResponse(res, sessionIdNumber);
    case "POST":
      return postResponse(req, res, sessionIdNumber);
    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

async function getResponse(res: NextApiResponse, sessionIdNumber: number) {
  try {
    const games = await prisma.game.findMany({
      where: { sessionId: sessionIdNumber },
      include: { session: true },
      orderBy: { createdAt: "asc" },
    });
    games.map((game) => ({
      id: game.id,
      round: toRoundLength(game.roundLength),
      session: {
        id: game.session.id,
        date: game.session.date,
        location: game.session.location,
        users: null
      }
    }));
    return res.status(200).json({ games });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function postResponse(req: NextApiRequest, res: NextApiResponse, sessionIdNumber: number) {
  try {
    const { date, round } = req.body;
    await prisma.game.create({
      data: {
        roundLength: round,
        session: {
          connect: { id: sessionIdNumber },
        },
      },
    });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}