import prisma from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { setId: string } }
) {
  const { setId } = params;
  const setIdNumber = Number(setId);

  const searchParams = request.nextUrl.searchParams;
  const pageNumber = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;

  const games = await prisma.game.findMany({
    where: { setId: setIdNumber },
    include: { set: true },
    orderBy: { startAt: "desc" },
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  });
  const totalGames = await prisma.game.count({ where: { setId: setIdNumber } });
  const totalPageCount = Math.ceil(totalGames / pageSize);

  if (games) {
    const convertedGames = games.map((game) => ({
      id: game.id,
      startAt: game.startAt,
      roundLength: game.roundLength,
      set: {
        id: game.set.id,
        startAt: game.set.startAt,
        location: game.set.location,
        users: null,
        isThree: game.set.isThree,
        basePoint: game.set.basePoint,
      },
    }));
    return NextResponse.json({
      games: convertedGames,
      page: pageNumber,
      size: pageSize,
      totalPageCount: totalPageCount,
    });
  } else {
    return NextResponse.json({ error: "Games not found" });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: { setId: string } }
) {
  const { setId } = params;
  const { startAt, round } = await request.json();
  const isoDate = new Date(startAt);
  const setIdNumber = Number(setId);
  try {
    await prisma.game.create({
      data: {
        startAt: isoDate,
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
