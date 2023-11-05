"use client";

import Link from "next/link";

export default function Home() {
  return (
    <>
      <Link className="underline underline-offset-2" href="/sets">
        セット一覧
      </Link>
    </>
  );
}
