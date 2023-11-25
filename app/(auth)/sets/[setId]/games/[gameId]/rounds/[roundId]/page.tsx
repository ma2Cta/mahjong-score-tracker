"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import useSWR from "swr";
import RoundDetail from "@/app/_components/round/RoundDetail";
import { Round } from "@/app/_types/round";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import { Button } from "@/app/_components/ui/button";
import ScoreList from "@/app/_components/score/ScoreList";

const RoundDetailPage = () => {
  const router = useRouter();
  const {
    setId: setIdStr,
    gameId: gameIdStr,
    roundId: roundIdStr,
  } = useParams();
  const setId = Number(setIdStr);
  const gameId = Number(gameIdStr);
  const roundId = Number(roundIdStr);

  const [round, setRound] = useState<Round | null>(null);
  const { data, error, isLoading } = useSWR(
    setId && gameId && roundId
      ? `/api/sets/${setId}/games/${gameId}/rounds/${roundId}`
      : null
  );

  useEffect(() => {
    if (data) {
      setRound(data);
    }
  }, [data]);

  const deleteRound = async () => {
    if (!setId || !gameId || !roundId) {
      return;
    }
    try {
      const response = await fetch(
        `/api/sets/${setId}/games/${gameId}/rounds/${roundId}`,
        {
          method: "DELETE",
          body: null,
        }
      );
      if (response.ok) {
        router.push(`/sets/${setId}/games/${gameId}`);
      } else {
        console.error("Failed to delete round");
      }
    } catch (error) {
      console.error("Error occurred while deleting round:", error);
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
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <TypographyH2>ラウンド詳細</TypographyH2>
          <Link
            className="underline underline-offset-2"
            href={`/sets/${setId}/games/${gameId}`}
          >
            ゲーム詳細に戻る
          </Link>
        </div>
        <Button variant="destructive" onClick={() => deleteRound()}>
          ラウンドを削除
        </Button>
      </div>
      <RoundDetail round={round} deleteRound={deleteRound} />
      <div className="font-semibold my-4">スコア一覧</div>
      <ScoreList scores={round.scores} />
    </>
  );
};

export default RoundDetailPage;
