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

  return (
    <>
      <div>
        <h1>セッション詳細</h1>
        {session ? (
          <div>
            <div>開催日: {session.date}</div>
            <div>開催場所: {session.location}</div>
            <div>参加ユーザー: {session.participants.join(", ")}</div>
            <h2>ゲーム一覧</h2>
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
