import { Round } from "@/types/round";


type RoundDetailProps = {
  round: Round;
  deleteRound: (roundId: number) => void;
};

const GameDetail: React.FC<RoundDetailProps> = ({ round, deleteRound }) => {
  if (!round) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>ラウンド数: {round.round}</div>
      <button onClick={() => deleteRound(round.id)}>ラウンドを削除</button>
    </div>
  );
};

export default GameDetail;
