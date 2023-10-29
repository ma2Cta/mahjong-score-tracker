import prisma from "@/lib/prisma";
import { toRoundLength } from "@/types/game";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;
  const sessionIdNumber = Number(sessionId);
  const games = await prisma.game.findMany({
    where: { sessionId: sessionIdNumber },
    include: { session: true },
    orderBy: { createdAt: "asc" },
  });
  if (games) {
    const response = games.map((game) => ({
      id: game.id,
      round: toRoundLength(game.roundLength),
      session: {
        id: game.session.id,
        date: game.session.date,
        location: game.session.location,
        users: null
      }
    }));
    return NextResponse.json(response);
  } else {
    return NextResponse.json({ error: "Games not found" });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;
  const { round } = await request.json();
  const sessionIdNumber = Number(sessionId);
  try {
    await prisma.game.create({
      data: {
        roundLength: round,
        session: {
          connect: { id: sessionIdNumber },
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
