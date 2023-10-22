import React from "react";
import { Game, roundLengthNames } from "@/types/game";
import {
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

interface GameListProps {
  games: Game[];
  sessionId: number;
}

const GameList: React.FC<GameListProps> = ({ games, sessionId }) => {
  if (!games) {
    return <LoadingSpinner />;
  }

  if (games.length === 0) {
    return <div>ゲームが存在しません。</div>;
  }

  return (
    <Table className="my-4" isStriped>
      <TableHeader>
        <TableColumn>ゲーム名</TableColumn>
      </TableHeader>
      <TableBody>
        {games.map((game) => (
          <TableRow key={game.id}>
            <TableCell>
              <Link href={`/sessions/${sessionId}/games/${game.id}`}>
                {roundLengthNames(game.roundLength)}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GameList;
