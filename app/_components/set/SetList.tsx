"use client";

import React from "react";
import { Set } from "@/app/_types/set";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/app/_components/ui/DataTable";
import { User } from "@/app/_types/user";

type SetListProps = {
  sets: Set[];
};

const columns: ColumnDef<Set>[] = [
  {
    accessorKey: "id",
    header: "ID"
  },
  {
    accessorKey: "date",
    header: "開催日時",
    cell: ({ row }) => {
      const date = row.getValue("date") as string;
      return <Link className="underline" href={`/sets/${row.getValue("id")}`}>{date}</Link>
    }
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
      return users.map(user => user.name).join(', ')
    }
  },
];

const SetsList: React.FC<SetListProps> = ({ sets }) => {
  if (!sets) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto my-4">
      <DataTable columns={columns} data={sets} />
    </div>
  );
};

export default SetsList;