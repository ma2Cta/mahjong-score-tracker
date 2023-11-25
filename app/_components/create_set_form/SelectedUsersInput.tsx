"use client";

import { Controller, UseFormReturn, useFieldArray } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "@/app/_components/create_set_form/CrateSetFormSchema";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/_components/ui/form";
import React, { useEffect, useState } from "react";
import { Input } from "@/app/_components/ui/input";
import { ArrowRightIcon } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/app/_components/ui/table";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import { Button } from "@/app/_components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { User } from "@/app/_types/user";
import UserSearchTable from "@/app/_components/create_set_form/UserSearchTable";

interface SelectedUsersInputProps {
  form: UseFormReturn<z.infer<typeof formSchema>>;
}

const SelectedUsersInput: React.FC<SelectedUsersInputProps> = ({ form }) => {
  const [userSearchName, setUserSearchName] = useState<string>("");
  const [debouncedSearchName, setDebouncedSearchName] = useState<string>("");
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "selectedUsers",
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchName(userSearchName);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [userSearchName]);

  const userSearchTableColumns: ColumnDef<User>[] = [
    {
      header: " ",
      cell: ({ row }) => {
        return (
          <Avatar className="h-10 w-10 border flex">
            <AvatarImage
              className="w-full h-full"
              src={row.original.image ?? ""}
            />
            <AvatarFallback>?</AvatarFallback>
          </Avatar>
        );
      },
    },
    {
      accessorKey: "name",
      header: "Name",
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;
        return (
          <Button type="button" variant="outline" onClick={() => addUser(user)}>
            追加
          </Button>
        );
      },
    },
  ];

  const addUser = (user: User) => {
    fields.some((field: any) => field.userId === user.id) ||
      append({
        userId: user.id,
        name: user.name,
        image: user.image,
      });
  };

  return (
    <FormField
      control={form.control}
      name="selectedUsers"
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>参加者</FormLabel>
          <FormDescription>参加者を検索して追加してください。</FormDescription>
          <div className="flex items-center py-4">
            <Input
              placeholder="Nameで検索"
              className="max-w-sm mr-4"
              onChange={(e) => {
                e.preventDefault();
                setUserSearchName(e.target.value);
              }}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault(); // フォームの送信を防ぐ
                }
              }}
            />
          </div>
          <div className="flex items-center">
            <div className="flex-1">
              <UserSearchTable
                searchName={debouncedSearchName}
                userSearchTableColumns={userSearchTableColumns}
              />
            </div>
            <div className="flex-shrink-0">
              <ArrowRightIcon className="w-8 h-8 mx-auto" />
            </div>
            <div className="flex-1">
              <FormControl>
                <Table className="rounded-md border">
                  <TableHeader>
                    <TableRow>
                      <TableHead> </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead> </TableHead>
                      <TableHead className="w-1"> </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {fields.map((field, index) => {
                      return (
                        <TableRow key={field.id}>
                          <Controller
                            control={form.control}
                            name={`selectedUsers.${index}.userId`}
                            render={({ field: renderField }) => {
                              return (
                                <>
                                  <TableCell>
                                    <Avatar className="h-10 w-10 border flex">
                                      <AvatarImage
                                        className="w-full h-full"
                                        src={field.image ?? ""}
                                      />
                                      <AvatarFallback>?</AvatarFallback>
                                    </Avatar>
                                  </TableCell>
                                  <TableCell>{field.name}</TableCell>
                                  <TableCell>
                                    <Button
                                      type="button"
                                      variant="outline"
                                      onClick={() => remove(index)}
                                    >
                                      削除
                                    </Button>
                                  </TableCell>
                                  <TableCell>
                                    <Input {...renderField} type="hidden" />
                                  </TableCell>
                                </>
                              );
                            }}
                          />
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </FormControl>
            </div>
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default SelectedUsersInput;
