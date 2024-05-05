"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { createSetFormSchema } from "@/app/_components/set/CreateSetFormSchema";
import DateInput from "@/app/_components/set/DateInput";
import LocationInput from "@/app/_components/set/LocationInput";
import SelectedUsersInput from "@/app/_components/set/SelectedUsersInput";
import { useToast } from "@/app/_components/ui/use-toast";
import TimeInput from "@/app/_components/set/TimeInput";
import React from "react";
import BasePointInput from "@/app/_components/set/BasePointInput";

interface CreateSetFormProps {
  onSuccess: () => void;
  isThree: boolean;
}

const CreateSetForm: React.FC<CreateSetFormProps> = ({
  onSuccess,
  isThree,
}) => {
  const { toast } = useToast();
  const now = new Date();
  const form = useForm<z.infer<typeof createSetFormSchema>>({
    resolver: zodResolver(createSetFormSchema),
    defaultValues: {
      date: now,
      hour: now.getHours(),
      minute: now.getMinutes(),
      second: now.getSeconds(),
      location: "",
      selectedUsers: [],
      isThree: isThree,
      basePoint: isThree ? 35000 : 25000
    },
  });

  async function onSubmit(values: z.infer<typeof createSetFormSchema>) {
    const startAt = new Date(values.date);
    startAt.setHours(values.hour, values.minute, values.second);
    const response = await fetch("/api/sets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        startAt: startAt,
        location: values.location,
        isThree: isThree,
        selectedUserIds: values.selectedUsers.map((user) => user.userId),
        basePoint: values.basePoint,
      }),
    });

    if (response.ok) {
      onSuccess();
      toast({
        title: "セットの作成に成功しました。",
        description: `${startAt}`,
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-end">
          <DateInput form={form} />
          <div className="ml-4">
            <TimeInput form={form} />
          </div>
        </div>
        <LocationInput form={form} />
        <BasePointInput form={form} />
        <SelectedUsersInput form={form} isThree={isThree} />
        <Button type="submit">作成</Button>
      </form>
    </Form>
  );
};

export default CreateSetForm;
