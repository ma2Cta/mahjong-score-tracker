"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Set } from "@/app/_types/set";
import useSWR, { mutate } from "swr";
import SetList from "@/app/_components/set/SetList";
import { Button } from "@/app/_components/ui/button";
import TypographyH2 from "@/app/_components/ui/TypographyH2";

const Sets: React.FC = () => {
  const { data, error, isLoading } = useSWR("/api/sets");
  const [sets, setSets] = useState<Set[]>([]);
  useEffect(() => {
    if (data) {
      setSets(data.sets);
    }
    mutate("/api/sets");
  }, [data]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center">
        <TypographyH2>セット一覧</TypographyH2>
        <Link href="/sets/create">
          <Button>新しいセットを作成</Button>
        </Link>
      </div>
      <SetList sets={sets} />
    </div>
  );
};

export default Sets;
