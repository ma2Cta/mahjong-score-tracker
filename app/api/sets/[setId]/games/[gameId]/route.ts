import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";
import { Wind } from "@/app/_types/round";

export async function GET(
  request: NextRequest,
  { params }: { params: { gameId: string } }
) {
  const { gameId } = params;
  const gameIdNumber = Number(gameId);
  const game = await prisma.game.findUnique({
    include: {
      set: {
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
      startAt: game.startAt,
      roundLength: game.roundLength,
      set: {
        id: game.setId,
        startAt: game.set.startAt,
        location: game.set.location,
        users: game.set.users,
        isThree: game.set.isThree,
        basePoint: game.set.basePoint,
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
            image: score.user.image,
            sets: null,
            scores: null,
          },
          round: null,
          point: score.point,
        })),
      })),
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
