'use client'

import Link from "next/link";
import TypographyH1 from "@/components/ui/TypographyH1";

export default function Home() {
  return (
    <>
      <TypographyH1>mahjong score tracker</TypographyH1>
      <p>麻雀のスコアを記録するアプリです。</p>
      <Link href="/sessions">セッション一覧</Link>
    </>
  );
}
