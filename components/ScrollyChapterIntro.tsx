"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollyChapterIntroProps {
  id: string;
  part: string;
  title: string;
  subtitle: string;
  description: string;
  theme?: "amber" | "azure";
}

export const ScrollyChapterIntro: React.FC<ScrollyChapterIntroProps> = ({
  id,
  part,
  title,
  subtitle,
  description,
  theme = "amber",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isAmber = theme === "amber";
  const accentColor = isAmber ? "#e8a830" : "#52a5ff";
  const borderColor = isAmber ? "border-amber-500/20" : "border-blue-500/20";
  const glowColor = isAmber ? "rgba(232, 168, 48, 0.08)" : "rgba(82, 165, 255, 0.08)";

  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        gsap.from(contentRef.current.children, {
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 75%",
            end: "top 35%",
            scrub: 0.8,
          },
          y: 50,
          opacity: 0,
          stagger: 0.15,
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id={id}
      className={`section-editorial min-h-[85vh] sm:min-h-screen flex flex-col justify-center border-t ${borderColor}`}
    >
      {/* Dynamic Ambient Atmosphere Glow */}
      <div
        className="ambient-glow w-[700px] h-[500px]"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
        }}
      />

      <div
        ref={contentRef}
        className="max-w-5xl mx-auto w-full relative z-10 text-center flex flex-col items-center"
      >
        <span
          className="eyebrow-scientific mb-6"
          style={{ color: accentColor }}
        >
          {part}
        </span>

        <h2 className="font-editorial text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-light text-white leading-none tracking-tight uppercase mb-6">
          {title}
        </h2>

        <div
          className="font-editorial text-2xl sm:text-4xl font-light tracking-widest mb-8"
          style={{ color: `${accentColor}e6` }}
        >
          {subtitle}
        </div>

        <p className="text-base sm:text-xl text-white/65 font-sans font-light leading-relaxed max-w-2xl">
          {description}
        </p>
      </div>
    </section>
  );
};
