"use client";

import React, { useEffect, useState } from "react";
import { Set } from "@/app/_types/set";
import Link from "next/link";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import PaginationDataTable from "@/app/_components/ui/PaginationDataTable";
import { User } from "@/app/_types/user";
import { UserName } from "@/app/_components/ui/UserName";
import useSWR from "swr";

const SetsList: React.FC = () => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 1,
    pageSize: 10,
  });
  const { data, isLoading } = useSWR(
    `/api/sets?page=${pageIndex}&size=${pageSize}`
  );
  const [sets, setSets] = useState<Set[]>([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  useEffect(() => {
    if (data) {
      setSets(data.sets);
      setTotalPageCount(data.totalPageCount);
    }
  }, [data]);

  const columns: ColumnDef<Set>[] = [
    {
      accessorKey: "startAt",
      header: "開始日時",
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
      <PaginationDataTable
        columns={columns}
        data={sets}
        suppressSelectedRowCount={true}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
        totalPageCount={totalPageCount}
      />
    </div>
  );
};

export default SetsList;
