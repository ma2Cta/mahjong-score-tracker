import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;
  const sessionIdNumber = Number(sessionId);
  switch (req.method) {
    case "GET":
      return getResponse(res, sessionIdNumber);
    case "DELETE":
      return deleteResponse(res, sessionIdNumber);
    }
}

async function getResponse(res: NextApiResponse, sessionIdNumber: number) {
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
    }
    res.status(200).json(session);
  } else {
    res.status(404).json({ error: "Session not found" });
  }
}

async function deleteResponse(res: NextApiResponse, sessionIdNumber: number) {
  await prisma.session.delete({
    where: { id: sessionIdNumber },
  });
  res.status(200).json({ success: true });
}
