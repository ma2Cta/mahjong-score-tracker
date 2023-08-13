import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

const CreateSession: React.FC = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, location }),
    });

    if (response.ok) {
      // 成功したら一覧ページにリダイレクト
      router.push("/sessions");
    } else {
      // エラーハンドリング
    }
  };

  return (
    <>
      <h1>新しいセッションを作成</h1>
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
        <button type="submit">作成</button>
      </form>
      <Link href="/sessions">一覧に戻る</Link>
    </>
  );
};

export default CreateSession;
