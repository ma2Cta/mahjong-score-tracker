import React from "react";
import { Score } from "@/app/_types/score";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import { UserName } from "@/app/_components/ui/UserName";

type ScoreListProps = {
  scores: Score[];
};

const ScoreList: React.FC<ScoreListProps> = ({ scores }) => {
  if (!scores) {
    return <div>Loading...</div>;
  }

  scores.sort((a, b) => b.id - a.id);

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ユーザー</TableHead>
            <TableHead>スコア</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {scores.map((score) => (
            <TableRow key={score.id}>
              <TableCell>
                <UserName
                  name={score.user?.name ?? ""}
                  image={score.user?.image ?? ""}
                />
              </TableCell>
              <TableCell>{score.point}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ScoreList;
