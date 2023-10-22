import React from "react";
import { Session } from "@/types/session";
import {
  Link,
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/react";

type SessionListProps = {
  sessions: Session[];
};

const SessionsList: React.FC<SessionListProps> = ({ sessions }) => {
  if (!sessions) {
    return <div>Loading...</div>;
  }

  return (
    <Table className="my-4" isStriped>
      <TableHeader>
        <TableColumn>開催日</TableColumn>
        <TableColumn>場所</TableColumn>
      </TableHeader>
      <TableBody>
        {sessions.map((session) => (
          <TableRow key={session.id}>
            <TableCell>
              <Link href={`/sessions/${session.id}`}>{`${session.date}`}</Link>
            </TableCell>
            <TableCell>{`${session.location}`}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SessionsList;
