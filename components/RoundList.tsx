import { Round, roundNames } from "@/types/round";
import Link from "next/link";

interface RoundListProps {
  rounds: Round[];
  setId: number;
  gameId: number;
}

const RoundList: React.FC<RoundListProps> = ({ rounds, setId, gameId }) => {
  if (!rounds) {
    return <div>Loading...</div>;
  }

  if (rounds.length === 0) {
    return <div>ラウンドが存在しません。</div>;
  }

  return (
    <ul>
      {rounds.map((round) => (
        <li key={round.id}>
          <Link
            className="underline underline-offset-2"
            href={`/sets/${setId}/games/${gameId}/rounds/${round.id}`}
          >
            {`${round.round}: ${roundNames(round.wind, round.roundInWind)}`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default RoundList;
