"use client"
import { useState, FormEvent } from "react";
import Divider from "../Divider/Divider";
import { googleSheetDataType } from "@/types/googleSheetDataType";
import { useSearchParams } from "next/navigation";

type Status = "idle" | "loading" | "success" | "error";

const INITIAL_DATA: googleSheetDataType = {
  guestName: "",
  attending: true,
  numberAttending: 1,
  note: "",
};

// Update with your actual Whish Money details
const WHISH_NAME = "Jane Doe";
const WHISH_NUMBER = "+961 XX XXX XXX";

export default function Section4() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [data, setData] = useState<googleSheetDataType>(INITIAL_DATA);
  const [copied, setCopied] = useState(false);

  const searchParams = useSearchParams();

  const guestParam = searchParams.get("guest");
  const maxParam = searchParams.get("max");

  const guestName = guestParam ? decodeURIComponent(guestParam) : null;

  const parsedMax = maxParam ? parseInt(maxParam, 10) : NaN;
  const maxAttendees = Number.isFinite(parsedMax) && parsedMax > 0 ? parsedMax : null;

  function updateField<K extends keyof googleSheetDataType>(
    field: K,
    value: googleSheetDataType[K]
  ) {
    setData((prev) => ({ ...prev, [field]: value }));
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(WHISH_NUMBER);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API can fail on non-HTTPS/older browsers — the number
      // is still visible on screen for the guest to copy manually.
    }
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

      if (data.attending && maxAttendees && data.numberAttending > maxAttendees) {
        throw new Error(`Maximum number of attendees is ${maxAttendees}.`);
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
    <section id="rsvp" className="py-24 px-6 bg-[#FBF7F0]/80 backdrop-blur-sm">
      <div className="max-w-xl mx-auto text-center">
        <p className="uppercase tracking-[0.3em] text-xs text-[#8A9A82] mb-3">
          {guestName ? "A Personal Invitation" : "Kindly Reply"}
        </p>

        <h2 className="font-serif text-3xl md:text-4xl text-[#2B2A28]">
          {guestName ? `Dear ${guestName},` : "RSVP"}
        </h2>

        <p className="mt-4 text-[#2B2A28]/80 leading-relaxed">
          We would be so honored to have you join us on our special day.
          {maxAttendees
            ? maxAttendees === 1
              ? " This invitation is for one guest."
              : ` This invitation includes up to ${maxAttendees} guests.`
            : ""}
        </p>

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
                Note (optional)
              </label>
              <textarea
                name="note"
                rows={3}
                value={data.note}
                onChange={(e) => updateField("note", e.target.value)}
                placeholder="Drop here your what's in your mind..."
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
            asking, here&apos;s how to send one our way.
          </p>

          <div className="border border-[#B08D57]/30 rounded-lg p-6 bg-white/40 max-w-sm mx-auto text-left">
            <p className="text-xs uppercase tracking-[0.2em] text-[#B08D57] mb-3 text-center">
              Whish Money
            </p>

            <div className="flex items-center justify-between gap-3 mb-1">
              <span className="text-sm text-[#2B2A28]/70">Name</span>
              <span className="font-serif text-lg text-[#2B2A28]">
                {WHISH_NAME}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <span className="text-sm text-[#2B2A28]/70">Number</span>
              <span className="font-serif text-lg text-[#2B2A28] tracking-wide">
                {WHISH_NUMBER}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCopy}
              className="w-full mt-5 py-3 min-h-[44px] border border-[#B08D57] text-[#B08D57] text-sm uppercase tracking-[0.1em] hover:bg-[#B08D57] hover:text-white transition-colors"
            >
              {copied ? "Copied!" : "Copy Number"}
            </button>

            <p className="text-xs text-[#2B2A28]/50 mt-3 text-center">
              Open the Whish app, choose &quot;Send Money,&quot; and search
              this number.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}