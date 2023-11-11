"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User } from "@/app/types/user";
import useSWR from "swr";
import TypographyH2 from "@/app/components/ui/TypographyH2";
import CreateSetForm from "@/app/components/CreateSetForm";

const CreateSet: React.FC = () => {
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);
  const router = useRouter();
  const { data, error, isLoading } = useSWR("/api/users");

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  if (!users || isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <TypographyH2>新しいセットを作成</TypographyH2>
          <Link className="underline underline-offset-2" href="/sets">
            一覧に戻る
          </Link>
        </div>
      </div>
      <div className="my-4">
        <CreateSetForm users={users} onSuccess={() => router.push("/sets")}/>
      </div>
      {/* <form onSubmit={handleSubmit}>
        <label>
          開催日:
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </label>
        <label>
          開催場所:
          <Input
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
      </form> */}
    </>
  );
};

export default CreateSet;
