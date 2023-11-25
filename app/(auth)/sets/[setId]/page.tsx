"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Set } from "@/app/_types/set";
import useSWR, { mutate } from "swr";
import SetDetail from "@/app/_components/set/SetDetail";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import { Button } from "@/app/_components/ui/button";
import GameList from "@/app/_components/game/GameList";
import CreateGameForm from "@/app/_components/game/CreateGameForm";

const SetDetailPage = () => {
  const router = useRouter();
  const params = useParams();
  const setId = Number(params.setId);

  const [set, setSet] = useState<Set | null>(null);
  const { data, error, isLoading } = useSWR(
    setId ? `/api/sets/${setId}` : null
  );

  useEffect(() => {
    if (data) {
      setSet(data as Set);
    }
    mutate(`/api/sets/${setId}`);
  }, [setId, data]);

  const deleteSet = async () => {
    if (!setId) {
      return;
    }
    try {
      const response = await fetch(`/api/sets/${setId}`, {
        method: "DELETE",
        body: null,
      });
      if (response.ok) {
        // セットが正常に削除された場合、ユーザーをセット一覧ページにリダイレクトします。
        router.push("/sets");
      } else {
        // エラーメッセージを表示するなど、適切なエラーハンドリングを行います。
        console.error("Failed to delete set");
      }
    } catch (error) {
      // ネットワークエラーや、サーバーエラーのハンドリングを行います。
      console.error("Error occurred while deleting set:", error);
    }
  };

  if (!set || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <TypographyH2>セット詳細</TypographyH2>
          <Link className="underline underline-offset-2" href="/sets">
            セット一覧に戻る
          </Link>
        </div>
        <Button variant="destructive" onClick={() => deleteSet()}>
          セットを削除
        </Button>
      </div>
      <SetDetail set={set} />
      <div className="font-semibold my-4">ゲーム</div>
      <div className="flex flex-row justify-between">
        <div className="flex-1 mr-4">
          <GameList games={set.games ? set.games : []} setId={set.id} />
        </div>
        <div className="flex-1">
          <CreateGameForm onSuccess={() => mutate(`/api/sets/${setId}`)} />
        </div>
      </div>
    </>
  );
};

export default SetDetailPage;
