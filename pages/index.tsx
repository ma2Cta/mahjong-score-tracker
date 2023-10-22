import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { Link } from "@nextui-org/react";

export default function Home() {
  return (
    <>
      <main className="p-10">
        <h1 className="text-4xl font-bold my-4">mahjong score tracker</h1>
        <Link href="/sessions">セッション一覧</Link>
      </main>
    </>
  );
}
