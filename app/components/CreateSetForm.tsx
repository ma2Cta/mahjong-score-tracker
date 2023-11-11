"use client";

import { User } from "@/app/types/user";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/app/lib/utils";
import { MultiSelect, OptionType } from "@/app/components/ui/multi-select";

interface CreateSetFormProps {
  users: User[];
  onSuccess: () => void;
}

const CreateSetForm: React.FC<CreateSetFormProps> = ({ users, onSuccess }) => {
  const formSchema = z.object({
    date: z.date().min(new Date()),
    location: z.string().min(1).max(100),
    selectedUserIds: z.array(z.number().min(3).max(4)),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: new Date(),
      location: "",
      selectedUserIds: [],
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // const response = await fetch("/api/sets", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     date: values.date,
    //     location: values.location,
    //     selectedUserIds: values.selectedUserIds,
    //   }),
    // });

    // if (response.ok) {
    //   onSuccess();
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>開催日</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <div className="ml-auto h-4 w-4 opacity-50">🗓️</div>
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date > new Date() || date < new Date("1900-01-01")
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                セットの開催日を選択してください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>開催場所</FormLabel>
              <FormControl>
                <Input {...field} placeholder="場所を入力" />
              </FormControl>
              <FormDescription>
                セットの開催場所を入力してください。
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add selectedUserIds */}
        <Button type="submit">作成</Button>
      </form>
    </Form>
  );
};

export default CreateSetForm;
