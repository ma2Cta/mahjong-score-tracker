import { Set } from "@/types/set";
import React from "react";
import Link from "next/link";
import GameList from "@/components/GameList";
import { Game } from "@/types/game";
import { Button } from "@/components/ui/button";
import TypographyH2 from "@/components/ui/TypographyH2";

type SetDetailProps = {
  set: Set;
  games: Game[];
  deleteSet: (setId: number) => void;
};

const SetDetail: React.FC<SetDetailProps> = ({
  set,
  games,
  deleteSet,
}) => {
  if (!set) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>開催日: {set.date?.toString()}</div>
      <div>開催場所: {set.location}</div>
      <div>
        参加ユーザー: {set.users?.map((user) => user.name).join(", ")}
      </div>
      <Button onClick={() => deleteSet(set.id)}>
        セットを削除
      </Button>
      <TypographyH2>ゲーム一覧</TypographyH2>
      <Link
        className="underline underline-offset-2"
        href={`/sets/${set.id}/games/create`}
      >
        ゲームを作成
      </Link>
      <GameList games={games} setId={set.id} />
    </div>
  );
};

export default SetDetail;
