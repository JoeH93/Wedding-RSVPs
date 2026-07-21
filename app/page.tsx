'use client'
import BackgroundSlideshow from "@/components/BackgroundSlideShow/BackGroundSlideShow";
import Nav from "@/components/Navbar/Nav";

// Intro with CountDown
import Section1 from "@/components/pages/Section1";

// When and Where with locations links
import Section2 from "@/components/pages/Section2";

// Back story: How they met? when? what made it click
import Section3 from "@/components/pages/Section3";

//Custom dedicated shoutout to the guest + Reservation + Gift Registery
import Section4 from "@/components/pages/Section4";

// Frequently asked questions
import Section5 from "@/components/pages/Section5";

// Photo Uploads on Drive Section
import Section6 from "@/components/pages/Section6";

// Dedicated standalone shoutout to the guests
import Section7 from "@/components/pages/Section7";

export default function Home() {

  return (
    <main className="relative">
      <BackgroundSlideshow />
 
      <div className="relative z-10">
        <Nav />
        <div className="flex flex-col gap-130 md:gap-16">
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