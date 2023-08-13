// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Session } from "../../types/session";

type GetResponse = {
  sessions: Session[];
};

type PostResponse = {
  success: boolean;
  session?: Session;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<GetResponse | PostResponse>
) {
  switch (req.method) {
    case "GET":
      // mock response
      const sessions = [
        {
          id: 1,
          date: "2021-01-01",
          location: "自宅",
          participants: ["user1", "user2", "user3", "user4"],
        },
        {
          id: 2,
          date: "2021-01-02",
          location: "自宅",
          participants: ["user1", "user2", "user3", "user4"],
        },
      ]
      return res.status(200).json({ sessions });
    case "POST":
      const { date, location } = req.body;

      // ここでデータベースなどにセッションを保存

      return res.status(201).json({ success: true });
    default:
      return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
