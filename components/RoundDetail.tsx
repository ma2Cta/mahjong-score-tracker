import ScoreList from "@/components/ScoreList";
import { Round, roundNames } from "@/types/round";


type RoundDetailProps = {
  round: Round;
  deleteRound: (roundId: number) => void;
};

const RoundDetail: React.FC<RoundDetailProps> = ({ round, deleteRound }) => {
  if (!round) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>ラウンド数: {round.round}</div>
      <div>局: {roundNames(round.wind, round.roundInWind)}</div>
      <ScoreList scores={round.scores} />
      <button onClick={() => deleteRound(round.id)}>ラウンドを削除</button>
    </div>
  );
};

export default RoundDetail;
