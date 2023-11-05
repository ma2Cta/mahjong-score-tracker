import "@/styles/globals.css";
import Providers from "@/app/(auth)/providers";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav className="p-4">
          <Link href="/">
            <span className="text-3xl mr-1">🀙</span>
            <span className="text-xl font-bold">mahjong score tracker</span>
          </Link>
        </nav>
        <main className="px-8 pt-2">
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
