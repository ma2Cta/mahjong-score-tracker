import { Button, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

interface CreateGameFormProps {
  sessionId: number;
  onSubmitSuccess: () => void;
}

const CreateGameForm: React.FC<CreateGameFormProps> = ({
  sessionId,
  onSubmitSuccess
}) => {
  const [roundLength, setRoundLength] = useState<string | number>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/sessions/${sessionId}/games`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          round: roundLength,
        }),
      });

      if (!response.ok) {
        const message = await response.text();
        throw new Error(message || "Failed to create game");
      }

      if (response.ok) {
        onSubmitSuccess();
      }
    } catch (error) {
      console.error("Error creating game:", error);
      alert("Error creating game. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        className="mb-4"
        isRequired
        label="何風戦"
        placeholder="選択してください。"
        onChange={(e) => setRoundLength(Number(e.target.value))}
      >
        <SelectItem key={1} value={1}>東風戦</SelectItem>
        <SelectItem key={2} value={2}>半荘戦</SelectItem>
        <SelectItem key={4} value={4}>全風戦</SelectItem>
      </Select>
      <Button color="primary" type="submit">ゲームを作成する</Button>
    </form>
  );
};

export default CreateGameForm;
