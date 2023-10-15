import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import RoundDetail from "@/components/RoundDetail";
import { Round } from "@/types/round";

const RoundDetailPage = () => {
  const router = useRouter();
  const { sessionId:sessionIdStr, gameId: gameIdStr, roundId: roundIdStr } = router.query;
  const sessionId = Number(sessionIdStr);
  const gameId = Number(gameIdStr);
  const roundId = Number(roundIdStr);

  const [round, setRound] = useState<Round | null>(null);
  const { data, error, isLoading } = useSWR(
    (sessionId && gameId && roundId) ? `/api/sessions/${sessionId}/games/${gameId}/rounds/${roundId}` : null
  );

  useEffect(() => {
    if (data) {
      setRound(data);
    }
  }, [data]);

  const deleteRound = async () => {
    if (!sessionId || !gameId || !roundId) {
      return
    }
    try {
      const response = await fetch(`/api/sessions/${sessionId}/games/${gameId}/rounds/${roundId}`, {
        method: 'DELETE',
        body: null
      });
      if (response.ok) {
        router.push(`/sessions/${sessionId}/games/${gameId}`);
      } else {
        console.error('Failed to delete round');
      }
    } catch (error) {
      console.error('Error occurred while deleting round:', error);
    }
  };

  if (!round || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <h1>ラウンド詳細</h1>
        <RoundDetail round={round} deleteRound={deleteRound} />
      </div>
      <Link href={`/sessions/${sessionId}/games/${gameId}`}>ゲーム詳細に戻る</Link>
    </>
  );
};

export default RoundDetailPage;
