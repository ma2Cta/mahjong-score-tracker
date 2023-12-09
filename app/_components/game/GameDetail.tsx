import { Game } from "@/app/_types/game";
import { roundLengthNames } from "@/app/_types/game";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/app/_components/ui/table";
import React from "react";

type GameDetailProps = {
  game: Game;
  setId: number;
  deleteGame: (gameId: number) => void;
};

const GameDetail: React.FC<GameDetailProps> = ({ game, setId, deleteGame }) => {
  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableBody>
          <TableRow>
            <TableHead className="text-right">開始日時</TableHead>
            <TableCell>{game.startAt.toString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-right">何風戦</TableHead>
            <TableCell>{roundLengthNames(game.roundLength)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default GameDetail;
