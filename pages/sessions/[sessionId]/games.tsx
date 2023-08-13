// pages/sessions/[sessionId]/games.tsx
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Game } from '../../../types/game';

const fetchGames = async (sessionId: number): Promise<Game[]> => {
  const response = await fetch(`/api/sessions/${sessionId}/games`);
  return response.json();
};

const GamesList: React.FC = () => {
  const [games, setGames] = useState<Game[]>([]);
  const router = useRouter();
  const { sessionId } = router.query;

  useEffect(() => {
    if (sessionId) {
      fetchGames(Number(sessionId)).then(setGames);
    }
  }, [sessionId]);

  return (
    <div>
      <h1>ゲーム一覧</h1>
      <ul>
        {games.map((game) => (
          <li key={game.id}>round: {game.round}</li> // ゲームのリンクや詳細など
        ))}
      </ul>
      <Link href={`/sessions/${sessionId}`}>セッション詳細に戻る</Link>
    </div>
  );
};

export default GamesList;
