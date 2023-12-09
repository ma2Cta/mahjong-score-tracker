"use client";

import { UseFormReturn, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { createRoundFormSchema } from "@/app/_components/round/CreateRoundFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { User } from "@/app/_types/user";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { UserName } from "@/app/_components/ui/UserName";
import React from "react";

interface ScoresInputProps {
  form: UseFormReturn<z.infer<typeof createRoundFormSchema>>;
  users: User[];
}

const ScoresInput: React.FC<ScoresInputProps> = ({ form, users }) => {
  const { fields } = useFieldArray({
    control: form.control,
    name: "scores",
  });

  // フィールドを2つずつのペアに分割
  const fieldPairs = [];
  for (let i = 0; i < fields.length; i += 2) {
    fieldPairs.push(fields.slice(i, i + 2));
  }

  return (
    <div>
      {fieldPairs.map((pair, pairIndex) => (
        <div key={pairIndex} className="flex justify-start mb-4">
          {pair.map((field, index) => {
            const userName =
              users.find((user) => user.id === field.userId)?.name ?? "";
            const userImage =
              users.find((user) => user.id === field.userId)?.image ?? "";
            return (
              <FormField
                control={form.control}
                name={`scores.${pairIndex * 2 + index}.point`}
                key={field.id}
                render={({ field: renderField }) => (
                  <FormItem className="flex-1 mr-4 flex flex-col">
                    <FormLabel>
                      <UserName
                        name={`${userName}のスコア`}
                        image={userImage}
                      />
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...renderField}
                        type="number"
                        onChange={(e) => {
                          const value = e.target.value;
                          const numberValue =
                            value === "" ? null : Number(value);
                          renderField.onChange(numberValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default ScoresInput;
