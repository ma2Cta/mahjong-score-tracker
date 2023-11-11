import Providers from "@/app/providers";
import "@/styles/globals.css";
import { type Metadata } from "next";

export const metadata: Metadata = {
  title: "Mahjong Score Tracker",
  description: "麻雀の戦績を記録するためのアプリケーションです。",
  icons:
    "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text x=%2250%%22 y=%2250%%22 style=%22dominant-baseline:central;text-anchor:middle;font-size:90px;%22>🀄️</text></svg>",
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
