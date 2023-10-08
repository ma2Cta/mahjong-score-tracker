import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Session } from "../types/session";
import useSWR from "swr";

const SessionsList: React.FC = () => {
  const { data, error, isLoading } = useSWR('/api/sessions');
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => { 
    if (data) {
      setSessions(data.sessions);
    }
  }, [data]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  console.log(sessions);
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
