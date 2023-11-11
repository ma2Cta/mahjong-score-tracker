import React from "react";
import { Score } from "@/app/types/score";

type ScoreListProps = {
  scores: Score[];
};

const SetsList: React.FC<ScoreListProps> = ({ scores }) => {
  if (!scores) {
    return <div>Loading...</div>;
  }

  return (
    <ul>
      {scores.map((score) => (
        <li key={score.id}>
          {`名前: ${score.user?.name}, 点数: ${score.point}`}
        </li>
      ))}
    </ul>
  );
};

export default SetsList;
