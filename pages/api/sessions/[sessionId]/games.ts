// pages/api/sessions/[sessionId]/games.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { Game } from '../../../../types/game';

function getGamesBySessionId(sessionId: number): Game[] {
  // mock response
  return [
    {
      id: 1,
      session_id: sessionId,
      round: 1,
    },
    {
      id: 2,
      session_id: sessionId,
      round: 2,
    },
  ]
}

const handler = (req: NextApiRequest, res: NextApiResponse<Game[]>) => {
  const { sessionId } = req.query;

  // セッションIDを使用してゲームを取得するロジック
  const games = getGamesBySessionId(Number(sessionId));

  res.status(200).json(games);
};

export default handler;