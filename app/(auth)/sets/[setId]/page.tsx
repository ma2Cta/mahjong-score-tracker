"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Set } from "@/app/types/set";
import useSWR, { mutate } from "swr";
import SetDetail from "@/app/components/SetDetail";
import TypographyH2 from "@/app/components/ui/TypographyH2";
import { Button } from "@/app/components/ui/button";
import GameList from "@/app/components/GameList";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/app/components/ui/accordion";

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
      <Accordion className="my-6" type="single" collapsible>
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <div className="font-semibold">ゲーム一覧</div>
          </AccordionTrigger>
          <AccordionContent>
            <GameList games={set.games ? set.games : []} setId={set.id} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <Link href={`/sets/${set.id}/games/create`}>
        <Button>ゲームを作成</Button>
      </Link>
    </>
  );
};

export default SetDetailPage;
