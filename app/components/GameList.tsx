import React from "react";
import { Game, roundLengthNames } from "@/app/types/game";
import Link from "next/link";

interface GameListProps {
  games: Game[];
  setId: number;
}

const GameList: React.FC<GameListProps> = ({ games, setId }) => {
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
          <Link
            className="underline underline-offset-2"
            href={`/sets/${setId}/games/${game.id}`}
          >
            {roundLengthNames(game.roundLength)}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default GameList;
