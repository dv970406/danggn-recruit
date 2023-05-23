import Header from "@/src/components/templates/layout/Header";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "구구가가 채용",
    template: "%s | 구구가가",
  },
  description: "구구가가 채용 페이지입니다.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="overflow-x-hidden overflow-y-auto">
        <Header />
        {/* 반응형 사이즈 지정 */}
        <main className={`w-full`}>{children}</main>
      </body>
    </html>
  );
}
