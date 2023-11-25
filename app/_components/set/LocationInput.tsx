"use client";

import { UseFormReturn } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "@/app/_components/set/CrateSetFormSchema";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import React from "react";
import { Input } from "@/app/_components/ui/input";

interface LocationInputProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const LocationInput: React.FC<LocationInputProps> = ({ form }) => {
  return (
    <FormField
      control={form.control}
      name="location"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>開催場所</FormLabel>
          <FormControl>
            <Input {...field} placeholder="場所を入力" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default LocationInput;
