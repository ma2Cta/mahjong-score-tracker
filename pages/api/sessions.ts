// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "@/types/session";
import prisma from '@/lib/prisma';

type GetResponse = {
  sessions: Session[];
};

type PostResponse = {
  success: boolean;
  session?: Session;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse>
) {
  switch (req.method) {
    case "GET":
      return getResponse(res);
    case "POST":
      return postResponse(req, res);
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

async function getResponse(res: NextApiResponse<GetResponse>) {
  const sessions = await prisma.session.findMany({ 
    include: { 
      users: true, 
      games: true,
    }
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
  return res.status(200).json({ sessions: response });
}

async function postResponse(
  req: NextApiRequest, res: NextApiResponse<PostResponse>
) {
  const { date, location, selectedUserIds } = req.body;
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
  return res.status(201).json({ success: true });
}