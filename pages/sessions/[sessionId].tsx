// pages/sessions/[id].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Session } from "../../types/session";
import GameList from "../../components/GameList";

const SessionDetail = () => {
  const router = useRouter();
  const { sessionId } = router.query;

  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    if (sessionId) {
      fetch(`/api/sessions/${sessionId}`)
        .then((res) => res.json())
        .then(setSession);
    }
  }, [sessionId]);

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

  return (
    <>
      <div>
        <h1>セッション詳細</h1>
        {session ? (
          <div>
            <div>開催日: {session.date?.toString()}</div>
            <div>開催場所: {session.location}</div>
            <div>
              参加ユーザー: {session.users?.map((user) => user.name).join(", ")}
            </div>
            <button onClick={deleteSession}>セッションを削除</button>
            <h2>ゲーム一覧</h2>
            <Link href={`/sessions/${session.id}/games/create`}>ゲームを作成</Link>
            <GameList sessionId={session.id} />
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Link href="/sessions">セッション一覧に戻る</Link>
    </>
  );
};

export default SessionDetail;
