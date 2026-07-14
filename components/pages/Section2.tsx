import Image from "next/image";
import Divider from "../Divider/Divider";

const DETAILS = [
  {
    label: "Church",
    time: "4:30 PM",
    venue: "Saint Charbel Annaya",
    note: "Arrive by 4:15 PM — seating is unassigned.",
    Image: "",
    Location:
      "https://maps.google.com/maps?vet=10CAAQoqAOahcKEwjQoo-KudKVAxUAAAAAHQAAAAAQBQ..i&pvq=CgsvZy8xdGQxMDl2diITCg1zYWludCBjaGFyYmVsEAIYAw&lqi=Ch1zYWludCBjaGFyYmVsIGFubmF5YSBsb2NhdGlvbkjazsDA5YCAgAhaHhAAEAEYABgBIhRzYWludCBjaGFyYmVsIGFubmF5YZIBD2NhdGhvbGljX2NodXJjaJoBRENpOURRVWxSUVVOdlpFTm9kSGxqUmpsdlQyMWFWRkZZUmxCTmVsbDRUMGQ0U1U1Vk1YRlJWVEZwVlZjNWRtTkZSUkFC-gEECAAQNw&fvr=1&cs=0&um=1&ie=UTF-8&fb=1&gl=lb&sa=X&ftid=0x151f50884ea0226d:0x488e56988fefb750",
  },
  {
    label: "Restaurant",
    time: "5:45 PM",
    venue: "Bar Du Port",
    note: "Drinks, bites, and a live trio.",
    Image: "",
    Location: "https://maps.app.goo.gl/sTeEktRnwx4W6aY1A",
  },
  {
    label: "Bride's House",
    time: "2:30 PM",
    venue: "Lala Land",
    note: "Family and Friends Gathering at home.",
    Image: "",
    Location: "https://maps.app.goo.gl/t92JTBjYMpaVT5co8",
  },
];

export default function Section2() {
  return (
    <section
      id="details"
      className="py-24 px-6 bg-[#FBF7F0]/80 backdrop-blur-sm"
    >
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
              {d.Image ? (
                <Image
                  src={d.Image}
                  alt={d.venue}
                  width={300}
                  height={300}
                  className="rounded-md mb-4 w-full h-auto object-cover"
                />
              ) : (
                <div className="w-full aspect-square rounded-md mb-4 bg-gradient-to-br from-[#8A9A82]/25 to-[#B08D57]/25 flex items-center justify-center">
                  <span className="text-[#2B2A28]/40 text-xs italic">
                    photo goes here
                  </span>
                </div>
              )}

              <p className="text-xs uppercase tracking-[0.2em] text-[#B08D57] mb-2">
                {d.label}
              </p>
              <p className="font-serif text-2xl text-[#2B2A28]">{d.time}</p>
              <p className="text-sm text-[#2B2A28]/80 mt-2">{d.venue}</p>
              <p className="text-sm text-[#2B2A28]/60 mt-2 italic">{d.note}</p>

              <a
                href={d.Location}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 text-xs uppercase tracking-[0.15em] text-[#B08D57] border-b border-[#B08D57] pb-0.5 hover:text-[#2B2A28] hover:border-[#2B2A28] transition-colors"
              >
                Get Directions
              </a>
            </div>
          ))}
        </div>

        {/* logistics
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
        </div> */}
      </div>
    </section>
  );
}