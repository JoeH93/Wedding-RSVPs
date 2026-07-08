"use client"
import { useState } from "react";
import Divider from "../Divider/Divider";


const FAQS = [
  {
    q: "Can I bring a plus-one?",
    a: "If your invite says +1, you're welcome to bring someone! If not, we're keeping it small and meaningful — thank you for understanding.",
  },
  {
    q: "Are kids invited?",
    a: "We love your littles, but this one's adults-only. Think: wine, dancing, and bedtimes way past 9pm.",
  },
  {
    q: "What should I wear?",
    a: "Garden party glam! Think cocktail attire you can move in. Comfy shoes encouraged for the lawn.",
  },
  {
    q: "Where should I park?",
    a: "There's a guest lot at the venue and plenty of rideshare drop-off space. Carpooling? Always a yes.",
  },
  {
    q: "Is it indoors or outdoors?",
    a: "Ceremony in the rose garden (fingers crossed for sunshine), followed by an indoor reception with plenty of dancing and dessert.",
  },
  {
    q: "What time should I arrive?",
    a: "Please plan to arrive by 4:15 PM — we're starting right at 4:30, and we don't want you to miss a thing.",
  },
];

export default function Section5() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 px-6 bg-[#F3ECE0]">
      <div className="max-w-2xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8A9A82] mb-3">
          Good to Know
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#2B2A28]">
          Frequently Asked Questions
        </h2>
        <Divider />

        <div className="text-left divide-y divide-[#2B2A28]/10">
          {FAQS.map((item, i) => {
            const isOpen = openIndex === i;
            return (
              <div key={item.q}>
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-lg text-[#2B2A28]">
                    {item.q}
                  </span>
                  <span
                    className={`text-[#B08D57] text-xl transition-transform ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <p className="text-[#2B2A28]/75 leading-relaxed pb-5 pr-8">
                    {item.a}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}