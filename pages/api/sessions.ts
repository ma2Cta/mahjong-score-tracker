// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "../../types/session";
import prisma from '../../lib/prisma';

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
      const sessions = await prisma.session.findMany({ include: { users: true } }      );
      return res.status(200).json({ sessions });
    case "POST":
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
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
