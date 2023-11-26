import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/_lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { roundId: string } },
) {
  const { roundId } = params;
  const roundIdNumber = Number(roundId);
  const round = await prisma.round.findUnique({
    include: {
      scores: {
        include: {
          user: true,
        },
      },
    },
    where: { id: roundIdNumber },
  });
  if (round) {
    const response = {
      id: round.id,
      round: round.round,
      wind: round.wind,
      roundInWind: round.roundInWind,
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
    };
    return NextResponse.json(response);
  } else {
    return NextResponse.json({ error: "Round not found" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { roundId: string } },
) {
  const { roundId } = params;
  const roundIdNumber = Number(roundId);
  await prisma.round.delete({
    where: { id: roundIdNumber },
  });
  return NextResponse.json({ success: true });
}
