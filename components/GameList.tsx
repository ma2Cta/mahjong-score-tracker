import React, { useEffect, useState } from "react";
import { Game, gameRoundNames } from "../types/game";
import Link from "next/link";

const fetchGames = async (sessionId: number): Promise<Game[]> => {
  const response = await fetch(`/api/sessions/${sessionId}/games`);
  if (!response.ok) {
    throw new Error(`Failed to fetch games: ${response.statusText}`);
  }
  
  const data = await response.json();
  if (!data.games || !Array.isArray(data.games)) {
    throw new Error('Invalid data format: Expected a list of games');
  }
  
  return data.games;
};

interface GameListProps {
  sessionId: number;
}

const GameList: React.FC<GameListProps> = ({ sessionId }) => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (sessionId) {
      fetchGames(sessionId).then(setGames);
    }
  }, [sessionId]);

  if (games.length === 0) {
    return <div>ゲームが存在しません。</div>;
  }

  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          <Link href={`/sessions/${sessionId}/games/${game.id}`}>
            {`${gameRoundNames(game.round)} 開催日時:${game.date}`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GameList;
