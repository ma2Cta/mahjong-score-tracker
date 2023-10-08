import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Game, toGameRound, gameRoundNames } from "../../../../types/game";
import useSWR from "swr";

const GameDetail = () => {
  const router = useRouter();
  const { sessionId } = router.query;
  const { gameId } = router.query;

  const [game, setGame] = useState<Game | null>(null);
  const { data, error, isLoading } = useSWR(`/api/sessions/${sessionId}/games/${gameId}`);

  useEffect(() => {
    if (data) {
      setGame(data);
    }
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

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

  console.log(game);

  return (
    <>
      <div>
        <h1>ゲーム詳細</h1>
        {game ? (
          <div>
            <div>開催日: {game.date?.toString()}</div>
            <div>ゲーム数: {gameRoundNames(game.round)}</div>
            <button onClick={deleteGame}>ゲームを削除</button>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Link href={`/sessions/${sessionId}`}>セッション詳細に戻る</Link>
    </>
  );
};

export default GameDetail;
