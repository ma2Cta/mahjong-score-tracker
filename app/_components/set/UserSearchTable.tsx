"use client";

import PaginationDataTable from "@/app/_components/ui/PaginationDataTable";
import { User } from "@/app/_types/user";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
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
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [users, setUsers] = useState<User[]>([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  const { data, error, isLoading } = useSWR(
    `/api/users?name=${searchName}&page=${pageIndex + 1}&size=${pageSize}`
  );

  useEffect(() => {
    if (data) {
      setUsers(data.users);
      setTotalPageCount(data.totalPageCount);
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
      pageIndex={pageIndex}
      pageSize={pageSize}
      setPagination={setPagination}
      totalPageCount={totalPageCount}
    />
  );
};

export default UserSearchTable;
