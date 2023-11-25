"use client";

import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "@/app/_components/create_set_form/CrateSetFormSchema";
import { Calendar } from "@/app/_components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/app/_lib/utils";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/app/_components/ui/popover";
import { Button } from "@/app/_components/ui/button";

interface DateInputProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const DateInput: React.FC<DateInputProps> = ({ form }) => {
  return (
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
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default DateInput;
