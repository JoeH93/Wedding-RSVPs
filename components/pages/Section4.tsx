"use client"
import { useState, FormEvent } from "react";
import Divider from "../Divider/Divider";
import { googleSheetDataType } from "@/types/googleSheetDataType";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL_DATA: googleSheetDataType = {
  guestName: "",
  attending: true,
  numberAttending: 1,
  dietary: "",
  note: "",
};

export default function Section4() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<googleSheetDataType>(INITIAL_DATA);

  function updateField<K extends keyof googleSheetDataType>(
    field: K,
    value: googleSheetDataType[K]
  ) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      if (!data.guestName.trim()) {
        throw new Error("Please enter your name.");
      }
      if (data.attending && data.numberAttending <= 0) {
        throw new Error("Please enter a valid number of guests.");
      }      
      
      const res = await fetch("/api/rsvp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("failed");

      setStatus("success");
      setData(INITIAL_DATA);
    } catch (err) {
      setErrorMessage(
        err instanceof Error ? err.message : "Something went wrong."
      );
      setStatus("error");
    }
  }

  return (
    <section id="rsvp" className="py-24 px-6 bg-[#FBF7F0]">
      <div className="max-w-xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8A9A82] mb-3">
          Kindly Reply
        </p>
        <h2 className="font-serif text-3xl md:text-4xl text-[#2B2A28]">RSVP</h2>
        <Divider />

        {status === "success" ? (
          <div className="border border-[#8A9A82]/40 rounded-lg p-8 bg-[#8A9A82]/10">
            <p className="font-serif text-xl text-[#2B2A28] mb-2">
              You&apos;re on the list!
            </p>
            <p className="text-sm text-[#2B2A28]/70">
              Thank you for replying! we can&apos;t wait to celebrate with you.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="text-left space-y-5">
            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#2B2A28]/70 mb-1.5">
                Guest Name(s)
              </label>
              <input
                name="guestName"
                value={data.guestName}
                onChange={(e) => updateField("guestName", e.target.value)}
                placeholder="Jane Doe & Guest"
                className="w-full border border-[#2B2A28]/20 rounded-md px-4 py-3 text-base bg-white/60 focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#2B2A28]/70 mb-1.5">
                Will you be attending?
              </label>
              <div className="flex gap-3">
                {[
                  { label: "yes", value: true },
                  { label: "no", value: false },
                ].map((opt) => (
                  <button
                    type="button"
                    key={opt.label}
                    onClick={() => updateField("attending", opt.value)}
                    className={`flex-1 py-3 min-h-[44px] rounded-md border capitalize text-sm transition-colors ${
                      data.attending === opt.value
                        ? "bg-[#2B2A28] text-[#FBF7F0] border-[#2B2A28]"
                        : "border-[#2B2A28]/20 text-[#2B2A28]"
                    }`}
                  >
                    {opt.value ? "Joyfully Accept" : "Regretfully Decline"}
                  </button>
                ))}
              </div>
            </div>

            {data.attending && (
              <div>
                <label className="block text-xs uppercase tracking-[0.15em] text-[#2B2A28]/70 mb-1.5">
                  Number Attending
                </label>
                <input
                  name="numberAttending"
                  type="number"
                  min={1}
                  value={data.numberAttending}
                  onChange={(e) =>
                    updateField("numberAttending", Number(e.target.value))
                  }
                  className="w-full border border-[#2B2A28]/20 rounded-md px-4 py-3 text-base bg-white/60 focus:outline-none focus:border-[#B08D57]"
                />
              </div>
            )}

            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#2B2A28]/70 mb-1.5">
                Dietary Restrictions / Meal Preference
              </label>
              <input
                name="dietary"
                value={data.dietary}
                onChange={(e) => updateField("dietary", e.target.value)}
                placeholder="Vegetarian, gluten-free, none..."
                className="w-full border border-[#2B2A28]/20 rounded-md px-4 py-3 text-base bg-white/60 focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            <div>
              <label className="block text-xs uppercase tracking-[0.15em] text-[#2B2A28]/70 mb-1.5">
                Song Request or Note (optional)
              </label>
              <textarea
                name="note"
                rows={3}
                value={data.note}
                onChange={(e) => updateField("note", e.target.value)}
                placeholder="Play this and you'll never get us off the dance floor..."
                className="w-full border border-[#2B2A28]/20 rounded-md px-4 py-3 text-base bg-white/60 focus:outline-none focus:border-[#B08D57]"
              />
            </div>

            {status === "error" && (
              <p className="text-sm text-red-600">
                {errorMessage || "Something went wrong sending your RSVP — please try again."}
              </p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#2B2A28] text-[#FBF7F0] py-3 uppercase tracking-[0.15em] text-sm hover:bg-[#B08D57] transition-colors disabled:opacity-60"
            >
              {status === "loading" ? "Sending..." : "Send RSVP"}
            </button>
          </form>
        )}

        {/* Registry */}
        <div className="mt-20">
          <h3 className="font-serif text-xl text-[#2B2A28] mb-4">
            Gift Registry
          </h3>
          <p className="text-sm text-[#2B2A28]/70 mb-6">
            Your presence is truly the only gift we need — but for those
            asking, here&apos;s where we&apos;re registered.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: "Amazon", href: "https://amazon.com" },
              { name: "Crate & Barrel", href: "https://crateandbarrel.com" },
            ].map((r) => (
              <a
                key={r.name}
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 min-h-[44px] flex items-center border border-[#B08D57] text-[#B08D57] text-sm uppercase tracking-[0.1em] hover:bg-[#B08D57] hover:text-white transition-colors"
              >
                {r.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}