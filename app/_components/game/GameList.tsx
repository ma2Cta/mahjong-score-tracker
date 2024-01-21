import React, { useEffect, useState } from "react";
import { Game, RoundLength, roundLengthNames } from "@/app/_types/game";
import Link from "next/link";
import { ColumnDef, PaginationState } from "@tanstack/react-table";
import PaginationDataTable from "@/app/_components/ui/PaginationDataTable";
import useSWR from "swr";

interface GameListProps {
  setId: number;
}

const GameList: React.FC<GameListProps> = ({ setId }) => {
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const { data, isLoading } = useSWR(
    `/api/sets/${setId}/games?page=${pageIndex + 1}&size=${pageSize}`
  );
  const [games, setGames] = useState<Game[]>([]);
  const [totalPageCount, setTotalPageCount] = useState(0);
  useEffect(() => {
    if (data) {
      setGames(data.games);
      setTotalPageCount(data.totalPageCount);
    }
  }, [data]);

  const columns: ColumnDef<Game>[] = [
    {
      accessorKey: "startAt",
      header: "開始日時",
      cell: ({ row }) => {
        const startAt = row.getValue("startAt") as string;
        return (
          <Link
            className="underline"
            href={`/sets/${setId}/games/${row.original.id}`}
          >
            {startAt}
          </Link>
        );
      },
    },
    {
      accessorKey: "roundLength",
      header: "何風戦",
      cell: ({ row }) => {
        const roundLength = row.getValue("roundLength") as RoundLength;
        return roundLengthNames(roundLength);
      },
    },
  ];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto">
      <PaginationDataTable
        columns={columns}
        data={games}
        suppressSelectedRowCount={true}
        pageIndex={pageIndex}
        pageSize={pageSize}
        setPagination={setPagination}
        totalPageCount={totalPageCount}
      />
    </div>
  );
};

export default GameList;
