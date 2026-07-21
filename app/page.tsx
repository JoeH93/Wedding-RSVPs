import BackgroundSlideshow from "@/components/BackgroundSlideShow/BackGroundSlideShow";
import Nav from "@/components/Navbar/Nav";
import Section1 from "@/components/pages/Section1";
import Section2 from "@/components/pages/Section2";
import Section3 from "@/components/pages/Section3";
import Section4 from "@/components/pages/Section4";
import Section5 from "@/components/pages/Section5";
import Section6 from "@/components/pages/Section6";

export default function Home() {
  return (
    <main className="relative">
      <BackgroundSlideshow />
 
      <div className="relative z-10">
        <Nav />
        <div className="flex flex-col gap-200 md:gap-16">
          <Section1 />
          <Section2 />
          <Section4 />
          <Section6 />
          <Section5 />
        </div>
      </div>
    </main>
  );
}