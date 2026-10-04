"use client";

import React, { useEffect, useState, useRef } from "react";

interface LoadingSequenceProps {
  isLoading: boolean;
  progress?: number;
  onComplete?: () => void;
}

export const LoadingSequence: React.FC<LoadingSequenceProps> = ({
  isLoading,
  progress = 0,
  onComplete,
}) => {
  const [shouldRender, setShouldRender] = useState<boolean>(true);
  const [isExiting, setIsExiting] = useState<boolean>(false);
  const [displayedPercent, setDisplayedPercent] = useState<number>(0);

  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Lock scroll while the loading overlay is present (Desktop + Mobile)
  useEffect(() => {
    if (shouldRender) {
      // Bloqueia no Desktop e Mobile
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      document.body.style.touchAction = "none";

      return () => {
        setTimeout(() => {
          document.body.style.overflow = "";
          document.documentElement.style.overflow = "";
          document.body.style.touchAction = "";
        }, 2000);
      };
    }
  }, [shouldRender]);



  // Smooth counter animation
  useEffect(() => {
    const target = Math.min(100, Math.max(0, Math.round(progress)));
    const interval = setInterval(() => {
      setDisplayedPercent((prev) => {
        if (prev < target) return prev + 1;
        return target;
      });
    }, 15);
    return () => clearInterval(interval);
  }, [progress]);

  // Curtain exit transition when loading finishes
  useEffect(() => {
    if (!isLoading) {
      const exitTimer = setTimeout(() => {
        setIsExiting(true);
      }, 200);

      const unmountTimer = setTimeout(() => {
        setShouldRender(false);
        onCompleteRef.current?.();
      }, 1100);

      return () => {
        clearTimeout(exitTimer);
        clearTimeout(unmountTimer);
      };
    }
  }, [isLoading]);

  const currentPercent = !isLoading ? 100 : displayedPercent;

  if (!shouldRender) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col justify-between bg-[#060504] text-[#f5efe6] pointer-events-auto select-none overflow-hidden transition-all duration-900 ease-[cubic-bezier(0.76,0,0.24,1)] ${isExiting
        ? "-translate-y-full opacity-90 pointer-events-none"
        : "translate-y-0 opacity-100"
        }`}
    >
      {/* Subtle ambient luxury glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(232, 168, 48, 0.12) 0%, rgba(99, 102, 241, 0.05) 45%, transparent 70%)",
        }}
      />

      {/* Center Hero: Wordmark "Vita." Awwwards Style */}
      <div className="relative z-10 flex flex-col items-center justify-center my-auto px-6 text-center">
        {/* Brand Title: Vita. */}
        <div className="overflow-hidden py-1">
          <h1 className="font-editorial italic text-7xl sm:text-8xl md:text-9xl font-light tracking-tight text-white leading-none flex items-baseline">
            <span className="inline-block transition-transform duration-700 delay-75 ease-out">
              Vita
            </span>
            <span className="text-amber-400 inline-block font-serif transition-transform duration-700 delay-150 ease-out">
              .
            </span>
          </h1>
        </div>

        {/* Refined hairline line expanding under the wordmark */}
        <div className="w-32 sm:w-44 h-[1px] bg-white/10 relative overflow-hidden mt-6 mb-4">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-400/80 via-white to-amber-200 transition-all duration-200 ease-out"
            style={{ width: `${currentPercent}%` }}
          />
        </div>

        {/* Subtle status caption */}
        <p className="text-[10px] font-mono tracking-[0.3em] uppercase text-white/30">
          {currentPercent < 100 ? "Carregando Estruturas" : "Inicializado"}
        </p>
      </div>
    </div>
  );
};
