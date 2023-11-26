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
      accessorKey: "roundLength",
      header: "何風戦",
      cell: ({ row }) => {
        const roundLength = row.getValue("roundLength") as RoundLength;
        return (
          <Link
            className="underline underline-offset-2"
            href={`/sets/${setId}/games/${row.original.id}`}
          >
            {roundLengthNames(roundLength)}
          </Link>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <DataTable columns={columns} data={games} />
    </div>
  );
};

export default GameList;
