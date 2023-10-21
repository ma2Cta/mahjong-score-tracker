import { NextApiRequest, NextApiResponse } from "next";
import { CreateRoundData } from "@/types/round"
import prisma from "@/lib/prisma";
import { CreateScoreData } from "@/types/score";

type PostResponse = {
  success: boolean;
};

type ErrorResponse = {
  message: string;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<PostResponse | ErrorResponse>
) {
  const { gameId } = req.query;
  const gameIdNumber = Number(gameId);
  switch (req.method) {
    case "POST":
      return postResponse(req, res, gameIdNumber);
    default:
      res.setHeader("Allow", ["POST"]);
      res.status(405).json({ message: `Method ${req.method} Not Allowed` });
  }
}

async function postResponse(
  req: NextApiRequest,
  res: NextApiResponse,
  gameIdNumber: number
) {
  try {
    console.log(req.body);
    const { wind, roundInWind, scores } = req.body as CreateRoundData;
    await prisma.round.create({
      data: {
        wind,
        roundInWind,
        game: {
          connect: { id: gameIdNumber },
        },
        scores: {
          create: scores.map((score: CreateScoreData) => ({
            user: { connect: { id: score.userId } },
            point: score.point
          }))
        }
      },
    });
    return res.status(201).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}