import { NextApiRequest, NextApiResponse } from "next";
import { toWind } from "@/types/round";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { gameId } = req.query;
  const gameIdNumber = Number(gameId);
  switch (req.method) {
    case "GET":
      return getResponse(res, gameIdNumber);
    case "DELETE":
      return deleteResponse(res, gameIdNumber);
    }
}

async function getResponse(res: NextApiResponse, gameIdNumber: number) {
  const game = await prisma.game.findUnique({
    include: { 
      session: true,
      rounds: {
        include: {
          scores: {
            include: {
              user: true
            }
          }
        }
      }
    },
    where: { 
      id: gameIdNumber
    }
  });
  if (game) {
    const response = {
      id: game.id,
      date: game.date,
      round: game.roundLength,
      session: {
        id: game.sessionId,
        date: game.session.date,
        location: game.session.location,
        users: null
      },
      rounds: game.rounds.map((round) => ({
        id: round.id,
        round: round.round,
        wind: toWind(round.wind),
        roundInWind: round.roundInWind,
        game: null,
        scores: round.scores.map((score) => ({
          id: score.id,
          user: {
            id: score.user.id,
            name: score.user.name,
            sessions: null,
            scores: null
          },
          round: null,
          point: score.point,
        }))
      })),
      basePoint: game.basePoint,
    }
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ error: "Game not found" });
  }
}

async function deleteResponse(res: NextApiResponse, gameIdNumber: number) {
  await prisma.game.delete({
    where: { id: gameIdNumber },
  });
  return res.status(200).json({ success: true });
}