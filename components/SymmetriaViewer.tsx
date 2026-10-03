"use client";

import React, { useState, useEffect, useRef } from "react";
import { VitaminData } from "@/data/vitamins";

interface SymmetriaViewerProps {
  vitamin: VitaminData;
  className?: string;
  autoInteractive?: boolean;
  isInView?: boolean;
  onReady?: () => void;
}

export const SymmetriaViewer: React.FC<SymmetriaViewerProps> = ({
  vitamin,
  className = "w-full h-full",
  isInView: externalIsInView,
  onReady,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [internalInView, setInternalInView] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // If externalIsInView is provided, use it; otherwise use internal IntersectionObserver
  const isVisible = externalIsInView !== undefined ? externalIsInView : internalInView;

  // Viewport observer: pre-loads 1000px before reaching the viewport for maximum speed
  useEffect(() => {
    if (externalIsInView !== undefined) return;
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInternalInView(entry.isIntersecting);
      },
      { rootMargin: "1000px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [externalIsInView]);

  useEffect(() => {
    setIsLoaded(false);
  }, [vitamin.id]);

  const query = encodeURIComponent(vitamin.symmetriaQuery || vitamin.chemicalName);
  const embedUrl = `https://www.symmetriachem.com/embed/molecule-builder?m=${query}`;

  const handleIframeLoad = () => {
    setIsLoaded(true);
    if (onReady) onReady();
  };

  return (
    <div
      ref={containerRef}
      className={`relative rounded-2xl overflow-hidden bg-transparent select-none flex items-center justify-center ${className}`}
    >
      {isVisible ? (
        <div className="relative w-full h-full overflow-hidden flex items-center justify-center">
          {/*
            CROP STRATEGY:
            Symmetria places the IUPAC title box at the top (which wraps to 2-3 lines for long names like Tocopherol)
            and the options toolbar at the bottom.
            By setting top: -105px and height: calc(100% + 210px), the multi-line header,
            the "Open in Symmetria" link, and the bottom toolbar are pushed completely outside.
          */}
          <iframe
            src={embedUrl}
            title={`${vitamin.name} 3D Molecule`}
            loading="lazy"
            onLoad={handleIframeLoad}
            allow="accelerometer; gyroscope"
            className={`absolute -top-[200px] left-0 w-full h-[calc(100%+200px)] border-0 pointer-events-auto transition-opacity duration-700 ${isLoaded ? "opacity-100" : "opacity-0"
              }`}
            style={{
              background: "transparent",
            }}
          />

          {/* Minimalist sleek loader while molecule initializes */}
          {!isLoaded && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div
                className="w-8 h-8 rounded-full border border-white/10 animate-spin"
                style={{ borderTopColor: vitamin.accentColor }}
              />
            </div>
          )}
        </div>
      ) : (
        /* Standby Skeleton when off-screen: 0% CPU, 0% GPU, 0 RAM used */
        <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-white/10">
          <span className="font-editorial text-4xl mb-1">
            {vitamin.letter}
          </span>
          <span className="text-[10px] font-mono tracking-widest uppercase">
            {vitamin.formula}
          </span>
        </div>
      )}
    </div>
  );
};
