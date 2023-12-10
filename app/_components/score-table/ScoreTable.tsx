import {
  childTsumoScores,
  childRonScores,
  parentTsumoScores,
  parentRonScores,
} from "@/app/_components/score-table/score";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";

interface ChildScoreTableProps {
  isChild: boolean;
  isTsumo: boolean;
}

const ScoreTable: React.FC<ChildScoreTableProps> = ({ isChild, isTsumo }) => {
  const createHanValueCells = (hanValues: any) => {
    let cells = [];
    for (let i = 1; i <= 4; i++) {
      cells.push(
        <TableCell className="w-1/5">{hanValues[i] || "-"}</TableCell>,
      );
    }
    return cells;
  };

  const selectScores = () => {
    return isChild
      ? isTsumo
        ? childTsumoScores
        : childRonScores
      : isTsumo
        ? parentTsumoScores
        : parentRonScores;
  };

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow suppressHover={true}>
            <TableHead className="w-1/5">符 \ 飜</TableHead>
            <TableHead className="w-1/5">1飜</TableHead>
            <TableHead className="w-1/5">2飜</TableHead>
            <TableHead className="w-1/5">3飜</TableHead>
            <TableHead className="w-1/5">4飜</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(selectScores()).map(([fu, hanValues], index) => (
            <TableRow
              suppressHover={true}
              className={index % 2 === 0 ? "bg-muted/50" : ""}
              key={fu}
            >
              <TableCell className="text-muted-foreground w-1/5">
                {fu}
              </TableCell>
              {createHanValueCells(hanValues)}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScoreTable;
