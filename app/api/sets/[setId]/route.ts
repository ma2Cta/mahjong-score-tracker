import prisma from "@/app/_lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { setId: string } },
) {
  const { setId } = params;
  const setIdNumber = Number(setId);
  const set = await prisma.set.findUnique({
    where: { id: setIdNumber },
    include: { users: true, games: true },
  });
  if (set) {
    const response = {
      id: set.id,
      date: set.date,
      location: set.location,
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
          scores: null,
        };
      }),
    };
    return NextResponse.json(response);
  } else {
    return NextResponse.json({ error: "Set not found" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { setId: string } },
) {
  const { setId } = params;
  const setIdNumber = Number(setId);
  await prisma.set.delete({
    where: { id: setIdNumber },
  });
  NextResponse.json({ success: true });
}
