import React, { useEffect, useState } from "react";
import { Link, Button, Divider } from "@nextui-org/react";
import { Session } from "@/types/session";
import useSWR, { mutate } from "swr";
import SessionList from "@/components/SessionList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold my-4">セッション一覧</h1>
        <Link href="/sessions/create">
          <Button color="primary">新しいセッションを作成</Button>
        </Link>
      </div>
      <SessionList sessions={sessions} />
      <Divider className="my-4" />
      <Link href="/">トップページに戻る</Link>
    </div>
  );
};

export default Sessions;
