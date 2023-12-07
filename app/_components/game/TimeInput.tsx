"use client";

import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { createGameFormSchema } from "@/app/_components/game/CreateGameFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/app/_components/ui/form";
import React from "react";
import { Input } from "@/app/_components/ui/input";

interface TimeInputProps {
  form: UseFormReturn<z.infer<typeof createGameFormSchema>>;
}

const TimeInput: React.FC<TimeInputProps> = ({ form }) => {
  return (
    <div className="flex items-center">
      <FormField
        control={form.control}
        name="hour"
        render={({ field }) => (
          <FormItem className="flex flex-col mr-2">
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="時"
                className="w-[60px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <span>:</span>
      <FormField
        control={form.control}
        name="minute"
        render={({ field }) => (
          <FormItem className="flex flex-col mx-2">
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="分"
                className="w-[60px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <span>:</span>
      <FormField
        control={form.control}
        name="second"
        render={({ field }) => (
          <FormItem className="flex flex-col ml-2">
            <FormControl>
              <Input
                {...field}
                type="number"
                placeholder="秒"
                className="w-[60px]"
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default TimeInput;
