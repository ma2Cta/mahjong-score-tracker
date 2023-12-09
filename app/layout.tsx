import Providers from "@/app/providers";
import "@/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahjong Score Tracker",
  description: "麻雀の戦績を記録するためのアプリケーションです。",
  icons:
    "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text x='50%' y='50%' style='dominant-baseline:central;text-anchor:middle;font-size:80px;stroke:white;stroke-width:2px;'>🀀️</text></svg>",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
