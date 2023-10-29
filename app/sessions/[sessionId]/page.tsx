'use client'

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Session } from "@/types/session";
import useSWR, { mutate } from "swr";
import SessionDetail from "@/components/SessionDetail";

const SessionDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const sessionId = Number(params.sessionId);

  const [session, setSession] = useState<Session | null>(null);
  const { data, error, isLoading } = useSWR(
    sessionId ? `/api/sessions/${sessionId}` : null
  );

  useEffect(() => {
    if (data) {
      setSession(data as Session);
    }
    mutate(`/api/sessions/${sessionId}`);
  }, [sessionId, data]);

  const deleteSession = async () => {
    if (!sessionId) {
      return
    }
    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: 'DELETE',
        body: null
      });
      if (response.ok) {
        // セッションが正常に削除された場合、ユーザーをセッション一覧ページにリダイレクトします。
        router.push('/sessions');
      } else {
        // エラーメッセージを表示するなど、適切なエラーハンドリングを行います。
        console.error('Failed to delete session');
      }
    } catch (error) {
      // ネットワークエラーや、サーバーエラーのハンドリングを行います。
      console.error('Error occurred while deleting session:', error);
    }
  };

  if (!session || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h1>セッション詳細</h1>
        <SessionDetail session={session} games={session.games ? session.games : []} deleteSession={deleteSession} />
      </div>
      <Link href="/sessions">セッション一覧に戻る</Link>
    </>
  );
};

export default SessionDetailPage;
