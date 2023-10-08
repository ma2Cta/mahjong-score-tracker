import { Game } from "@/types/game";
import { gameRoundNames } from "@/types/game";

type GameDetailProps = {
  game: Game;
  deleteGame: (gameId: number) => void;
};

const GameDetail: React.FC<GameDetailProps> = ({ game, deleteGame }) => {
  if (!game) {
    return <div>Loading...</div>;
  } 

  return (
    <div>
      <div>開催日: {game.date?.toString()}</div>
      <div>ゲーム数: {gameRoundNames(game.round)}</div>
      <button onClick={() => deleteGame(game.id)}>ゲームを削除</button>
    </div>
  );
}

export default GameDetail;