"use client";

import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { gsap, registerGsap } from "@/lib/gsap";

const NODES = [
  "Tokyo",
  "Singapore",
  "Hong Kong",
  "Shanghai",
  "Sydney",
  "Los Angeles",
  "New York",
  "London",
  "Paris",
  "Berlin",
];

export default function NetworkDiagram() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  registerGsap();

  const size = 800;
  const cx = size / 2;
  const cy = size / 2;
  const rInner = 240;
  const rOuter = 340;

  const nodes = NODES.map((name, i) => {
    const angle = (i / NODES.length) * Math.PI * 2 - Math.PI / 2;
    const r = rInner + (i % 2 === 0 ? 0 : rOuter - rInner) * 0.4;
    return {
      name,
      x: cx + Math.cos(angle) * r,
      y: cy + Math.sin(angle) * r,
    };
  });

  useGSAP(
    () => {
      const paths = gsap.utils.toArray<SVGPathElement>(".net-path");
      paths.forEach((p) => {
        const len = p.getTotalLength();
        gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
      });
      gsap.to(paths, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.out",
        stagger: 0.05,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".net-node, .net-label", {
        opacity: 0,
        scale: 0.5,
        transformOrigin: "center center",
        duration: 0.6,
        ease: "back.out(2)",
        stagger: 0.04,
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 70%",
        },
      });

      gsap.from(".net-center", {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: "top 70%",
        },
      });

    },
    { scope: wrapperRef }
  );

  return (
    <div ref={wrapperRef} className="w-full">
      <svg
        viewBox={`0 0 ${size} ${size}`}
        className="w-full h-auto max-w-[640px] mx-auto"
        role="img"
        aria-label="Global network of Arc Branding"
      >
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {nodes.map((n, i) => (
          <path
            key={`p-${i}`}
            className="net-path"
            d={`M ${cx} ${cy} L ${n.x} ${n.y}`}
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1"
            strokeDasharray="3 4"
            fill="none"
          />
        ))}

        <g className="net-center" style={{ transformBox: "fill-box", transformOrigin: "center" }}>
          <circle cx={cx} cy={cy} r="70" fill="url(#centerGlow)" />
          <circle cx={cx} cy={cy} r="36" fill="#fff" />
          <text
            x={cx}
            y={cy + 5}
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#101010"
            letterSpacing="0.3"
          >
            아크브랜딩
          </text>
        </g>

        {nodes.map((n, i) => (
          <g key={`n-${i}`}>
            <circle
              className="net-node"
              cx={n.x}
              cy={n.y}
              r="4"
              fill="#fff"
            />
            <text
              className="net-label"
              x={n.x}
              y={n.y - 10}
              textAnchor="middle"
              fontSize="11"
              fill="rgba(255,255,255,0.75)"
              fontWeight="500"
            >
              {n.name}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
