"use client";

import React, { useState, useEffect } from "react";
import { VitaminData } from "@/data/vitamins";
import { ScrollyVitaminStoryDesktop } from "./ScrollyVitaminStoryDesktop";
import { ScrollyVitaminStoryMobile } from "./ScrollyVitaminStoryMobile";

interface ScrollyVitaminStoryProps {
  vitamin: VitaminData;
  index: number;
}

export const ScrollyVitaminStory: React.FC<ScrollyVitaminStoryProps> = ({
  vitamin,
  index,
}) => {
  const [isDesktop, setIsDesktop] = useState<boolean>(true);
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
    const updateScreenSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize, { passive: true });
    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  // SSR skeleton placeholder to prevent layout shifts
  if (!isMounted) {
    return (
      <article
        id={vitamin.id}
        className="relative w-full h-[300vh] bg-[#060504] text-[#f5efe6]"
      />
    );
  }

  return isDesktop ? (
    <ScrollyVitaminStoryDesktop vitamin={vitamin} index={index} />
  ) : (
    <ScrollyVitaminStoryMobile vitamin={vitamin} index={index} />
  );
};
