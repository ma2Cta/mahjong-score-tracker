import { UserName } from "@/app/_components/ui/UserName";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { Game } from "@/app/_types/game";
import { GameResult, buildGameResult } from "@/app/_types/game";

type GameResultProps = {
  game: Game;
};

const GameResult: React.FC<GameResultProps> = ({ game }) => {
  if (!game) {
    return <div>Loading...</div>;
  }

  const gameResult = buildGameResult(game);
  if (gameResult.length === 0) {
    return <div>ラウンドがありません。</div>;
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>順位</TableHead>
            <TableHead>ユーザー</TableHead>
            <TableHead>スコア</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {gameResult.map((gameResult: GameResult) => (
            <TableRow key={gameResult.place}>
              <TableCell>{gameResult.place}</TableCell>
              <TableCell>
                <UserName
                  name={gameResult.userTotalScore.user.name}
                  image={gameResult.userTotalScore.user.image ?? ""}
                />
              </TableCell>
              <TableCell>{gameResult.userTotalScore.totalScore}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GameResult;
