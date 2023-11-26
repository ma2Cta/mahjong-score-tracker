import prisma from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { setId: string } },
) {
  const { setId } = params;
  const setIdNumber = Number(setId);
  const games = await prisma.game.findMany({
    where: { setId: setIdNumber },
    include: { set: true },
    orderBy: { createdAt: "asc" },
  });
  if (games) {
    const response = games.map((game) => ({
      id: game.id,
      roundLength: game.roundLength,
      set: {
        id: game.set.id,
        date: game.set.date,
        location: game.set.location,
        users: null,
      },
    }));
    return NextResponse.json(response);
  } else {
    return NextResponse.json({ error: "Games not found" });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { setId: string } },
) {
  const { setId } = params;
  const { round } = await request.json();
  const setIdNumber = Number(setId);
  try {
    await prisma.game.create({
      data: {
        roundLength: round,
        set: {
          connect: { id: setIdNumber },
        },
      },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal server error" });
  }
}
