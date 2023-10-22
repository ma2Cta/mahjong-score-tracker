import { User } from "@/types/user";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useState } from "react";

type CreateSessionFormProps = {
  users: User[];
  onSubmitSuccess: () => void;
};

const CreateSessionForm: React.FC<CreateSessionFormProps> = ({ users, onSubmitSuccess }) => {
  const [date, setDate] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value.split(",").filter((id) => id.length !== 0);
    setSelectedUserIds(selected);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ date, location, selectedUserIds }),
    });

    if (response.ok) {
      onSubmitSuccess();
    } else {
      // エラーハンドリング
    }
  };

  return (
    <form className="w-full max-w-lg container mx-auto" onSubmit={handleSubmit}>
      <Input
        className="mb-4 w-full"
        isRequired
        type="date"
        label="開催日"
        placeholder="開催日を入力してください。"
        value={date}
        onChange={(e) => setDate(e.target.value)}
      />
      <Input
        className="mb-4"
        isRequired
        type="text"
        label="開催場所"
        placeholder="開催場所を入力してください。"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <Select
        className="mb-4"
        isRequired
        selectionMode="multiple"
        label="参加者"
        placeholder="参加者を入力してください。"
        selectedKeys={selectedUserIds}
        onChange={handleUserChange}
      >
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </Select>
      <Button color="primary" type="submit">
        作成
      </Button>
    </form>
  );
};

export default CreateSessionForm;
