import React, { useState, useEffect } from "react";
import { Divider, Link } from "@nextui-org/react";
import { User } from "@/types/user";
import useSWR from "swr";
import CreateSessionForm from "@/components/CreateSessionForm";
import { useRouter } from "next/router";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const CreateSession: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const { data, error, isLoading } = useSWR("/api/users");

  const router = useRouter();

  useEffect(() => {
    if (data) {
      setUsers(data.users);
    }
  }, [data]);

  if (!users || isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const onSubmitSuccessHandler = () => router.push("/sessions");

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold my-4">新しいセッションを作成</h1>
      <CreateSessionForm users={users} onSubmitSuccess={onSubmitSuccessHandler}/>
      <Divider className="my-4" />
      <Link href="/sessions">一覧に戻る</Link>
    </div>
  );
};

export default CreateSession;
