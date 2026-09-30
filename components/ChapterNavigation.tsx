"use client";

import React, { useEffect, useState } from "react";

interface NavItem {
  id: string;
  label: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "hero", label: "HERO" },
  { id: "definicao", label: "DEFINIÇÃO" },
  { id: "classificacao", label: "BIFURCAÇÃO" },
  { id: "lipossoluveis-capitulo", label: "LIPOSSOLÚVEIS" },
  { id: "hidrossoluveis-transicao", label: "HIDROSSOLÚVEIS" },
  { id: "estudio-3d", label: "LABORATÓRIO 3D" },
  { id: "autores", label: "AUTORES" },
];

export const ChapterNavigation: React.FC = () => {
  const [activeId, setActiveId] = useState<string>("hero");
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    let ticking = false;

    const updateActiveSection = () => {
      setIsVisible(window.scrollY > 250);
      const scrollPosition = window.scrollY + window.innerHeight * 0.35;

      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const item = NAV_ITEMS[i];
        const element = document.getElementById(item.id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(item.id);
            break;
          }
        }
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav
      className={`fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 transition-all duration-500 pointer-events-auto max-w-[96vw] sm:max-w-max ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4 pointer-events-none"
        }`}
      aria-label="Navegação editorial rápida"
    >
      <div className="flex items-center space-x-1 sm:space-x-1.5 bg-[#090807]/90 backdrop-blur-xl px-2.5 sm:px-3 py-1.5 rounded-full border border-white/10 shadow-[0_10px_35px_rgba(0,0,0,0.85)] text-[10px] sm:text-[11px] font-mono overflow-x-auto scrollbar-none whitespace-nowrap">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-wider transition-all duration-300 flex-shrink-0 cursor-pointer ${activeId === item.id
                ? "bg-white/20 text-white font-medium shadow-sm border border-white/15"
                : "text-white/45 hover:text-white/85 hover:bg-white/5 border border-transparent"
              }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </nav>
  );
};
