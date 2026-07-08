import Divider from "../Divider/Divider";


const MOMENTS = [
  {
    label: "How We Met",
    text: "It was a rainy Tuesday and neither of us planned on staying long — three hours and one closed café later, we were still talking.",
  },
  {
    label: "What Made It Click",
    text: "Somewhere between the terrible jokes and the very good arguments about pineapple on pizza, we realized we'd found someone worth keeping around.",
  },
  {
    label: "The Leap",
    text: "No grand plan — just a quiet certainty that grew louder every year, until one evening the question just had to be asked.",
  },
];

export default function Section3() {
  return (
    <section id="story" className="py-24 px-6 bg-[#F3ECE0]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8A9A82] mb-3">
          Our Story
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#2B2A28]">
          A Little Backstory
        </h2>

        <Divider />

        {/* couple photo placeholder */}
        <div className="w-full max-w-md mx-auto aspect-[4/5] rounded-lg bg-gradient-to-br from-[#8A9A82]/25 to-[#B08D57]/25 mb-16 flex items-center justify-center">
          <span className="text-[#2B2A28]/40 text-sm italic">
            couple photo goes here
          </span>
        </div>

        <div className="space-y-12 text-left">
          {MOMENTS.map((m, i) => (
            <div key={m.label} className="grid md:grid-cols-[auto_1fr] gap-6 items-start">
              <span className="font-serif italic text-3xl text-[#B08D57]">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className="font-serif text-xl text-[#2B2A28] mb-2">
                  {m.label}
                </h3>
                <p className="text-[#2B2A28]/75 leading-relaxed">{m.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}