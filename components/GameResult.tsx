import { Game } from "@/types/game";
import { GameResult, buildGameResult } from "@/types/game";

type GameResultProps = {
  game: Game;
}

const GameResultComponent: React.FC<GameResultProps> = ({ game }) => {
  if (!game) {
    return <div>Loading...</div>;
  }

  const gameResult = buildGameResult(game);
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

export default GameResultComponent;