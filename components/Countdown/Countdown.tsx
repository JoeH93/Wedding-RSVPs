"use client"
import { useEffect, useState } from "react";

// Update this to your actual wedding date/time
const WEDDING_DATE = new Date("2026-10-24T16:30:00");

type TimeLeft = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getTimeLeft(): TimeLeft {
  const diff = WEDDING_DATE.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function Countdown() {
  // Start as null so server + client's first render match exactly (no time-based value yet)
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(null);

  useEffect(() => {
    // Defer the first update into a callback rather than calling setState
    // synchronously in the effect body (avoids React's cascading-render warning)
    const timeout = setTimeout(() => setTimeLeft(getTimeLeft()), 0);
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft());
    }, 1000);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, []);

  const display = timeLeft ?? { days: 0, hours: 0, minutes: 0, seconds: 0 };

  const units: { label: string; value: number }[] = [
    { label: "Days", value: display.days },
    { label: "Hours", value: display.hours },
    { label: "Minutes", value: display.minutes },
    { label: "Seconds", value: display.seconds },
  ];

  return (
    <div className="flex justify-center gap-4 sm:gap-8">
      {units.map((unit) => (
        <div key={unit.label} className="flex flex-col items-center min-w-[56px]">
          <span className="text-3xl sm:text-5xl font-bold text-[#2B2A28] tabular-nums">
            {/* suppressHydrationWarning as a safety net - the mount-gated state above
                already guarantees server/client match, this just covers edge cases */}
            <span suppressHydrationWarning>{unit.value}</span>
          </span>
          <span className="text-xs uppercase tracking-[0.15em] text-[#8A9A82] mt-1">
            {unit.label}
          </span>
        </div>
      ))}
    </div>
  );
}