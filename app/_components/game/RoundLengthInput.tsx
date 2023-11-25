"use client";

import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { createGameFormSchema } from "@/app/_components/game/CreateGameFormSchema";
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
import { roundLengthNames } from "@/app/_types/game";

interface RoundLengthInputProps {
  form: UseFormReturn<z.infer<typeof createGameFormSchema>>;
}

const RoundLengthInput: React.FC<RoundLengthInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="roundLength"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>何風戦</FormLabel>
          <Select
            onValueChange={(value) => field.onChange(parseInt(value, 10))}
            defaultValue={field.value.toString()}
          >
            <FormControl>
              <SelectTrigger className="w-[240px]">
                <SelectValue />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              <SelectItem value="1">{roundLengthNames(1)}</SelectItem>
              <SelectItem value="2">{roundLengthNames(2)}</SelectItem>
              <SelectItem value="4">{roundLengthNames(4)}</SelectItem>
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RoundLengthInput;
