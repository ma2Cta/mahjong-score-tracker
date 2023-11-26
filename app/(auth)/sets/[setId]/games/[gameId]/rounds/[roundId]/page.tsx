"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import RoundDetail from "@/app/_components/round/RoundDetail";
import { Round } from "@/app/_types/round";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import ScoreList from "@/app/_components/score/ScoreList";
import BreadCrumbs from "@/app/_components/ui/BreadCrumbs";
import DeleteRoundButton from "@/app/_components/round/DeleteRoundButton";

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

  if (!round || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <BreadCrumbs
        crumbs={[
          { name: "セット一覧", path: "/sets" },
          { name: "セット詳細", path: `/sets/${setId}` },
          { name: "ゲーム詳細", path: `/sets/${setId}/games/${gameId}` },
          { name: "ラウンド詳細", path: "" },
        ]}
      />
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <TypographyH2>ラウンド詳細</TypographyH2>
        </div>
        <DeleteRoundButton />
      </div>
      <RoundDetail round={round} />
      <div className="font-semibold my-4">スコア一覧</div>
      <ScoreList scores={round.scores} />
    </>
  );
};

export default RoundDetailPage;
