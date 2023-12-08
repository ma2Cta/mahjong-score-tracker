"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  childTsumoScores,
  childRonScores,
  parentTsumoScores,
  parentRonScores,
} from "@/app/_components/score-table/score";

interface ChildScoreTableProps {
  isChild: boolean;
  isTsumo: boolean;
}

const ScoreTable: React.FC<ChildScoreTableProps> = ({ isChild, isTsumo }) => {
  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>符 \ 飜</TableHead>
            <TableHead>1飜</TableHead>
            <TableHead>2飜</TableHead>
            <TableHead>3飜</TableHead>
            <TableHead>4飜</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(
            isChild
              ? isTsumo
                ? childTsumoScores
                : childRonScores
              : isTsumo
                ? parentTsumoScores
                : parentRonScores,
          ).map(([fu, hanValues]) => (
            <TableRow key={fu}>
              <TableCell className="text-muted-foreground">{fu}</TableCell>
              <TableCell>{hanValues["1"] || "-"}</TableCell>
              <TableCell>{hanValues["2"] || "-"}</TableCell>
              <TableCell>{hanValues["3"] || "-"}</TableCell>
              <TableCell>{hanValues["4"] || "-"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScoreTable;
