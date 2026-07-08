import Divider from "../Divider/Divider";


const DETAILS = [
  {
    label: "Ceremony",
    time: "4:30 PM",
    venue: "The Rose Garden, Aurora Estate",
    note: "Arrive by 4:15 PM — seating is unassigned.",
  },
  {
    label: "Cocktail Hour",
    time: "5:15 PM",
    venue: "The Terrace, Aurora Estate",
    note: "Drinks, bites, and a live trio.",
  },
  {
    label: "Reception",
    time: "6:30 PM",
    venue: "The Grand Hall, Aurora Estate",
    note: "Dinner, speeches, and dancing until midnight.",
  },
];

export default function Section2() {
  return (
    <section id="details" className="py-24 px-6 bg-[#FBF7F0]">
      <div className="max-w-4xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8A9A82] mb-3">
          The Details
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#2B2A28]">
          When &amp; Where
        </h2>

        <Divider />

        {/* itinerary */}
        <div className="grid md:grid-cols-3 gap-8 text-left mt-4">
          {DETAILS.map((d) => (
            <div
              key={d.label}
              className="border border-[#B08D57]/25 rounded-lg p-6 bg-white/40"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-[#B08D57] mb-2">
                {d.label}
              </p>
              <p className="font-serif text-2xl text-[#2B2A28]">{d.time}</p>
              <p className="text-sm text-[#2B2A28]/80 mt-2">{d.venue}</p>
              <p className="text-sm text-[#2B2A28]/60 mt-2 italic">{d.note}</p>
            </div>
          ))}
        </div>

        {/* logistics */}
        <div className="grid sm:grid-cols-2 gap-6 mt-16 text-left">
          <div>
            <h3 className="font-serif text-xl text-[#2B2A28] mb-2">
              Parking &amp; Transport
            </h3>
            <p className="text-sm text-[#2B2A28]/75 leading-relaxed">
              Complimentary guest parking is available on-site. Rideshare
              drop-off is at the main gate. Carpooling with fellow guests?
              Always encouraged.
            </p>
          </div>
          <div>
            <h3 className="font-serif text-xl text-[#2B2A28] mb-2">
              Dress Code
            </h3>
            <p className="text-sm text-[#2B2A28]/75 leading-relaxed">
              Garden party glam — cocktail attire you can move (and dance) in.
              Ceremony is on the lawn, so comfy shoes are welcome.
            </p>
          </div>
        </div>

        <a
          href="https://maps.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-12 text-sm uppercase tracking-[0.15em] text-[#B08D57] border-b border-[#B08D57] pb-1 hover:text-[#2B2A28] hover:border-[#2B2A28] transition-colors"
        >
          Get Directions
        </a>
      </div>
    </section>
  );
}