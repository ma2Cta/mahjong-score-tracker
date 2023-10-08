import { Session } from "@/types/session";
import React from "react";
import Link from "next/link";
import GameList from "@/components/GameList";

type SessionDetailProps = {
  session: Session;
  deleteSession: (sessionId: number) => void;
};

const SessionDetail: React.FC<SessionDetailProps> = ({
  session,
  deleteSession,
}) => {
  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>開催日: {session.date?.toString()}</div>
      <div>開催場所: {session.location}</div>
      <div>
        参加ユーザー: {session.users?.map((user) => user.name).join(", ")}
      </div>
      <button onClick={() => deleteSession(session.id)}>
        セッションを削除
      </button>
      <h2>ゲーム一覧</h2>
      <Link href={`/sessions/${session.id}/games/create`}>ゲームを作成</Link>
      <GameList sessionId={session.id} />
    </div>
  );
};

export default SessionDetail;
