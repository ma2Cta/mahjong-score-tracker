import React from "react";
import { Set } from "@/types/set";
import Link from "next/link";

type SetListProps = {
  sets: Set[];
};

const SetsList: React.FC<SetListProps> = ({ sets }) => {
  if (!sets) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {sets.map((set) => (
        <li key={set.id}>
          <Link
            className="underline underline-offset-2"
            href={`/sets/${set.id}`}
          >
            {`開催日: ${set.date}, 場所: ${set.location}`}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default SetsList;
