"use client";

import React, { useEffect, useState } from "react";
import { Set } from "@/app/_types/set";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/app/_components/ui/DataTable";
import { User } from "@/app/_types/user";
import { UserName } from "@/app/_components/ui/UserName";
import useSWR from "swr";

const SetsList: React.FC = () => {
  const { data, isLoading } = useSWR("/api/sets");
  const [sets, setSets] = useState<Set[]>([]);
  useEffect(() => {
    if (data) {
      setSets(data.sets);
    }
  }, [data]);

  const columns: ColumnDef<Set>[] = [
    {
      accessorKey: "startAt",
      header: "開催日時",
      cell: ({ row }) => {
        const startAt = row.getValue("startAt") as string;
        return (
          <Link className="underline" href={`/sets/${row.original.id}`}>
            {startAt}
          </Link>
        );
      },
    },
    {
      accessorKey: "location",
      header: "開催場所",
    },
    {
      accessorKey: "users",
      header: "参加ユーザー",
      cell: ({ row }) => {
        const users = row.getValue("users") as User[];
        return users.map((user) => {
          return (
            <div key={user.id}>
              <UserName name={user.name} image={user.image ?? ""} />
            </div>
          );
        });
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-4">
      <DataTable columns={columns} data={sets} />
    </div>
  );
};

export default SetsList;
