import DataTable from "@/app/_components/ui/DataTable";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Round, roundNames } from "@/app/_types/round";
import { User } from "@/app/_types/user";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";

interface RoundListProps {
  rounds: Round[];
  setId: number;
  gameId: number;
}

const RoundList: React.FC<RoundListProps> = ({ rounds, setId, gameId }) => {
  const columns: ColumnDef<Round>[] = [
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
                <Avatar className="h-5 w-5 border flex mr-1">
                  <AvatarImage
                    className="w-full h-full"
                    src={score?.user?.image ?? ""}
                  />
                  <AvatarFallback>?</AvatarFallback>
                </Avatar>
                {score?.user?.name ?? ""}
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
      <DataTable columns={columns} data={rounds} />
    </div>
  );
};

export default RoundList;
