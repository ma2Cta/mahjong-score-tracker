"use client";

import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { createRoundFormSchema } from "@/app/_components/round/CreateRoundFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/_components/ui/select";
import { toWind } from "@/app/_types/round";

interface WindInputProps {
  form: UseFormReturn<z.infer<typeof createRoundFormSchema>>;
}

const WindInput: React.FC<WindInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="wind"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>風</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(parseInt(value, 10))}
            defaultValue={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger className="w-[60px]">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="0">{toWind(0)}</SelectItem>
              <SelectItem value="1">{toWind(1)}</SelectItem>
              <SelectItem value="2">{toWind(2)}</SelectItem>
              <SelectItem value="3">{toWind(3)}</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default WindInput;
