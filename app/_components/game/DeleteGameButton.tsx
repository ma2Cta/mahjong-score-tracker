"use client";

import { Button } from "@/app/_components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React from "react";

const DeleteGameButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const setId = Number(params.setId);
  const gameId = Number(params.gameId);

  const deleteGame = async () => {
    const response = await fetch(`/api/sets/${setId}/games/${gameId}`, {
      method: "DELETE",
      body: null,
    });
    if (response.ok) {
      router.push(`/sets/${setId}`);
    }
  };

  return (
    <Button variant="destructive" onClick={() => deleteGame()}>
      ゲームを削除
    </Button>
  );
};

export default DeleteGameButton;
