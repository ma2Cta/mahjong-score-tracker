import { NextRequest, NextResponse } from "next/server";
import prisma from "@/app/lib/prisma";
import { CreateRoundData } from "@/app/types/round";
import { CreateScoreData } from "@/app/types/score";

export async function POST(
  req: NextRequest,
  { params }: { params: { gameId: string } }
) {
  const { gameId } = params;
  const gameIdNumber = Number(gameId);
  try {
    const { wind, roundInWind, scores } = (await req.json()) as CreateRoundData;
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
            point: score.point,
          })),
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
