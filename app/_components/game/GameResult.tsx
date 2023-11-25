import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
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
              <TableCell className="flex items-center">
                <Avatar className="h-5 w-5 border flex mr-1">
                  <AvatarImage
                    className="w-full h-full"
                    src={gameResult.userTotalScore.user.image ?? ""}
                  />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                {gameResult.userTotalScore.user.name}
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
