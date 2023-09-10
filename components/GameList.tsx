import React, { useEffect, useState } from "react";
import { Game } from "../types/game";

const fetchGames = async (sessionId: number): Promise<Game[]> => {
  const response = await fetch(`/api/sessions/${sessionId}/games`);
  return response.json();
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

  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>round: {game.round}</li> // ゲームのリンクや詳細など
      ))}
    </ul>
  );
};

export default GameList;
