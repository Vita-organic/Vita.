"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { HeroInterface } from "./HeroInterface";
import { LoadingSequence } from "./LoadingSequence";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TOTAL_FRAMES = 30;

export const VitaminHeroSequence: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentFrameRef = useRef<number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [scrollProgress, setScrollProgress] = useState<number>(0);

  // Pad frame numbers: 1 -> "001", 10 -> "010"
  const getFramePath = (index: number): string => {
    const pad = String(index + 1).padStart(3, "0");
    return `/molecule-3d-hq/ezgif-frame-${pad}.png`;
  };

  // Render a specific frame to the canvas with responsive contain/cover scaling
  const drawFrame = useCallback((frameIndex: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const frame = imagesRef.current[frameIndex];
    if (!frame) return;

    // Enable ultra high quality bicubic smoothing for canvas rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const width = canvas.width;
    const height = canvas.height;

    // Clear background with exact image background tone #070605
    ctx.fillStyle = "#070605";
    ctx.fillRect(0, 0, width, height);

    // Compute dimensions to fill or fit gracefully
    const naturalWidth = "width" in frame ? frame.width : (frame as HTMLImageElement).naturalWidth;
    const naturalHeight = "height" in frame ? frame.height : (frame as HTMLImageElement).naturalHeight;

    if (!naturalWidth || !naturalHeight) return;

    const imgAspect = naturalWidth / naturalHeight;
    const canvasAspect = width / height;

    let drawWidth: number;
    let drawHeight: number;
    let offsetX: number;
    let offsetY: number;

    // In desktop view (wide aspect), use cover to maintain reference composition
    // In tall/mobile view, balance scaling so molecule is never clipped
    if (canvasAspect > imgAspect) {
      // Wider than source aspect
      drawWidth = width;
      drawHeight = width / imgAspect;
      offsetX = 0;
      offsetY = (height - drawHeight) / 2;
    } else {
      // Taller than source aspect
      const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
      if (isMobile) {
        drawHeight = height;
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) * 0.58;
        offsetY = 0;
      } else {
        drawHeight = height;
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      }
    }

    ctx.drawImage(frame as CanvasImageSource, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Update canvas sizing for high DPI screens
  const updateCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const rect = canvas.getBoundingClientRect();

    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);

    drawFrame(currentFrameRef.current);
  }, [drawFrame]);

  // Preload and decode all 30 high-quality frames in parallel with hardware acceleration
  useEffect(() => {
    let isCancelled = false;
    let loadedCount = 0;
    const frames: (ImageBitmap | HTMLImageElement)[] = new Array(TOTAL_FRAMES);

    const loadSingleFrame = async (i: number) => {
      try {
        const img = new Image();
        img.src = getFramePath(i);
        
        await new Promise<void>((resolve, reject) => {
          img.onload = () => resolve();
          img.onerror = () => reject();
        });

        if (isCancelled) return;

        // Try decoding into ImageBitmap for zero-latency GPU blitting
        if ("createImageBitmap" in window) {
          try {
            const bitmap = await createImageBitmap(img);
            if (!isCancelled) frames[i] = bitmap;
          } catch {
            if (!isCancelled) frames[i] = img;
          }
        } else {
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
          drawFrame(0);
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

    // Trigger all frame loads
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      loadSingleFrame(i);
    }

    imagesRef.current = frames as HTMLImageElement[];

    window.addEventListener("resize", updateCanvasDimensions, { passive: true });
    return () => {
      isCancelled = true;
      window.removeEventListener("resize", updateCanvasDimensions);
      // Clean up bitmaps
      frames.forEach((f) => {
        if (f && "close" in f && typeof (f as ImageBitmap).close === "function") {
          (f as ImageBitmap).close();
        }
      });
    };
  }, [drawFrame, updateCanvasDimensions]);

  // Initialize GSAP + ScrollTrigger scrollytelling scrubbing
  useEffect(() => {
    if (isLoading || !containerRef.current || !canvasRef.current) return;

    // Refresh dimensions
    updateCanvasDimensions();

    const frameState = { frame: 0 };

    const ctx = gsap.context(() => {
      gsap.to(frameState, {
        frame: TOTAL_FRAMES - 1,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.2,
          onUpdate: (self) => {
            const frameIndex = Math.min(
              TOTAL_FRAMES - 1,
              Math.max(0, Math.round(frameState.frame))
            );

            if (frameIndex !== currentFrameRef.current) {
              currentFrameRef.current = frameIndex;
              drawFrame(frameIndex);
            }

            setScrollProgress(self.progress);
          },
        },
      });
    }, containerRef);

    drawFrame(0);

    return () => {
      ctx.revert();
    };
  }, [isLoading, drawFrame, updateCanvasDimensions]);

  return (
    <>
      {/* Cinematic Minimal Preloader */}
      <LoadingSequence isLoading={isLoading} progress={loadProgress} />

      {/* Long Scroll Section (350vh) */}
      <section
        ref={containerRef}
        className="relative w-full h-[350vh] bg-[#070605]"
      >
        {/* Sticky Viewport Container */}
        <div className="sticky top-0 left-0 w-full h-screen overflow-hidden">
          {/* LAYER 1: Molecular Visual Canvas with High-Def Smoothing and Post-Processing Filter */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full block bg-[#070605]"
            style={{
              filter: "contrast(1.06) brightness(1.02) saturate(1.04)",
            }}
          />

          {/* Vignette & Depth of Field Ambient Overlay to dissolve compression noise */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#070605] via-transparent to-[#070605]/50 opacity-80" />
          <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_35%,#070605_100%)] opacity-70" />
          <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(7,6,5,0.9)]" />

          {/* LAYER 2: Real HTML/React Typography & Interface Overlay */}
          <HeroInterface scrollProgress={scrollProgress} />
        </div>
      </section>
    </>
  );
};
