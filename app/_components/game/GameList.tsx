import React from "react";
import { Game, RoundLength, roundLengthNames } from "@/app/_types/game";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/app/_components/ui/DataTable";

interface GameListProps {
  games: Game[];
  setId: number;
}

const GameList: React.FC<GameListProps> = ({ games, setId }) => {
  if (!games) {
    return <div>Loading...</div>;
  }

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

  return (
    <div className="container mx-auto">
      <DataTable
        columns={columns}
        data={games}
        suppressSelectedRowCount={true}
      />
    </div>
  );
};

export default GameList;
