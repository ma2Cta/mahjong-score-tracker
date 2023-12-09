import { Round, roundNames } from "@/app/_types/round";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/app/_components/ui/table";
import React from "react";

type RoundDetailProps = {
  round: Round;
};

const RoundDetail: React.FC<RoundDetailProps> = ({ round }) => {
  if (!round) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableBody>
          <TableRow>
            <TableHead className="text-right">何戦目</TableHead>
            <TableCell>{round.round}</TableCell>
          </TableRow>
          <TableRow>
            <TableHead className="text-right">局</TableHead>
            <TableCell>{roundNames(round.wind, round.roundInWind)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default RoundDetail;
