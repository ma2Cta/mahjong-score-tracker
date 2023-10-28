import Link from "next/link";

export default function Home() {
  return (
    <>
      <main>
        <h1 className="text-3xl font-bold underline">mahjong score tracker</h1>
        <p>麻雀のスコアを記録するアプリです。</p>
        <Link href="/sessions">セッション一覧</Link>
      </main>
    </>
  );
}
