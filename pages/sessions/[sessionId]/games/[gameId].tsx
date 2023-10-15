import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Game, roundLengthNames } from "../../../../types/game";
import useSWR from "swr";
import GameDetail from "@/components/GameDetail";

const GameDetailPage = () => {
  const router = useRouter();
  const { sessionId: sessionIdStr, gameId: gameIdStr } = router.query;
  const sessionId = Number(sessionIdStr);
  const gameId = Number(gameIdStr);

  const [game, setGame] = useState<Game | null>(null);
  const { data, error, isLoading } = useSWR(
    (sessionId && gameId) ? `/api/sessions/${sessionId}/games/${gameId}` : null
  );
  
  useEffect(() => {
    if (data) {
      setGame(data);
    }
  }, [data]);

  const deleteGame = async () => {
    if (!sessionId || !gameId) {
      return
    }
    try {
      const response = await fetch(`/api/sessions/${sessionId}/games/${gameId}`, {
        method: 'DELETE',
        body: null
      });
      if (response.ok) {
        // セッションが正常に削除された場合、ユーザーをセッション詳細ページにリダイレクトします。
        router.push(`/sessions/${sessionId}`);
      } else {
        // エラーメッセージを表示するなど、適切なエラーハンドリングを行います。
        console.error('Failed to delete game');
      }
    } catch (error) {
      // ネットワークエラーや、サーバーエラーのハンドリングを行います。
      console.error('Error occurred while deleting game:', error);
    }
  };

  if (!game || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h1>ゲーム詳細</h1>
        <GameDetail game={game} sessionId={sessionId} deleteGame={deleteGame} />
      </div>
      <Link href={`/sessions/${sessionId}`}>セッション詳細に戻る</Link>
    </>
  );
};

export default GameDetailPage;
