import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;
  const sessionIdNumber = Number(sessionId);
  const session = await prisma.session.findUnique({
    where: { id: sessionIdNumber },
    include: { users: true, games: true },
  });
  if (session) {
    const response = {
      id: session.id,
      date: session.date,
      location: session.location,
      users: session.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          sessions: null,
          scores: null,
        };
      }),
      games: session.games.map((game) => {
        return {
          id: game.id,
          roundLength: game.roundLength,
          session: null,
          scores: null,
        };
      }),
    };
    return NextResponse.json(response);
  } else {
    return NextResponse.json({ error: "Session not found" });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;
  const sessionIdNumber = Number(sessionId);
  await prisma.session.delete({
    where: { id: sessionIdNumber },
  });
  NextResponse.json({ success: true });
}
