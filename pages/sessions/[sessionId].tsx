import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Link, Button, Divider } from "@nextui-org/react";
import { Session } from "@/types/session";
import useSWR, { mutate } from "swr";
import SessionDetail from "@/components/SessionDetail";
import GameList from "@/components/GameList";
import CreateGameForm from "@/components/CreateGameForm";
import Container from "@/components/ui/Container";

const SessionDetailPage = () => {
  const router = useRouter();
  const { sessionId: sessionIdStr } = router.query;
  const sessionId = Number(sessionIdStr);

  const [session, setSession] = useState<Session | null>(null);
  const { data, error, isLoading } = useSWR(
    sessionId ? `/api/sessions/${sessionId}` : null
  );

  useEffect(() => {
    if (data) {
      setSession(data as Session);
    }
    mutate(`/api/sessions/${sessionId}`);
  }, [sessionId, data]);

  const deleteSession = async () => {
    if (!sessionId) {
      return;
    }
    try {
      const response = await fetch(`/api/sessions/${sessionId}`, {
        method: "DELETE",
        body: null,
      });
      if (response.ok) {
        // セッションが正常に削除された場合、ユーザーをセッション一覧ページにリダイレクトします。
        router.push("/sessions");
      } else {
        // エラーメッセージを表示するなど、適切なエラーハンドリングを行います。
        console.error("Failed to delete session");
      }
    } catch (error) {
      // ネットワークエラーや、サーバーエラーのハンドリングを行います。
      console.error("Error occurred while deleting session:", error);
    }
  };

  if (!session || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="p-10">
      <div>
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold my-4">セッション詳細</h1>
          <Button color="danger" onClick={() => deleteSession()}>
            セッションを削除
          </Button>
        </div>
        <SessionDetail
          session={session}
          games={session.games ? session.games : []}
        />
      </div>

      <Container title="ゲーム一覧">
        <GameList
          games={session.games ? session.games : []}
          sessionId={session.id}
        />
      </Container>
      <Container title="新規ゲーム作成">
        <CreateGameForm
          sessionId={session.id}
          onSubmitSuccess={() => mutate(`/api/sessions/${sessionId}`)}
        />
      </Container>
      <Divider className="my-4" />
      <Link href="/sessions">セッション一覧に戻る</Link>
    </div>
  );
};

export default SessionDetailPage;
