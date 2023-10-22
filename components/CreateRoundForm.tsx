import { CreateRoundData, Wind, roundNames, toWind } from "@/types/round";
import { CreateScoreData } from "@/types/score";
import { User } from "@/types/user";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
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
  const [roundInWind, setRoundInWind] = useState<number>(1);
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
    <form className="w-full" onSubmit={handleSubmit}>
      <Select
        className="mb-4"
        isRequired
        label="風"
        placeholder="風を入力してください。"
        onChange={(e) => setWind(Number(e.target.value))}
      >
        {Object.values(Wind)
          .filter((value) => typeof value === "number")
          .map((windValue) => (
            <SelectItem key={windValue} value={windValue}>
              {toWind(windValue)}
            </SelectItem>
          ))}
      </Select>
      <Input
        className="mb-4"
        isRequired
        type="text"
        label="局"
        placeholder="局数を入力してください。"
        value={String(roundInWind)}
        onChange={(e) => setRoundInWind(Number(e.target.value))}
      />
      {users.map((user) => (
        <Input
          key={user.id}
          className="mb-4"
          isRequired
          type="text"
          label={`${user.name} のスコア`}
          value={String(
            scoreData.find((data) => data.userId === user.id)?.point || 0
          )}
          onChange={(e) => handleScoreChange(user.id, Number(e.target.value))}
        />
      ))}
      <Button color="primary" type="submit" onSubmit={handleSubmit}>
        ラウンドを作成
      </Button>
    </form>
  );
};

export default CreateRoundForm;
