import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { Wind } from "@/types/round";

export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  const { gameId } = params;
  const gameIdNumber = Number(gameId);
  const game = await prisma.game.findUnique({
    include: {
      session: {
        include: {
          users: true,
        },
      },
      rounds: {
        include: {
          scores: {
            include: {
              user: true,
            },
          },
        },
      },
    },
    where: {
      id: gameIdNumber,
    },
  });
  if (game) {
    const response = {
      id: game.id,
      roundLength: game.roundLength,
      session: {
        id: game.sessionId,
        date: game.session.date,
        location: game.session.location,
        users: game.session.users,
      },
      rounds: game.rounds.map((round) => ({
        id: round.id,
        round: round.round,
        wind: round.wind as Wind,
        roundInWind: round.roundInWind,
        game: null,
        scores: round.scores.map((score) => ({
          id: score.id,
          user: {
            id: score.user.id,
            name: score.user.name,
            sessions: null,
            scores: null,
          },
          round: null,
          point: score.point,
        })),
      })),
      basePoint: game.basePoint,
    };
    return NextResponse.json(response);
  } else {
    return NextResponse.json({ error: "Game not found" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  const { gameId } = params;
  const gameIdNumber = Number(gameId);
  await prisma.game.delete({
    where: { id: gameIdNumber },
  });
  return NextResponse.json({ success: true });
}