import { useToast } from "@/app/_components/ui/use-toast";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createGameFormSchema } from "@/app/_components/game/CreateGameFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { roundLengthNames } from "@/app/_types/game";
import { Form } from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import RoundLengthInput from "@/app/_components/game/RoundLengthInput";

interface CreateGameFormProps {
  onSuccess: () => void;
}

const CreateGameForm: React.FC<CreateGameFormProps> = ({ onSuccess }) => {
  const { toast } = useToast();
  const { setId } = useParams();

  const form = useForm<z.infer<typeof createGameFormSchema>>({
    resolver: zodResolver(createGameFormSchema),
    defaultValues: {
      roundLength: 1,
    },
  });

  async function onSubmit(values: z.infer<typeof createGameFormSchema>) {
    const response = await fetch(`/api/sets/${setId}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        round: values.roundLength,
      }),
    });

    if (response.ok) {
      onSuccess();
      toast({
        title: "ゲームの作成に成功しました。",
        description: `${roundLengthNames(values.roundLength)}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <RoundLengthInput form={form} />
        <Button type="submit">作成</Button>
      </form>
    </Form>
  );
};

export default CreateGameForm;
