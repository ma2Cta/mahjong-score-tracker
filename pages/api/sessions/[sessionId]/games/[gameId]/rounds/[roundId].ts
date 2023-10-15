import { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { roundId } = req.query;
  const roundIdNumber = Number(roundId);
  switch (req.method) {
    case "GET":
      return getResponse(res, roundIdNumber);
    case "DELETE":
      return deleteResponse(res, roundIdNumber);
    }
}

async function getResponse(res: NextApiResponse, roundIdNumber: number) {
  const round = await prisma.round.findUnique({
    where: { id: roundIdNumber }
  });
  if (round) {
    const response = {
      id: round.id,
      round: round.round,
    }
    return res.status(200).json(response);
  } else {
    return res.status(404).json({ error: "Round not found" });
  }
}

async function deleteResponse(res: NextApiResponse, roundIdNumber: number) {
  await prisma.round.delete({
    where: { id: roundIdNumber },
  });
  return res.status(200).json({ success: true });
}