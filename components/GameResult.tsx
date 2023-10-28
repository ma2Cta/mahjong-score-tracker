import { Game } from "@/types/game";
import { GameResult, buildGameResult } from "@/types/game";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type GameResultProps = {
  game: Game;
};

const GameResult: React.FC<GameResultProps> = ({ game }) => {
  if (!game) {
    return <div>Loading...</div>;
  }

  const gameResult = buildGameResult(game);
  console.log(gameResult);
  if (gameResult.length === 0) {
    return <div>ラウンドがありません。</div>;
  }

  return (
    <Table className="my-4" isStriped>
      <TableHeader>
        <TableColumn width={2}>順位</TableColumn>
        <TableColumn>ユーザー名</TableColumn>
        <TableColumn>点数</TableColumn>
      </TableHeader>
      <TableBody>
        {gameResult.map((gameResult: GameResult) => (
          <TableRow key={gameResult.place}>
            <TableCell>{gameResult.place}</TableCell>
            <TableCell>{gameResult.userTotalScore.user.name}</TableCell>
            <TableCell>{gameResult.userTotalScore.totalScore}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default GameResult;
