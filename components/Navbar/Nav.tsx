"use client"
import { useEffect, useState } from "react";

const LINKS = [
  { href: "#home", label: "Home" },
  { href: "#details", label: "Details" },
  { href: "#story", label: "Our Story" },
  { href: "#rsvp", label: "RSVP" },
  { href: "#faq", label: "FAQ" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-[#FBF7F0]/95 backdrop-blur shadow-sm py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6">
        <span className="font-serif italic text-lg text-[#2B2A28] tracking-wide">J &amp; Y</span>

        <div className="hidden md:flex gap-8">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm uppercase tracking-[0.15em] text-[#2B2A28] hover:text-[#B08D57] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </div>

        <button
          className="md:hidden text-[#2B2A28]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current mb-1.5" />
          <span className="block w-6 h-px bg-current" />
        </button>
      </div>

      {open && (
        <div className="md:hidden flex flex-col items-center gap-4 mt-6 pb-6">
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm uppercase tracking-[0.15em] text-[#2B2A28]"
            >
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}