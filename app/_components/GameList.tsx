import React from "react";
import { Game, RoundLength, roundLengthNames } from "@/app/_types/game";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import DataTable from "@/app/_components/ui/DataTable";

interface GameListProps {
  games: Game[];
  setId: number;
}

const columns: ColumnDef<GameWithURL>[] = [
  {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "roundLength",
    header: "何風戦",
    cell: ({ row }) => {
      const roundLength = row.getValue("roundLength") as RoundLength;
      return (
        <Link
          className="underline underline-offset-2"
          href={row.original.url}
        >
          {roundLengthNames(roundLength)}
        </Link>
      );
    },
  }
];

interface GameWithURL extends Game {
  url: string;
}

const GameList: React.FC<GameListProps> = ({ games, setId }) => {
  if (!games) {
    return <div>Loading...</div>;
  }

  const gamesWithURL = games.map((game) => {
    return {
      ...game,
      url: `/sets/${setId}/games/${game.id}`,
    };
  });

  return (
    <div className="container mx-auto my-4">
      <DataTable columns={columns} data={gamesWithURL} />
    </div>
  );
};

export default GameList;
