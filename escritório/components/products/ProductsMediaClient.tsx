"use client";

import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { useRef, useState } from "react";
import { chairs } from "@/lib/chairs";
import { ChairCard } from "./ChairCard";

function MobileProductsSection({
  activeIndex,
  onActiveIndexChange,
  shouldReduceMotion,
}: {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  shouldReduceMotion: boolean;
}) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!window.matchMedia("(max-width: 767px)").matches) return;
    onActiveIndexChange(Math.round(latest * (chairs.length - 1)));
  });

  if (shouldReduceMotion) {
    return (
      <section className="relative block overflow-hidden md:hidden">
        {chairs.map((chair, index) => (
          <ChairCard
            activeIndex={activeIndex}
            chair={chair}
            index={index}
            key={chair.id}
            mode="mobile"
            onActiveIndexChange={onActiveIndexChange}
            shouldReduceMotion
            total={chairs.length}
          />
        ))}
      </section>
    );
  }

  return (
    <section className="relative block h-[400svh] md:hidden" ref={wrapRef}>
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="flex h-full w-[300vw]" style={{ x }}>
          {chairs.map((chair, index) => (
            <ChairCard
              activeIndex={activeIndex}
              chair={chair}
              index={index}
              key={chair.id}
              mode="mobile"
              onActiveIndexChange={onActiveIndexChange}
              shouldReduceMotion={shouldReduceMotion}
              total={chairs.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function DesktopProductsSection({
  activeIndex,
  onActiveIndexChange,
  shouldReduceMotion,
}: {
  activeIndex: number;
  onActiveIndexChange: (index: number) => void;
  shouldReduceMotion: boolean;
}) {
  const wrapRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "-200vw"]);

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (!window.matchMedia("(min-width: 768px)").matches) return;
    onActiveIndexChange(Math.round(latest * (chairs.length - 1)));
  });

  return (
    <section className="relative hidden h-[400vh] md:block" ref={wrapRef}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <motion.div
          className="flex h-full w-[300vw]"
          style={{ x: shouldReduceMotion ? "-200vw" : x }}
        >
          {chairs.map((chair, index) => (
            <ChairCard
              activeIndex={activeIndex}
              chair={chair}
              index={index}
              key={chair.id}
              mode="desktop"
              onActiveIndexChange={onActiveIndexChange}
              shouldReduceMotion={shouldReduceMotion}
              total={chairs.length}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default function ProductsMediaClient() {
  const shouldReduceMotion = Boolean(useReducedMotion());
  const [activeIndex, setActiveIndex] = useState(
    shouldReduceMotion ? chairs.length - 1 : 0,
  );

  return (
    <div id="produtos">
      <DesktopProductsSection
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        shouldReduceMotion={shouldReduceMotion}
      />
      <MobileProductsSection
        activeIndex={activeIndex}
        onActiveIndexChange={setActiveIndex}
        shouldReduceMotion={shouldReduceMotion}
      />
    </div>
  );
}
