"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { LoadingSequence } from "./LoadingSequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 60;

export const VitaminHeroSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<(ImageBitmap | HTMLImageElement)[]>([]);
  const currentFrameRef = useRef<number>(0);
  const isVisibleRef = useRef<boolean>(true);
  const rafIdRef = useRef<number | null>(null);

  // Typography refs
  const heroBeat1Ref = useRef<HTMLDivElement>(null);
  const heroBeat2Ref = useRef<HTMLDivElement>(null);
  const topBarRef = useRef<HTMLDivElement>(null);
  const bottomBarRef = useRef<HTMLDivElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);

  const getFramePath = (index: number, ext: "webp" | "png" = "webp"): string => {
    const pad = String(index + 1).padStart(3, "0");
    return `/molecule-3d-fps/ezgif-frame-${pad}.${ext}`;
  };

  // High performance Canvas drawing
  const renderFrameToCanvas = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas || !isVisibleRef.current) return;

    let ctx = ctxRef.current;
    if (!ctx) {
      ctx = canvas.getContext("2d", { alpha: false, desynchronized: true }) as CanvasRenderingContext2D | null;
      if (!ctx) return;
      ctxRef.current = ctx;
    }

    const frame = imagesRef.current[frameIndex];
    if (!frame) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear background with obsidian tint
    ctx.fillStyle = "#060504";
    ctx.fillRect(0, 0, width, height);

    const naturalWidth = "width" in frame ? frame.width : (frame as HTMLImageElement).naturalWidth;
    const naturalHeight = "height" in frame ? frame.height : (frame as HTMLImageElement).naturalHeight;

    if (!naturalWidth || !naturalHeight) return;

    const imgAspect = naturalWidth / naturalHeight;
    const canvasAspect = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    if (canvasAspect > imgAspect) {
      drawWidth = width;
      drawHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      drawHeight = height;
      drawWidth = height * imgAspect;
      offsetX = (width - drawWidth) / 2;
      offsetY = 0;
    }

    ctx.drawImage(frame as CanvasImageSource, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // RequestAnimationFrame-throttled draw
  const drawFrame = useCallback((frameIndex: number) => {
    currentFrameRef.current = frameIndex;
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(() => {
      renderFrameToCanvas(frameIndex);
      rafIdRef.current = null;
    });
  }, [renderFrameToCanvas]);

  // Optimal Canvas DPI sizing (capped at 1.5 to eliminate GPU fillrate bottlenecks)
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    // Re-acquire context cache if size changed
    ctxRef.current = canvas.getContext("2d", { alpha: false, desynchronized: true }) as CanvasRenderingContext2D | null;

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Highly optimized parallel frame loader with WebP + ImageBitmap
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const frames: (ImageBitmap | HTMLImageElement)[] = new Array(TOTAL_FRAMES);

    const loadSingleFrame = async (i: number): Promise<void> => {
      try {
        const webpUrl = getFramePath(i, "webp");

        if ("createImageBitmap" in window) {
          try {
            const res = await fetch(webpUrl);
            if (!res.ok) throw new Error("WebP fetch failed");
            const blob = await res.blob();
            if (isCancelled) return;
            const bitmap = await createImageBitmap(blob);
            if (!isCancelled) frames[i] = bitmap;
          } catch {
            // Fallback to Image element with PNG
            if (isCancelled) return;
            const img = new Image();
            img.src = getFramePath(i, "png");
            await new Promise<void>((resolve, reject) => {
              img.onload = () => resolve();
              img.onerror = () => reject();
            });
            if (!isCancelled) frames[i] = img;
          }
        } else {
          const img = new Image();
          img.src = webpUrl;
          await new Promise<void>((resolve, reject) => {
            img.onload = () => resolve();
            img.onerror = () => {
              img.src = getFramePath(i, "png");
              img.onload = () => resolve();
              img.onerror = () => reject();
            };
          });
          if (img.decode) {
            try {
              await img.decode();
            } catch {}
          }
          if (!isCancelled) frames[i] = img;
        }

        if (isCancelled) return;

        loadedCount++;
        setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);

        if (i === 0 && canvasRef.current) {
          renderFrameToCanvas(0);
        }

        if (loadedCount === TOTAL_FRAMES) {
          setIsLoading(false);
          updateCanvasDimensions();
        }
      } catch {
        if (isCancelled) return;
        loadedCount++;
        setLoadProgress((loadedCount / TOTAL_FRAMES) * 100);
        if (loadedCount === TOTAL_FRAMES) {
          setIsLoading(false);
          updateCanvasDimensions();
        }
      }
    };

    const loadAllFrames = async () => {
      // Priority 1: Load frame 0 immediately to guarantee instant visual paint
      await loadSingleFrame(0);
      if (isCancelled) return;

      // Priority 2: Concurrent streaming of remaining 59 frames in batches of 8
      const remainingIndices = Array.from({ length: TOTAL_FRAMES - 1 }, (_, k) => k + 1);
      const concurrency = 8;
      let currentIndex = 0;

      const worker = async () => {
        while (currentIndex < remainingIndices.length && !isCancelled) {
          const idx = remainingIndices[currentIndex++];
          await loadSingleFrame(idx);
        }
      };

      const workers = Array.from({ length: concurrency }, () => worker());
      await Promise.all(workers);
    };

    loadAllFrames();
    imagesRef.current = frames;

    window.addEventListener("resize", updateCanvasDimensions, { passive: true });
    return () => {
      isCancelled = true;
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
      }
      window.removeEventListener("resize", updateCanvasDimensions);
      frames.forEach((f) => {
        if (f && "close" in f && typeof (f as ImageBitmap).close === "function") {
          (f as ImageBitmap).close();
        }
      });
    };
  }, [drawFrame, renderFrameToCanvas, updateCanvasDimensions]);

  // GSAP ScrollTrigger timeline orchestrating frame scrub & editorial typography
  useEffect(() => {
    if (isLoading || !containerRef.current || !canvasRef.current) return;

    updateCanvasDimensions();

    const frameState = { frame: 0 };

    const ctx = gsap.context(() => {
      // 1. Initial entrance for hero elements on page load
      gsap.from([topBarRef.current, bottomBarRef.current], {
        opacity: 0,
        y: -10,
        duration: 1.2,
        ease: "power2.out",
        delay: 0.2,
      });

      gsap.from(heroBeat1Ref.current, {
        opacity: 0,
        y: 35,
        duration: 1.4,
        ease: "power3.out",
        delay: 0.4,
      });

      // 2. Continuous scrub timeline across 260vh scroll with tight 0.6s scrub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 0.6,
          onToggle: (self) => {
            isVisibleRef.current = self.isActive;
          },
          onUpdate: () => {
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.round(frameState.frame))
            );
            if (frameIndex !== currentFrameRef.current) {
              drawFrame(frameIndex);
            }
          },
        },
      });

      // Frame progression 0 -> 59
      tl.to(
        frameState,
        {
          frame: TOTAL_FRAMES - 1,
          ease: "none",
          duration: 1,
        },
        0
      );

      // Beat 1 fades out as user scrolls
      tl.to(
        heroBeat1Ref.current,
        {
          opacity: 0,
          y: -50,
          ease: "power2.inOut",
          duration: 0.35,
        },
        0.15
      );

      // Beat 2 emerges in the center: The Philosophical Axiom
      tl.fromTo(
        heroBeat2Ref.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, ease: "power2.out", duration: 0.3 },
        0.35
      );

      // Beat 2 fades out towards end of hero
      tl.to(
        heroBeat2Ref.current,
        { opacity: 0, y: -40, ease: "power2.in", duration: 0.25 },
        0.75
      );

      // Bottom bar fades on scroll
      tl.to(
        bottomBarRef.current,
        { opacity: 0, ease: "power2.out", duration: 0.2 },
        0.1
      );
    }, containerRef);

    drawFrame(0);

    return () => {
      ctx.revert();
    };
  }, [isLoading, drawFrame, updateCanvasDimensions]);

  return (
    <>
      <LoadingSequence isLoading={isLoading} progress={loadProgress} />

      <section
        ref={containerRef}
        id="hero"
        className="relative w-full h-[260vh] bg-[#060504]"
      >
        {/* Pinned Sticky Viewport */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* HTML Canvas: Molecular Frame Sequence */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block bg-[#060504] will-change-transform"
          />

          {/* Vignette & Ambient Radial Shading for seamless deep obsidian blend */}
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,transparent_30%,#060504_95%)] opacity-85" />
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#060504] via-transparent to-[#060504]/60" />

          {/* Editorial Typography Overlay Layer */}
          <div className="absolute inset-0 z-20 pointer-events-none select-none flex flex-col justify-between p-6 sm:p-12 md:p-16 lg:p-20 text-[#f5efe6]">
            {/* Top Bar: Editorial Header */}
            <div ref={topBarRef} className="w-full flex items-center justify-between">
              <div className="flex items-center space-x-3 text-xs font-mono tracking-[0.3em] uppercase text-white/50">
                <span>BIOQUÍMICA MOLECULAR</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#e8a830]" />
                <span className="text-white/30">2026</span>
              </div>

              <div className="text-right text-xs font-mono tracking-[0.25em] text-white/40 uppercase">
                ESTUDO CIENTÍFICO &middot; 01
              </div>
            </div>

            {/* Center Stage: Beat 1 (Grand Title + Custom Font Subtitle) */}
            <div
              ref={heroBeat1Ref}
              className="w-full my-auto flex flex-col items-center text-center px-4"
            >
              <h1 className="font-editorial text-[18vw] sm:text-[15vw] lg:text-[13rem] leading-[0.85] tracking-[-0.03em] text-[#f5efe6] font-light">
                VITAMINAS
              </h1>
              <p className="mt-3 sm:mt-5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-meltow text-[#e8a830] tracking-normal font-normal">
                A Química da Vida
              </p>
            </div>

            {/* Center Stage: Beat 2 (Philosophical Editorial Axiom revealed on scroll) */}
            <div
              ref={heroBeat2Ref}
              className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12 max-w-4xl mx-auto pointer-events-none opacity-0"
            >
              <span className="text-xs font-mono tracking-[0.35em] uppercase text-[#e8a830] mb-6 block">
                A ESSÊNCIA BIOLÓGICA
              </span>
              <p className="font-editorial text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-light leading-[1.2] tracking-tight">
                Compostos orgânicos invisíveis. <br />
                <span className="italic font-serif text-[#e8a830]/90">
                  Essenciais em frações de miligramas.
                </span>{" "}
                <br />
                A chave silenciosa que sustenta a maquinaria celular.
              </p>
            </div>

            {/* Bottom Bar: Clean Scroll Invitation */}
            <div
              ref={bottomBarRef}
              className="w-full flex items-end justify-between text-white/40 pt-4 border-t border-white/[0.06]"
            >
              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase">
                EXPOSIÇÃO CONTÍNUA
              </span>

              <div className="flex flex-col items-center space-y-2">
                <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-white/60">
                  ROLE PARA EXPLORAR
                </span>
                <div className="w-[1px] h-8 bg-gradient-to-b from-white/60 to-transparent" />
              </div>

              <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.25em] uppercase text-right">
                13 COMPOSTOS VITAIS
              </span>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
