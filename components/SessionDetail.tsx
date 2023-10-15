import { Session } from "@/types/session";
import React from "react";
import Link from "next/link";
import GameList from "@/components/GameList";
import { Game } from "@/types/game";

type SessionDetailProps = {
  session: Session;
  games: Game[];
  deleteSession: (sessionId: number) => void;
};

const SessionDetail: React.FC<SessionDetailProps> = ({
  session,
  games,
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
      <GameList games={games} sessionId={session.id} />
    </div>
  );
};

export default SessionDetail;