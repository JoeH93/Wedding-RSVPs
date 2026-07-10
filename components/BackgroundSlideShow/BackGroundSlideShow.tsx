"use client"
import { useEffect, useState } from "react";

// Drop your images in /public/wedding-bg/ and list them here, in order
const IMAGES = [
  "/Wedding1.jpg",
  "/Wedding2.jpg",
  "/Wedding3.jpg",
];

const SLIDE_DURATION = 4000; // how long each image stays fully visible, in ms

export default function BackgroundSlideshow() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % IMAGES.length);
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {IMAGES.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1000ms] ease-in-out"
          style={{
            backgroundImage: `url(${src})`,
            opacity: i === index ? 1 : 0,
          }}
        />
      ))}

      {/* Light tint so photos aren't harsh in the gaps, while sections
          above still handle their own legibility via translucent backgrounds. */}
      <div className="absolute inset-0 bg-[#FBF7F0]/30" />
    </div>
  );
}