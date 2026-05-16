"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, registerGsap, ScrollTrigger } from "@/lib/gsap";

type Props = {
  value: number;
  duration?: number;
  format?: (n: number) => string;
};

const defaultFormat = (n: number) =>
  Math.round(n).toLocaleString("en-US");

export default function AnimatedNumber({
  value,
  duration = 1.6,
  format = defaultFormat,
}: Props) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    registerGsap();
    const el = ref.current;
    if (!el) return;

    const counter = { n: 0 };

    // Scroll-scrubbed count-up: tied to the element's scroll progress
    // through the viewport (top bottom → top 40%).
    const st = ScrollTrigger.create({
      trigger: el,
      start: "top 90%",
      end: "top 40%",
      scrub: 0.6,
      onUpdate: (self) => {
        counter.n = value * self.progress;
        setDisplay(counter.n);
      },
      onLeave: () => setDisplay(value),
    });

    // If element is already in view at mount, ensure final value
    const rect = el.getBoundingClientRect();
    if (rect.bottom < 0 || rect.top > window.innerHeight) {
      // out of view, leave as-is
    } else if (rect.top < window.innerHeight * 0.4) {
      setDisplay(value);
    }

    return () => st.kill();
  }, [value, duration]);

  return (
    <span ref={ref} className="inline-block">
      {format(display)}
    </span>
  );
}
