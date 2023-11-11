'use client'

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/user";
import useSWR, { mutate } from "swr";
import TypographyH1 from "@/app/components/ui/TypographyH1";

const CreateSet: React.FC = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const router = useRouter();
  const { data, error, isLoading } = useSWR('/api/users');

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/sets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, location, selectedUserIds }),
    });

    if (response.ok) {
      // 成功したら一覧ページにリダイレクト
      router.push("/sets");
    } else {
      // エラーハンドリング
    }
  };

  if (!users || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <TypographyH1>新しいセットを作成</TypographyH1>
      <form onSubmit={handleSubmit}>
        <label>
          開催日:
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          開催場所:
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <label>
          参加者:
          <select multiple onChange={(e) => {
            const selectedOptions = Array.from(e.target.selectedOptions);
            setSelectedUserIds(selectedOptions.map(option => option.value));
          }}>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">作成</button>
      </form>
      <Link className="underline underline-offset-2" href="/sets">一覧に戻る</Link>
    </>
  );
};

export default CreateSet;
