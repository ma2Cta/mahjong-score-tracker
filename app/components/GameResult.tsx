import { Game } from "@/app/types/game";
import { GameResult, buildGameResult } from "@/app/types/game";

type GameResultProps = {
  game: Game;
}

const GameResult: React.FC<GameResultProps> = ({ game }) => {
  if (!game) {
    return <div>Loading...</div>;
  }

  const gameResult = buildGameResult(game);
  console.log(gameResult);
  if (gameResult.length === 0) {
    return <div>ラウンドがありません。</div>
  }
  
  return (
    <div>
      <ul>
        {gameResult.map((gameResult: GameResult) => (
          <li key={gameResult.place}>
            {`${gameResult.place}位: ${gameResult.userTotalScore.user.name}: ${gameResult.userTotalScore.totalScore}`}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default GameResult;