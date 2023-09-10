import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Session } from "../types/session";

type SessionListResponse = {
  sessions: Session[];
}

const fetchSessions = async (): Promise<SessionListResponse> => {
  const response = await fetch("/api/sessions");
  if (!response.ok) {
    throw new Error("Failed to fetch sessions");
  }
  return response.json() as Promise<SessionListResponse>;
};

const SessionsList: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => { 
    fetchSessions()
      .then((resp) => setSessions(resp.sessions))
      .catch((err) => console.error(err));
  }, []); 

  return (
    <div>
      <h1>セッション一覧</h1>
      <Link href="/sessions/create">新しいセッションを作成</Link>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            <Link href={`/sessions/${session.id}`}>
              {`開催日: ${session.date}, 場所: ${session.location}`}
            </Link>
          </li>
        ))}
      </ul>
      <Link href="/">トップページに戻る</Link>
    </div>
  );
};

export default SessionsList;
