import React, { useEffect, useState } from "react";
import { Game, GameRound } from "../types/game";

const fetchGames = async (sessionId: number): Promise<Game[]> => {
  const response = await fetch(`/api/sessions/${sessionId}/games`);
  return response.json();
};

function gameRoundNames(gameRound: GameRound): String {
  switch (gameRound) {
    case GameRound.One:
      return "東風戦";
    case GameRound.Half:
      return "半荘戦";
    case GameRound.Full:
      return "一荘戦";
  }
}

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
          {`${gameRoundNames(game.round)} 開催日時:${game.date}`}
          </li>
      ))}
    </ul>
  );
};

export default GameList;
