import ScrollVideo from "@/src/components/templates/home/ScrollVideo";
import ScrollDanggnServices from "@/src/components/templates/home/ScrollDanggnServices";
import ParallaxImages from "@/src/components/templates/home/ParallaxImages";
import DanggnBanner from "@/src/components/templates/home/DanggnBanner";

export const metadata = {
  title: "당근마켓",
};

// / Page 렌더링 방식 : SSG
// 변동되는 데이터 없음
export default function HomePage() {
  return (
    /* Main Page는 꽉찬 화면 구성을 위해 tailwind 커스텀 설정해놓은 layout 미사용 */
    <article className="bg-black">
      <DanggnBanner />
      <ScrollDanggnServices />
      <ScrollVideo />
      <ParallaxImages />
    </article>
  );
}
