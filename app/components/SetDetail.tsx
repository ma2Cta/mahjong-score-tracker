import { Set } from "@/app/types/set";
import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/components/ui/table";

type SetDetailProps = {
  set: Set;
};

const SetDetail: React.FC<SetDetailProps> = ({ set }) => {
  if (!set) {
    return <div>Loading...</div>;
  }

  return (
    <div className="rounded-md border mt-4">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>開催日</TableHead>
            <TableHead>開催場所</TableHead>
            <TableHead>参加ユーザー</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{set.date?.toString()}</TableCell>
            <TableCell>{set.location}</TableCell>
            <TableCell>
              {set.users?.map((user) => user.name).join(", ")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SetDetail;
