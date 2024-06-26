"use client";

import { Button } from "@/app/_components/ui/button";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return <Button onClick={() => signOut()}>ログアウト</Button>;
};

export default LogoutButton;
