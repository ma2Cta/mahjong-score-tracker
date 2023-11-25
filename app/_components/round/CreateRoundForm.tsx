"use client";

import { Round, roundNames } from "@/app/_types/round";
import { User } from "@/app/_types/user";
import { useToast } from "@/app/_components/ui/use-toast";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { createGameFormSchema } from "@/app/_components/game/CreateGameFormSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/app/_components/ui/form";
import { Button } from "@/app/_components/ui/button";
import { createRoundFormSchema } from "@/app/_components/round/CreateRoundFormSchema";
import WindInput from "@/app/_components/round/WindInput";
import RoundInWindInput from "@/app/_components/round/RoundInWindInput";
import ScoresInput from "@/app/_components/round/ScoresInput";

type CreateRoundFormProps = {
  onSuccess: () => void;
  lastRound: Round | null;
  users: User[];
};

const CreateRoundForm: React.FC<CreateRoundFormProps> = ({
  onSuccess,
  lastRound,
  users,
}) => {
  const { toast } = useToast();
  const { setId, gameId } = useParams();

  const scoresDefaultValue = users.map((user) => ({
    userId: user.id,
    point: lastRound
      ? lastRound.scores.find((score) => score?.user?.id === user.id)?.point
      : 25000,
  }));
  const form = useForm<z.infer<typeof createRoundFormSchema>>({
    resolver: zodResolver(createRoundFormSchema),
    defaultValues: {
      wind: lastRound ? lastRound.wind : 0,
      roundInWind: lastRound ? lastRound.roundInWind + 1 : 1,
      scores: scoresDefaultValue,
    },
  });

  async function onSubmit(values: z.infer<typeof createRoundFormSchema>) {
    const response = await fetch(`/api/sets/${setId}/games/${gameId}/rounds`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wind: values.wind,
        roundInWind: values.roundInWind,
        scores: values.scores,
      }),
    });

    if (response.ok) {
      onSuccess();
      toast({
        title: "ラウンドの作成に成功しました。",
        description: `${roundNames(values.wind, values.roundInWind)}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-start">
          <div className="mr-4">
            <WindInput form={form} />
          </div>
          <div>
            <RoundInWindInput form={form} />
          </div>
        </div>
        <ScoresInput form={form} users={users} />
        <Button type="submit">作成</Button>
      </form>
    </Form>
  );
};

export default CreateRoundForm;
