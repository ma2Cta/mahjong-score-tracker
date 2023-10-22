import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Divider, Link } from "@nextui-org/react";
import useSWR from "swr";
import RoundDetail from "@/components/RoundDetail";
import { Round } from "@/types/round";
import RoundResult from "@/components/GameResult";
import ScoreList from "@/components/ScoreList";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

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
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold my-4">ラウンド詳細</h1>
        <Button color="danger" onClick={deleteRound}>ラウンドを削除</Button>
      </div>
      <RoundDetail round={round} />
      <Divider className="my-4" />
      <ScoreList scores={round.scores} />
      <Divider className="my-4" />
      <Link href={`/sessions/${sessionId}/games/${gameId}`}>ゲーム詳細に戻る</Link>
    </div>
  );
};

export default RoundDetailPage;
