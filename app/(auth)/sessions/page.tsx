"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Session } from "@/types/session";
import useSWR, { mutate } from "swr";
import SessionList from "@/components/SessionList";
import TypographyH1 from "@/components/ui/TypographyH1";

const Sessions: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/sessions");
  const [sessions, setSessions] = useState<Session[]>([]);
  useEffect(() => {
    if (data) {
      setSessions(data.sessions);
    }
    mutate("/api/sessions");
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <TypographyH1>セッション一覧</TypographyH1>
      <Link className="underline underline-offset-2" href="/sessions/create">
        新しいセッションを作成
      </Link>
      <SessionList sessions={sessions} />
      <Link className="underline underline-offset-2" href="/">
        トップページに戻る
      </Link>
    </div>
  );
};

export default Sessions;
