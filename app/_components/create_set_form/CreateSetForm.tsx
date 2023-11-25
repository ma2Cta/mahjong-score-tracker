"use client";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/_components/ui/button";
import { Form } from "@/app/_components/ui/form";
import { formSchema } from "@/app/_components/create_set_form/CrateSetFormSchema";
import DateInput from "@/app/_components/create_set_form/DateInput";
import LocationInput from "@/app/_components/create_set_form/LocationInput";
import SelectedUsersInput from "@/app/_components/create_set_form/SelectedUsersInput";

interface CreateSetFormProps {
  onSuccess: () => void;
}

const CreateSetForm: React.FC<CreateSetFormProps> = ({ onSuccess }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      location: "",
      selectedUsers: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const response = await fetch("/api/sets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        date: values.date,
        location: values.location,
        selectedUserIds: values.selectedUsers.map((user) => user.userId),
      }),
    });

    if (response.ok) {
      onSuccess();
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <DateInput form={form} />
        <LocationInput form={form} />
        <SelectedUsersInput form={form} />
        <Button type="submit">
          作成
        </Button>
      </form>
    </Form>
  );
};

export default CreateSetForm;
