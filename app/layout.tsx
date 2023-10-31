import '@/styles/globals.css'
import Providers from "@/app/providers";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="p-8">
        <main>
          <Providers>{children}</Providers>
        </main>
      </body>
    </html>
  );
}
