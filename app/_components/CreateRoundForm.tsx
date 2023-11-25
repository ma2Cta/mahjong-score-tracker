import { CreateRoundData, Wind, roundNames, toWind } from "@/app/_types/round";
import { CreateScoreData } from "@/app/_types/score";
import { User } from "@/app/_types/user";
import { useState } from "react";

type CreateRoundFormProps = {
  createRound: (roundData: CreateRoundData) => void;
  users: User[];
};

const CreateRoundForm: React.FC<CreateRoundFormProps> = ({
  createRound,
  users,
}) => {
  const [wind, setWind] = useState<number>(0);
  const [roundInWind, setRoundInWind] = useState<number>(0);
  const [scoreData, setScoreData] = useState<CreateScoreData[]>([]);
  
  const handleScoreChange = (userId: number, newScore: number) => {
    const existingScoreData = scoreData.find((data) => data.userId === userId);
  
    if (existingScoreData) {
      setScoreData(
        scoreData.map((data) =>
          data.userId === userId ? { ...data, point: newScore } : data
        )
      );
    } else {
      setScoreData([...scoreData, { userId, point: newScore }]);
    }
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    if (wind === null || roundInWind === null) {
      return;
    }

    const createRoundData = {
      wind: wind,
      roundInWind: roundInWind,
      scores: scoreData,
    };
    await createRound(createRoundData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        <select value={wind} onChange={(e) => setWind(Number(e.target.value))}>
          {Object.values(Wind)
            .filter((value) => typeof value === "number")
            .map((windValue) => (
              <option key={windValue} value={windValue}>
                {toWind(windValue)}
              </option>
            ))}
        </select>
      </label>
      <label>
        <input
          type="text"
          value={roundInWind}
          onChange={(e) => setRoundInWind(Number(e.target.value))}
        />
        局
      </label>
      {users.map((user) => (
        <div key={user.id}>
          <label>
            {user.name} のスコア:
            <input
              type="text"
              value={
                scoreData.find((data) => data.userId === user.id)?.point || 0
              }
              onChange={(e) =>
                handleScoreChange(user.id, Number(e.target.value))
              }
            />
          </label>
        </div>
      ))}
      <button type="submit">ラウンドを作成</button>
    </form>
  );
};

export default CreateRoundForm;
