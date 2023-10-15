// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { User } from "../../types/user";
import prisma from '../../lib/prisma';

type GetResponse = {
  users: User[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse>
) {
  switch (req.method) {
    case "GET":
      const users = await prisma.user.findMany();
      const response = users.map((user) => {
        return {
          id: user.id,
          name: user.name,
          sessions: null,
          scores: null
        };
      });
      return res.status(200).json({ users: response });
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
