"use client";

import PaginationDataTable from "@/app/_components/ui/PaginationDataTable";
import { User } from "@/app/_types/user";
import { ColumnDef } from "@tanstack/react-table";
import React, { useEffect, useState } from "react";
import useSWR from "swr";

interface UserSearchTableProps {
  searchName: string;
  userSearchTableColumns: ColumnDef<User>[];
}

const UserSearchTable: React.FC<UserSearchTableProps> = ({
  searchName,
  userSearchTableColumns,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const { data, error, isLoading } = useSWR(`/api/users?name=${searchName}`);

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
    <PaginationDataTable
      columns={userSearchTableColumns}
      data={users}
      suppressSelectedRowCount={true}
    />
  );
};

export default UserSearchTable;
