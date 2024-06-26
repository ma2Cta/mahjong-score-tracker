"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Game } from "@/app/_types/game";
import useSWR, { mutate } from "swr";
import GameDetail from "@/app/_components/game/GameDetail";
import GameResult from "@/app/_components/game/GameResult";
import CreateRoundForm from "@/app/_components/round/CreateRoundForm";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import RoundList from "@/app/_components/round/RoundList";
import BreadCrumbs from "@/app/_components/ui/BreadCrumbs";
import DeleteGameButton from "@/app/_components/game/DeleteGameButton";

const GameDetailPage: React.FC = () => {
  const { setId: setIdStr, gameId: gameIdStr } = useParams();
  const setId = Number(setIdStr);
  const gameId = Number(gameIdStr);

  const [game, setGame] = useState<Game | null>(null);
  const { data, error, isLoading } = useSWR(
    setId && gameId ? `/api/sets/${setId}/games/${gameId}` : null,
  );

  useEffect(() => {
    if (data) {
      setGame(data);
    }
  }, [data]);

  if (!game || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div>
        <BreadCrumbs
          crumbs={[
            { name: "セット一覧", path: "/sets" },
            { name: "セット詳細", path: `/sets/${setId}` },
            { name: "ゲーム詳細", path: "" },
          ]}
        />
        <div className="flex justify-between items-center">
          <TypographyH2>ゲーム詳細</TypographyH2>
          <DeleteGameButton />
        </div>
        <GameDetail game={game} />
        <div className="font-semibold my-4">ラウンド</div>
        <div className="flex flex-row justify-between">
          <div className="flex-1 mr-4">
            <RoundList
              rounds={game.rounds ? game.rounds : []}
              setId={setId}
              gameId={game.id}
            />
          </div>
          <div className="flex-1">
            <CreateRoundForm
              onSuccess={() => mutate(`/api/sets/${setId}/games/${gameId}`)}
              lastRound={game?.rounds?.[game?.rounds?.length - 1] || null}
              users={game?.set?.users || []}
              basePoint={game?.set?.basePoint ?? 25000}
            />
          </div>
        </div>
        <div className="font-semibold my-4">ゲーム集計結果</div>
        <GameResult game={game} />
      </div>
    </>
  );
};

export default GameDetailPage;
