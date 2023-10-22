import { Game } from "@/types/game";
import { roundLengthNames } from "@/types/game";
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";

type GameDetailProps = {
  game: Game;
  sessionId: number;
};

const GameDetail: React.FC<GameDetailProps> = ({ game }) => {
  if (!game) {
    return <div>Loading...</div>;
  }

  return (
    <Table removeWrapper className="my-4" isStriped>
      <TableHeader>
        <TableColumn>長さ</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{roundLengthNames(game.roundLength)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default GameDetail;
