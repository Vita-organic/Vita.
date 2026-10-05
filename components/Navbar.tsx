"use client";

import React, { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { id: "hero", label: "Início" },
  { id: "definicao", label: "Definição" },
  { id: "classificacao", label: "Classificação" },
  { id: "lipossoluveis-capitulo", label: "Lipossolúveis" },
  { id: "hidrossoluveis-transicao", label: "Hidrossolúveis" },
  { id: "estudio-3d", label: "Lab 3D" },
  { id: "mapa-mental", label: "Mapa Mental" },
  { id: "autores", label: "Autores" },
];

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const isManualScrollRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Rola suavemente até a seção com compensação da altura da barra
  const scrollTo = (id: string) => {
    setIsOpen(false);
    setActiveId(id);

    // Bloqueia a sobreposição pelo evento de scroll durante a animação de rolagem
    isManualScrollRef.current = true;
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      isManualScrollRef.current = false;
    }, 1000);

    if (id === "hero") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const top = element.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  // Identifica a seção ativa de acordo com o scroll do usuário
  useEffect(() => {
    const handleScroll = () => {
      if (isManualScrollRef.current) return;

      const scrollY = window.scrollY;
      if (scrollY < 200) {
        setActiveId("hero");
        return;
      }
      const scrollPos = scrollY + window.innerHeight * 0.45;
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el) {
          const top = el.getBoundingClientRect().top + scrollY;
          if (scrollPos >= top) {
            setActiveId(NAV_ITEMS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <>
      {/* ========================================================
          DESKTOP (Barra flutuante horizontal centralizada)
          ======================================================== */}
      <div className="hidden md:flex fixed top-4 left-1/2 -translate-x-1/2 z-50">
        <nav className="flex items-center gap-2 bg-[#0a0807]/85 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.7)] rounded-full px-4 py-1.5">
          {/* Título Vita */}
          <button
            onClick={() => scrollTo("hero")}
            className="font-serif italic text-lg tracking-wide text-[#f5efe6] hover:text-white pr-2 focus:outline-none transition-colors cursor-pointer select-none"
          >
            Vita<span className="text-[#e8a830] not-italic">.</span>
          </button>

          {/* Divisor sutil */}
          <div className="h-3.5 w-px bg-white/15 mr-1" />

          {/* Links de navegação */}
          <div className="flex items-center gap-1 text-[11px] font-mono tracking-wider">
            {NAV_ITEMS.map((item) => {
              const isActive = activeId === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className={`px-3 py-1 rounded-full uppercase transition-all cursor-pointer ${
                    isActive
                      ? "bg-white/15 text-white font-medium border border-white/15 shadow-sm"
                      : "text-white/55 hover:text-white hover:bg-white/5 border border-transparent"
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
        </nav>
      </div>

      {/* ========================================================
          MOBILE (Barra flutuante estável com expansão lenta e suave)
          ======================================================== */}
      <div className="md:hidden fixed top-3 inset-x-3 z-50 max-w-sm mx-auto">
        <div className="bg-[#0a0807]/90 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.75)] rounded-2xl overflow-hidden">
          {/* Cabeçalho fixo da barra flutuante */}
          <div className="flex items-center justify-between px-4 py-2.5">
            <button
              onClick={() => scrollTo("hero")}
              className="font-serif italic text-xl tracking-wide text-[#f5efe6] focus:outline-none cursor-pointer select-none"
            >
              Vita<span className="text-[#e8a830] not-italic">.</span>
            </button>

            {/* Botão de 3 barrinhas */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
              className="w-8 h-8 flex flex-col items-center justify-center gap-[5px] focus:outline-none cursor-pointer"
            >
              <span
                className={`w-4 h-[1.5px] rounded-full transition-all duration-400 ease-in-out ${
                  isOpen ? "rotate-45 translate-y-[6.5px] bg-[#e8a830]" : "bg-white/80"
                }`}
              />
              <span
                className={`w-4 h-[1.5px] rounded-full transition-all duration-300 ease-in-out ${
                  isOpen ? "opacity-0" : "bg-white/80"
                }`}
              />
              <span
                className={`w-4 h-[1.5px] rounded-full transition-all duration-400 ease-in-out ${
                  isOpen ? "-rotate-45 -translate-y-[6.5px] bg-[#e8a830]" : "bg-white/80"
                }`}
              />
            </button>
          </div>

          {/* Expansão suave via CSS Grid (sem alteração de border-radius, sem virar círculo) */}
          <div
            className={`grid transition-[grid-template-rows,opacity] duration-500 ease-in-out ${
              isOpen
                ? "grid-rows-[1fr] opacity-100 border-t border-white/[0.08]"
                : "grid-rows-[0fr] opacity-0 border-t border-transparent"
            }`}
          >
            <div className="overflow-hidden">
              <div className="px-3 py-2.5 flex flex-col gap-1">
                {NAV_ITEMS.map((item) => {
                  const isActive = activeId === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`flex items-center justify-between w-full px-3 py-2 rounded-lg text-xs font-mono uppercase tracking-wider text-left transition-colors duration-200 cursor-pointer ${
                        isActive
                          ? "bg-white/10 text-white font-medium"
                          : "text-white/60 hover:text-white hover:bg-white/5 active:bg-white/10"
                      }`}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#e8a830] shadow-[0_0_6px_#e8a830]" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
