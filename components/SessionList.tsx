import React from "react";
import { Session } from "@/types/session";
import Link from "next/link";

type SessionListProps = {
  sessions: Session[];
};

const SessionsList: React.FC<SessionListProps> = ({ sessions }) => {
  if (!sessions) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {sessions.map((session) => (
        <li key={session.id}>
          <Link href={`/sessions/${session.id}`}>
            {`開催日: ${session.date}, 場所: ${session.location}`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SessionsList;
