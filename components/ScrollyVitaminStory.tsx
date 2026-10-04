"use client";

import React, { useSyncExternalStore } from "react";
import { VitaminData } from "@/data/vitamins";
import { ScrollyVitaminStoryDesktop } from "./ScrollyVitaminStoryDesktop";
import { ScrollyVitaminStoryMobile } from "./ScrollyVitaminStoryMobile";

interface ScrollyVitaminStoryProps {
  vitamin: VitaminData;
  index: number;
}

const emptySubscribe = () => () => {};

const subscribeResize = (callback: () => void) => {
  window.addEventListener("resize", callback, { passive: true });
  return () => window.removeEventListener("resize", callback);
};

export const ScrollyVitaminStory: React.FC<ScrollyVitaminStoryProps> = ({
  vitamin,
  index,
}) => {
  const isMounted = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );

  const isDesktop = useSyncExternalStore(
    subscribeResize,
    () => window.innerWidth >= 1024,
    () => true
  );

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
