"use client";

import LogoutButton from "@/components/ui/LogoutButton";
import Link from "next/link";

const Header: React.FC = () => {
  return (
    <div className="flex items-center justify-between p-4">
      <Link className="flex items-center" href="/">
        <span className="text-3xl mr-1">🀙</span>
        <span className="text-xl font-bold">mahjong score tracker</span>
      </Link>
      <LogoutButton />
    </div>
  );
};

export default Header;
