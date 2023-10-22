import { Round, Wind } from "@/types/round";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

type RoundDetailProps = {
  round: Round;
};

const RoundDetail: React.FC<RoundDetailProps> = ({ round }) => {
  if (!round) {
    return <div>Loading...</div>;
  }

  return (
    <Table removeWrapper className="my-4" isStriped>
      <TableHeader>
        <TableColumn>風</TableColumn>
        <TableColumn>何局</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>{Wind[round.wind]}</TableCell>
          <TableCell>{round.roundInWind}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default RoundDetail;
