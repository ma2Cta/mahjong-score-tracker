import { Session } from "@/types/session";
import React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  Divider,
} from "@nextui-org/react";
import GameList from "@/components/GameList";
import { Game } from "@/types/game";
import CreateGameForm from "@/components/CreateGameForm";

type SessionDetailProps = {
  session: Session;
  games: Game[];
};

const SessionDetail: React.FC<SessionDetailProps> = ({ session, games }) => {
  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Table removeWrapper className="my-4" isStriped>
        <TableHeader>
          <TableColumn>開催日</TableColumn>
          <TableColumn>開催場所</TableColumn>
          <TableColumn>参加ユーザー</TableColumn>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>{session.date?.toString()}</TableCell>
            <TableCell>{session.location}</TableCell>
            <TableCell>
              {session.users?.map((user) => user.name).join(", ")}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default SessionDetail;
