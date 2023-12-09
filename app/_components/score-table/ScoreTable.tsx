import {
  NoSelectTable,
  NoSelectTableBody,
  NoSelectTableCell,
  NoSelectTableHead,
  NoSelectTableHeader,
  NoSelectTableRow,
} from "@/app/_components/ui/NoSelectTable";
import {
  childTsumoScores,
  childRonScores,
  parentTsumoScores,
  parentRonScores,
} from "@/app/_components/score-table/score";
import React from "react";

interface ChildScoreTableProps {
  isChild: boolean;
  isTsumo: boolean;
}

const ScoreTable: React.FC<ChildScoreTableProps> = ({ isChild, isTsumo }) => {
  const createHanValueCells = (hanValues: any) => {
    let cells = [];
    for (let i = 1; i <= 4; i++) {
      cells.push(
        <NoSelectTableCell className="w-1/5">
          {hanValues[i] || "-"}
        </NoSelectTableCell>,
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
      <NoSelectTable>
        <NoSelectTableHeader>
          <NoSelectTableRow>
            <NoSelectTableHead className="w-1/5">符 \ 飜</NoSelectTableHead>
            <NoSelectTableHead className="w-1/5">1飜</NoSelectTableHead>
            <NoSelectTableHead className="w-1/5">2飜</NoSelectTableHead>
            <NoSelectTableHead className="w-1/5">3飜</NoSelectTableHead>
            <NoSelectTableHead className="w-1/5">4飜</NoSelectTableHead>
          </NoSelectTableRow>
        </NoSelectTableHeader>
        <NoSelectTableBody>
          {Object.entries(selectScores()).map(([fu, hanValues], index) => (
            <NoSelectTableRow
              className={index % 2 === 0 ? "bg-muted/50" : ""}
              key={fu}
            >
              <NoSelectTableCell className="text-muted-foreground w-1/5">
                {fu}
              </NoSelectTableCell>
              {createHanValueCells(hanValues)}
            </NoSelectTableRow>
          ))}
        </NoSelectTableBody>
      </NoSelectTable>
    </div>
  );
};

export default ScoreTable;
