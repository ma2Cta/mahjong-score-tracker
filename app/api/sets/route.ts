import prisma from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const pageNumber = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("size")) || 10;

  const sets = await prisma.set.findMany({
    include: {
      users: true,
      games: true,
    },
    orderBy: { startAt: "desc" },
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
  });
  const totalSets = await prisma.set.count();
  const totalPageCount = Math.ceil(totalSets / pageSize);

  const convertedSets = sets.map((set) => {
    return {
      id: set.id,
      startAt: set.startAt,
      location: set.location,
      isThree: set.isThree,
      users: set.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          image: user.image,
          sets: null,
          scores: null,
        };
      }),
      games: set.games.map((game) => {
        return {
          id: game.id,
          roundLength: game.roundLength,
          set: null,
          rounds: null,
          basePoint: game.basePoint,
        };
      }),
    };
  });
  return NextResponse.json({
    sets: convertedSets,
    page: pageNumber,
    size: pageSize,
    totalPageCount: totalPageCount,
  });
}

export async function POST(req: NextRequest) {
  const { startAt, location, isThree, selectedUserIds } = await req.json();
  const isoDate = new Date(startAt);
  await prisma.set.create({
    data: {
      startAt: isoDate,
      location,
      isThree,
      users: {
        connect: selectedUserIds.map((id: String) => ({ id: Number(id) })),
      },
    },
  });
  return NextResponse.json({ success: true });
}
