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
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Header: React.FC = () => {
  const { data: session } = useSession();

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">
            <span className="text-4xl mr-2">🀙</span>
            <span className="text-3xl font-bold">Mahjong Score Tracker</span>
          </Link>
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
                <AvatarFallback>?</AvatarFallback>
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
