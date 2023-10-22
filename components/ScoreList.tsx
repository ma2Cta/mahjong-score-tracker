import React from "react";
import { Score } from "@/types/score";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

type ScoreListProps = {
  scores: Score[];
};

const ScoreList: React.FC<ScoreListProps> = ({ scores }) => {
  if (!scores) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <h2 className="text-2xl font-bold my-2">スコア一覧</h2>
      <Table removeWrapper className="my-4" isStriped>
        <TableHeader>
          <TableColumn>名前</TableColumn>
          <TableColumn>点数</TableColumn>
        </TableHeader>
        <TableBody>
          {scores.map((score) => (
            <TableRow key={score.id}>
              <TableCell>{score.user?.name}</TableCell>
              <TableCell>{score.point}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default ScoreList;
