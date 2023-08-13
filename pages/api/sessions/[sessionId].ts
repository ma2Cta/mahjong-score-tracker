import { NextApiRequest, NextApiResponse } from 'next';
import { Session } from '../../../types/session';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { sessionId } = req.query;
  if (typeof sessionId === 'undefined') {
    res.status(400).json({ error: 'ID is required' });
    return;
  }

  // 配列ならエラー
  if (Array.isArray(sessionId)) {
    res.status(400).json({ error: 'Multiple IDs are not supported' });
    return;
  }

  const session = getSessionById(sessionId);
  if (session) {
    res.status(200).json(session);
  } else {
    res.status(404).json({ error: 'Session not found' });
  }
};

function getSessionById(id: string): Session {
  // idがnumberに変換できない場合エラー
  if (!id.match(/^[0-9]+$/)) {
    throw new Error('Invalid ID');
  }

  return {
    id: Number(id), 
    date: '2023-08-12',
    location: 'Tokyo',
    participants: ['Alice', 'Bob', 'Charlie'],
  };
}
