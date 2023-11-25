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
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";

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
              <TableCell className="flex items-center">
                <Avatar className="h-5 w-5 border flex mr-1">
                  <AvatarImage
                    className="w-full h-full"
                    src={score.user?.image ?? ""}
                  />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                {score.user?.name}
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
