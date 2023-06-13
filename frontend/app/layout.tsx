import Header from "@/src/components/templates/layout/Header";
import "./globals.css";
import "./tailwind.css";
import Recoil from "@/src/providers/recoil";
import ReactQuery from "@/src/providers/react-query";
import { Noto_Sans_KR, Montserrat } from "next/font/google";
import { Metadata } from "next";
import ReactHotToast from "@/src/providers/hot-toast";
import Footer from "@/src/components/templates/layout/Footer";
import ImagePreLoader from "@/src/providers/ImagePreLoader";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  variable: "--font-noto-sans-kr",
  weight: "500",
});
const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: {
    default: "당근마켓 채용 by 성준",
    template: "%s | 당근마켓 by 성준",
  },
  description: "당근마켓 채용 페이지입니다.",
  icons: {
    icon: "/danggn/danggn.ico",
  },
};

// Main Layout 페이지
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${montserrat.variable} ${notoSansKr.variable} `}>
        <Recoil>
          <ReactQuery>
            <ImagePreLoader>
              <Header />

              {/* 반응형 사이즈 지정 */}
              <main className={`w-full overflow-x-hidden min-h-screen`}>
                {children}
              </main>
              <hr className="w-full h-px mt-24 bg-danggn-lightgray" />
              <Footer />
            </ImagePreLoader>
          </ReactQuery>
        </Recoil>
        <ReactHotToast />
      </body>
    </html>
  );
}
