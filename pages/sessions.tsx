import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Session } from "@/types/session";
import useSWR, { mutate } from "swr";
import SessionList from "@/components/SessionList";

const Sessions: React.FC = () => {
  const { data, error, isLoading } = useSWR('/api/sessions');
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => { 
    if (data) {
      setSessions(data.sessions);
    }
    mutate('/api/sessions');
  }, [data]); 

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <h1>セッション一覧</h1>
      <Link href="/sessions/create">新しいセッションを作成</Link>
      <SessionList sessions={sessions} />
      <Link href="/">トップページに戻る</Link>
    </div>
  );
};

export default Sessions;
