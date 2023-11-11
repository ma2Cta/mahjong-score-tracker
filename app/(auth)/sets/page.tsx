"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Set } from "@/app/types/set";
import useSWR, { mutate } from "swr";
import SetList from "@/app/components/SetList";
import TypographyH1 from "@/app/components/ui/TypographyH1";

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
      <TypographyH1>セット一覧</TypographyH1>
      <Link className="underline underline-offset-2" href="/sets/create">
        新しいセットを作成
      </Link>
      <SetList sets={sets} />
      <Link className="underline underline-offset-2" href="/">
        トップページに戻る
      </Link>
    </div>
  );
};

export default Sets;
