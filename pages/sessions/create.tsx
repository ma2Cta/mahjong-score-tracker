import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { User } from "../../types/user";

type UserListResponse = {
  users: User[];
}

const fetchUsers = async (): Promise<UserListResponse> => {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }
  return response.json() as Promise<UserListResponse>;
};


const CreateSession: React.FC = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const router = useRouter();

  useEffect(() => {
    // コンポーネントのマウント時にユーザー一覧を取得
    fetchUsers().then(response => {
      setUsers(response.users);
    }).catch(error => {
      console.error("Failed to fetch users:", error);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, location, selectedUserIds }),
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
      <Link href="/sessions">一覧に戻る</Link>
    </>
  );
};

export default CreateSession;
