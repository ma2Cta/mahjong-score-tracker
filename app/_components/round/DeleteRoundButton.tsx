"use client";

import { Button } from "@/app/_components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const DeleteRoundButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const setId = Number(params.setId);
  const gameId = Number(params.gameId);
  const roundId = Number(params.roundId);

  const deleteRound = async () => {
    const response = await fetch(
      `/api/sets/${setId}/games/${gameId}/rounds/${roundId}`,
      {
        method: "DELETE",
        body: null,
      },
    );
    if (response.ok) {
      router.push(`/sets/${setId}/games/${gameId}`);
    }
  };
  return (
    <Button variant="destructive" onClick={() => deleteRound()}>
      ラウンドを削除
    </Button>
  );
};

export default DeleteRoundButton;
