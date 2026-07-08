"use client"
import Countdown from "../Countdown/Countdown";

export default function Section1() {
  return (
    <section
      id="home"
      className="relative flex flex-col items-center justify-center text-center min-h-screen w-full px-6 bg-[#FBF7F0] overflow-hidden"
    >
      {/* soft background accents */}
      <div className="pointer-events-none absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#8A9A82]/10 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#B08D57]/10 blur-3xl" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8A9A82] mb-6">
          {/* replace with your wedding date */}
          Save the Date &middot; October 24, 2026
        </p>

        <h1 className="font-serif text-4xl md:text-6xl leading-tight text-[#2B2A28]">
          Our next adventure begins&hellip;
        </h1>
        <h2 className="font-serif italic text-2xl md:text-3xl text-[#B08D57] mt-3">
          and you&apos;re invited!
        </h2>

        <p className="mt-8 text-[#2B2A28]/80 leading-relaxed max-w-xl mx-auto">
          We&apos;ve laughed, cried, danced in the kitchen, and dreamed of this
          moment for a long time. Now we can&apos;t wait to share it with the
          people we love most&mdash;you. Let the countdown begin.
        </p>

        <div className="mt-10">
          <Countdown />
        </div>

        <div className="mt-10">
          <a
            href="#rsvp"
            className="inline-block bg-[#2B2A28] text-[#FBF7F0] px-8 py-3 uppercase tracking-[0.15em] text-sm hover:bg-[#B08D57] transition-colors"
          >
            Reserve Your Place
          </a>
        </div>
      </div>

      <a
        href="#details"
        className="absolute bottom-8 text-[#2B2A28]/50 text-xs uppercase tracking-[0.2em] animate-bounce"
        aria-label="Scroll to details"
      >
        Scroll
      </a>
    </section>
  );
}