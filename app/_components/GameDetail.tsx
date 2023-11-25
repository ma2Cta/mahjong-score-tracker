import { Game } from "@/app/_types/game";
import { roundLengthNames } from "@/app/_types/game";
import RoundList from "@/app/_components/RoundList";
import TypographyH2 from "@/app/_components/ui/TypographyH2";

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
    <div>
      <div>{roundLengthNames(game.roundLength)}</div>
      <button onClick={() => deleteGame(game.id)}>ゲームを削除</button>
      <TypographyH2>ラウンド一覧</TypographyH2>
      <RoundList
        rounds={game.rounds ? game.rounds : []}
        setId={setId}
        gameId={game.id}
      />
    </div>
  );
};

export default GameDetail;