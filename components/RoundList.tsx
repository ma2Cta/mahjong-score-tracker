import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Round, Wind } from "@/types/round";
import {
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

interface RoundListProps {
  rounds: Round[];
  sessionId: number;
  gameId: number;
}

const RoundList: React.FC<RoundListProps> = ({ rounds, sessionId, gameId }) => {
  if (!rounds) {
    return <LoadingSpinner />;
  }

  if (rounds.length === 0) {
    return <div>ラウンドが存在しません。</div>;
  }

  return (
    <Table className="my-4" isStriped>
      <TableHeader>
        <TableColumn width={2}>ゲーム内局数</TableColumn>
        <TableColumn>風</TableColumn>
        <TableColumn>何局</TableColumn>
      </TableHeader>
      <TableBody>
        {rounds.map((round, index) => (
          <TableRow key={round.id}>
            <TableCell>
              {index + 1}
            </TableCell>
            <TableCell>
              <Link
                href={`/sessions/${sessionId}/games/${gameId}/rounds/${round.id}`}
              >
                {Wind[round.wind]}
              </Link>
            </TableCell>
            <TableCell>
              <Link
                href={`/sessions/${sessionId}/games/${gameId}/rounds/${round.id}`}
              >
                {round.roundInWind}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RoundList;
