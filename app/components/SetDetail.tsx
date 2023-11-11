import { Set } from "@/app/types/set";
import React from "react";
import {
  Table,
  TableCell,
  TableHead,
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
        <TableRow>
          <TableHead className="text-right">開催日時</TableHead>
          <TableCell>{set.date?.toString()}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="text-right">開催場所</TableHead>
          <TableCell>{set.location}</TableCell>
        </TableRow>
        <TableRow>
          <TableHead className="text-right">参加ユーザー</TableHead>
          <TableCell>
            {set.users?.map((user) => user.name).join(", ")}
          </TableCell>
        </TableRow>
      </Table>
    </div>
  );
};

export default SetDetail;
