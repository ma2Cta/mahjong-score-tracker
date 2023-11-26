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
import { Input } from "@/app/_components/ui/input";

interface RoundInWindInputProps {
  form: UseFormReturn<z.infer<typeof createRoundFormSchema>>;
}

const RoundInWindInput: React.FC<RoundInWindInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="roundInWind"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>局</FormLabel>
          <FormControl>
            <Input {...field} type="number" className="w-[60px]" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default RoundInWindInput;
