import prisma from '@/app/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const sets = await prisma.set.findMany({ 
    include: { 
      users: true, 
      games: true,
    },
    orderBy: { date: 'asc' }
  });
  const response = sets.map((set) => {
    return {
      id: set.id,
      date: set.date,
      location: set.location,
      users: set.users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          sets: null,
          scores: null
        };
      }),
      games: set.games.map((game) => {
        return {
          id: game.id,
          roundLength: game.roundLength,
          set: null,
          rounds: null,
          basePoint: game.basePoint,
        }
      })
    };
  })
  return NextResponse.json({ sets: response });
}

export async function POST(req: NextRequest) {
  const { date, location, selectedUserIds } = await req.json();
  const isoDate = new Date(date);
  await prisma.set.create({
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