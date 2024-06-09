import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

import Layout from "@/components/common/layout";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "스미스 - 병역 특례 채용 공고",
  description: "병역 특례 채용 공고를 확인하세요.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <body className={roboto.className}>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
