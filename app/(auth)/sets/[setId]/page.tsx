'use client'

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Set } from "@/types/set";
import useSWR, { mutate } from "swr";
import SetDetail from "@/components/SetDetail";
import TypographyH1 from "@/components/ui/TypographyH1";

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
      return
    }
    try {
      const response = await fetch(`/api/sets/${setId}`, {
        method: 'DELETE',
        body: null
      });
      if (response.ok) {
        // セットが正常に削除された場合、ユーザーをセット一覧ページにリダイレクトします。
        router.push('/sets');
      } else {
        // エラーメッセージを表示するなど、適切なエラーハンドリングを行います。
        console.error('Failed to delete set');
      }
    } catch (error) {
      // ネットワークエラーや、サーバーエラーのハンドリングを行います。
      console.error('Error occurred while deleting set:', error);
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
      <div>
        <TypographyH1>セット詳細</TypographyH1>
        <SetDetail set={set} games={set.games ? set.games : []} deleteSet={deleteSet} />
      </div>
      <Link className="underline underline-offset-2" href="/sets">セット一覧に戻る</Link>
    </>
  );
};

export default SetDetailPage;
