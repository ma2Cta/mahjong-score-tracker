import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Divider, Link } from "@nextui-org/react";
import { Game } from "@/types/game";
import useSWR, { mutate } from "swr";
import GameDetail from "@/components/GameDetail";
import GameResult from "@/components/GameResult";
import { CreateRoundData } from "@/types/round";
import CreateRoundForm from "@/components/CreateRoundForm";
import RoundList from "@/components/RoundList";
import Container from "@/components/ui/Container";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const GameDetailPage = () => {
  const router = useRouter();
  const { sessionId: sessionIdStr, gameId: gameIdStr } = router.query;
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
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <div className="flex justify-between items-center">
        <h1 className="text-4xl font-bold my-4">ゲーム詳細</h1>
        <Button color="danger" onClick={deleteGame}>
          ゲームを削除
        </Button>
      </div>
      <GameDetail game={game} sessionId={sessionId} />
      <Container title="ラウンド一覧">
        <RoundList
          rounds={game.rounds ? game.rounds : []}
          sessionId={sessionId}
          gameId={game.id}
        />
      </Container>
      <Divider className="my-4" />
      <Container title="ラウンドを作成">
        <CreateRoundForm
          createRound={createRound}
          users={game?.session?.users || []}
        />
      </Container>
      <Container title="ゲーム結果">
        <GameResult game={game} />
      </Container>
      <Divider className="my-4" />
      <Link href={`/sessions/${sessionId}`}>セッション詳細に戻る</Link>
    </div>
  );
};

export default GameDetailPage;
