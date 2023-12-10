import { Set } from "@/app/_types/set";
import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@/app/_components/ui/table";
import { UserName } from "@/app/_components/ui/UserName";

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
        <TableBody>
          <TableRow suppressHover={true}>
            <TableHead className="text-right">開催日時</TableHead>
            <TableCell>{set.startAt?.toString()}</TableCell>
          </TableRow>
          <TableRow suppressHover={true}>
            <TableHead className="text-right">開催場所</TableHead>
            <TableCell>{set.location}</TableCell>
          </TableRow>
          <TableRow suppressHover={true}>
            <TableHead className="text-right">参加ユーザー</TableHead>
            <TableCell>
              {set.users?.map((user) => {
                return (
                  <div key={user.id}>
                    <UserName name={user.name} image={user.image ?? ""} />
                  </div>
                );
              })}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default SetDetail;
