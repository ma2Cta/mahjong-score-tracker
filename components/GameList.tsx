import React from "react";
import { Game, roundLengthNames } from "@/types/game";
import Link from "next/link";

interface GameListProps {
  games: Game[];
  sessionId: number;
}

const GameList: React.FC<GameListProps> = ({ games, sessionId }) => {
  if (!games) {
    return <div>Loading...</div>;
  }

  if (games.length === 0) {
    return <div>ゲームが存在しません。</div>;
  }

  return (
    <ul>
      {games.map((game) => (
        <li key={game.id}>
          <Link href={`/sessions/${sessionId}/games/${game.id}`}>
            {roundLengthNames(game.roundLength)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GameList;
