import Nav from "@/components/Navbar/Nav";
import Section1 from "@/components/pages/Section1";
import Section2 from "@/components/pages/Section2";
import Section3 from "@/components/pages/Section3";
import Section4 from "@/components/pages/Section4";
import Section5 from "@/components/pages/Section5";

export default function Home() {
  return (
    <main>
      <Nav />
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
    </main>
  );
}