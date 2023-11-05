"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Game } from "@/types/game";
import useSWR, { mutate } from "swr";
import GameDetail from "@/components/GameDetail";
import GameResult from "@/components/GameResult";
import { CreateRoundData } from "@/types/round";
import CreateRoundForm from "@/components/CreateRoundForm";
import TypographyH1 from "@/components/ui/TypographyH1";
import TypographyH2 from "@/components/ui/TypographyH2";

const GameDetailPage = () => {
  const router = useRouter();
  const { sessionId: sessionIdStr, gameId: gameIdStr } = useParams();
  const sessionId = Number(sessionIdStr);
  const gameId = Number(gameIdStr);

  const [game, setGame] = useState<Game | null>(null);
  const { data, error, isLoading } = useSWR(
    sessionId && gameId ? `/api/sessions/${sessionId}/games/${gameId}` : null
  );

  useEffect(() => {
    if (data) {
      setGame(data);
    }
  }, [data]);

  const deleteGame = async () => {
    if (!sessionId || !gameId) {
      return;
    }
    try {
      const response = await fetch(
        `/api/sessions/${sessionId}/games/${gameId}`,
        {
          method: "DELETE",
          body: null,
        }
      );
      if (response.ok) {
        // セッションが正常に削除された場合、ユーザーをセッション詳細ページにリダイレクトします。
        router.push(`/sessions/${sessionId}`);
      } else {
        // エラーメッセージを表示するなど、適切なエラーハンドリングを行います。
        console.error("Failed to delete game");
      }
    } catch (error) {
      // ネットワークエラーや、サーバーエラーのハンドリングを行います。
      console.error("Error occurred while deleting game:", error);
    }
  };

  const createRound = async (data: CreateRoundData) => {
    if (!sessionId || !gameId) {
      return;
    }
    try {
      const response = await fetch(
        `/api/sessions/${sessionId}/games/${gameId}/rounds`,
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        // ラウンドが正常に作成された場合、ゲームのデータを再取得します。
        mutate(`/api/sessions/${sessionId}/games/${gameId}`);
      } else {
        // エラーメッセージを表示するなど、適切なエラーハンドリングを行います。
        console.error("Failed to create round");
      }
    } catch (error) {
      // ネットワークエラーや、サーバーエラーのハンドリングを行います。
      console.error("Error occurred while creating round:", error);
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
        <TypographyH1>ゲーム詳細</TypographyH1>
        <GameDetail game={game} sessionId={sessionId} deleteGame={deleteGame} />
        <TypographyH2>ラウンドを作成</TypographyH2>
        <CreateRoundForm
          createRound={createRound}
          users={game?.session?.users || []}
        />
        <TypographyH2>ゲーム結果</TypographyH2>
        <GameResult game={game} />
      </div>
      <Link
        className="underline underline-offset-2"
        href={`/sessions/${sessionId}`}
      >
        セッション詳細に戻る
      </Link>
    </>
  );
};

export default GameDetailPage;