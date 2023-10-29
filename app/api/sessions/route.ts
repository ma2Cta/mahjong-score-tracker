import prisma from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sessions = await prisma.session.findMany({ 
    include: { 
      users: true, 
      games: true,
    },
    orderBy: { date: 'asc' }
  });
  const response = sessions.map((session) => {
    return {
      id: session.id,
      date: session.date,
      location: session.location,
      users: session.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          sessions: null,
          scores: null
        };
      }),
      games: session.games.map((game) => {
        return {
          id: game.id,
          roundLength: game.roundLength,
          session: null,
          rounds: null,
          basePoint: game.basePoint,
        }
      })
    };
  })
  return NextResponse.json({ sessions: response });
}

export async function POST(req: NextRequest) {
  const { date, location, selectedUserIds } = await req.json();
  const isoDate = new Date(date);
  await prisma.session.create({
    data: {
      date: isoDate,
      location,
      users: {
        connect: selectedUserIds.map((id: String) => ({ id: Number(id) })),
      },
    },
  });
  return NextResponse.json({ success: true });
}