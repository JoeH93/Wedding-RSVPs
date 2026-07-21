"use client"
import { useSearchParams } from "next/navigation";
import Divider from "../Divider/Divider";

export default function Section7() {
  const searchParams = useSearchParams();

  const guestParam = searchParams.get("guest");
  const maxParam = searchParams.get("max");

  const guestName = guestParam ? decodeURIComponent(guestParam) : null;

  const parsedMax = maxParam ? parseInt(maxParam, 10) : NaN;
  const maxAttendees = Number.isFinite(parsedMax) && parsedMax > 0 ? parsedMax : null;

  return (
    <section
      id="invite"
      className="py-20 px-6 text-center bg-[#FBF7F0]/80 backdrop-blur-sm"
    >
      <div className="max-w-xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8A9A82] mb-3">
          A Personal Invitation
        </p>

        <h2 className="font-serif text-2xl md:text-3xl text-[#2B2A28]">
          {guestName ? `Dear ${guestName},` : "Dear Guest,"}
        </h2>

        <Divider />

        <p className="text-[#2B2A28]/80 leading-relaxed">
          We would be so honored to have you join us on our special day.
          {maxAttendees
            ? maxAttendees === 1
              ? " This invitation is for one guest."
              : ` This invitation includes up to ${maxAttendees} guests.`
            : ""}
        </p>
      </div>
    </section>
  );
}