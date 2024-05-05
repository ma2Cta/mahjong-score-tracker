"use client";

import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { createSetFormSchema } from "@/app/_components/set/CreateSetFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import React from "react";
import { Input } from "@/app/_components/ui/input";

interface BasePointInputProps {
  form: UseFormReturn<z.infer<typeof createSetFormSchema>>;
}

const BasePointInput: React.FC<BasePointInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="basePoint"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>素点</FormLabel>
          <FormControl>
            <Input
              {...field}
              placeholder="素点を入力"
              type="number"
              onChange={(e) => {
                const value = e.target.value;
                const numberValue =
                  value === "" ? null : Number(value);
                field.onChange(numberValue);
              }}/>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default BasePointInput;
