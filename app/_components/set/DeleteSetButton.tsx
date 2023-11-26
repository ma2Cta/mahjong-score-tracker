"use client";

import { Button } from "@/app/_components/ui/button";
import { useParams, useRouter } from "next/navigation";

const DeleteSetButton: React.FC = () => {
  const router = useRouter();
  const params = useParams();
  const setId = Number(params.setId);

  const deleteSet = async () => {
    const response = await fetch(`/api/sets/${setId}`, {
      method: "DELETE",
      body: null,
    });
    if (response.ok) {
      router.push("/sets");
    }
  };

  return (
    <Button variant="destructive" onClick={() => deleteSet()}>
      セットを削除
    </Button>
  );
};

export default DeleteSetButton;
