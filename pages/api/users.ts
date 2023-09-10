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
      return res.status(200).json({ users });
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
