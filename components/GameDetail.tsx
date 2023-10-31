import { Game } from "@/types/game";
import { roundLengthNames } from "@/types/game";
import RoundList from "@/components/RoundList";
import TypographyH2 from "@/components/ui/TypographyH2";

type GameDetailProps = {
  game: Game;
  sessionId: number;
  deleteGame: (gameId: number) => void;
};

const GameDetail: React.FC<GameDetailProps> = ({ game, sessionId, deleteGame }) => {
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
        sessionId={sessionId}
        gameId={game.id}
      />
    </div>
  );
};

export default GameDetail;
