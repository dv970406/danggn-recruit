import PostItem from "@/src/components/organisms/qna/QnAItem";
import Danggn3D from "@/src/components/templates/home/Danggn3D";
import ImageArea from "@/src/components/templates/home/TeamMateImageArea";
import ScrollServiceList from "@/src/components/templates/home/ScrollServiceList";
import ScrollVideo from "@/src/components/templates/home/ScrollVideo";
import TeamMateImageArea from "@/src/components/templates/home/TeamMateImageArea";

export const metadata = {
  title: "구구가가",
};

export default function HomePage() {
  return (
    /* 여러 페이지중 HomePage만 꽉찬 화먼으로 구성하기 위해 absolute 부여 */
    <article className="bg-black">
      <Danggn3D />
      <ScrollServiceList />
      <ScrollVideo />
      <TeamMateImageArea />
    </article>
  );
}
