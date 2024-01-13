import PaginationDataTable from "@/app/_components/ui/PaginationDataTable";
import { UserName } from "@/app/_components/ui/UserName";
import { Round, roundNames } from "@/app/_types/round";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React from "react";

interface RoundListProps {
  rounds: Round[];
  setId: number;
  gameId: number;
}

const RoundList: React.FC<RoundListProps> = ({ rounds, setId, gameId }) => {
  const columns: ColumnDef<Round>[] = [
    {
      accessorKey: "round",
      header: "何戦目",
    },
    {
      accessorKey: "name",
      header: "第何局",
      cell: ({ row }) => {
        return (
          <Link
            className="underline underline-offset-2"
            href={`/sets/${setId}/games/${gameId}/rounds/${row.original.id}`}
          >
            {roundNames(row.original.wind, row.original.roundInWind)}
          </Link>
        );
      },
    },
    {
      accessorKey: "users",
      header: () => <div className="text-right">ユーザー</div>,
      cell: ({ row }) => {
        return (
          <>
            {row.original.scores.map((score) => (
              <div key={score.id} className="flex justify-end border-b-2">
                <UserName
                  name={score?.user?.name ?? ""}
                  image={score?.user?.image ?? ""}
                />
              </div>
            ))}
          </>
        );
      },
    },
    {
      accessorKey: "scores",
      header: "スコア",
      cell: ({ row }) => {
        return (
          <>
            {row.original.scores.map((score) => (
              <>
                <div className="border-b-2">{score.point}</div>
              </>
            ))}
          </>
        );
      },
    },
  ];
  if (!rounds) {
    return <div>Loading...</div>;
  }

  rounds.forEach((round) => {
    round.scores.sort((a, b) => {
      return b.id - a.id;
    });
  });

  return (
    <div className="container mx-auto">
      <PaginationDataTable
        columns={columns}
        data={rounds}
        suppressSelectedRowCount={true}
      />
    </div>
  );
};

export default RoundList;
