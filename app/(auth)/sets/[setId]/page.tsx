"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Set } from "@/app/_types/set";
import useSWR, { mutate } from "swr";
import SetDetail from "@/app/_components/set/SetDetail";
import TypographyH2 from "@/app/_components/ui/TypographyH2";
import GameList from "@/app/_components/game/GameList";
import CreateGameForm from "@/app/_components/game/CreateGameForm";
import BreadCrumbs from "@/app/_components/ui/BreadCrumbs";
import DeleteSetButton from "@/app/_components/set/DeleteSetButton";

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

  if (!set || isLoading) {
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
          { name: "セット詳細", path: "" },
        ]}
      />
      <div className="flex justify-between items-center">
        <TypographyH2>セット詳細</TypographyH2>
        <DeleteSetButton />
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
