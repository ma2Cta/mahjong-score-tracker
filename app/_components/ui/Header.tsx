"use client";

import { ModeToggle } from "@/app/_components/ui/ModeToggle";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/app/_components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/app/_components/ui/dropdown-menu";
import { UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-2xl font-bold mr-4">
              🀀 Mahjong Score Tracker
            </span>
          </Link>
          <div className="ml-4 text-muted-foreground hover:text-foreground">
            <Link href="/sets">セット一覧</Link>
          </div>
          <div className="ml-4 text-muted-foreground hover:text-foreground">
            <Link href="/score-tables">点数計算表</Link>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <ModeToggle />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="h-10 w-10 border flex items-center space-x-2 cursor-pointer hover:opacity-75">
                <AvatarImage
                  className="w-full h-full"
                  src={session?.user?.image ?? ""}
                />
                <AvatarFallback>
                  <UserIcon />
                </AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>
                <span>{session?.user?.name}</span>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  ログアウト
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </>
  );
};

export default Header;
