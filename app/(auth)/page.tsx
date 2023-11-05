"use client";

import Link from "next/link";
import TypographyH1 from "@/components/ui/TypographyH1";

export default function Home() {
  return (
    <>
      <Link className="underline underline-offset-2" href="/sessions">
        セッション一覧
      </Link>
    </>
  );
}
