"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef } from "react";
import { type Chair, productsCopy } from "@/lib/chairs";

type ChairCardProps = {
  chair: Chair;
  index: number;
  activeIndex: number;
  total: number;
  mode: "desktop" | "mobile";
  onActiveIndexChange: (index: number) => void;
  shouldReduceMotion: boolean;
};

export function ChairCard({
  chair,
  index,
  activeIndex,
  total,
  mode,
  onActiveIndexChange,
  shouldReduceMotion,
}: ChairCardProps) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(trackRef, {
    amount: 0.32,
    margin: "280px 0px 280px 0px",
  });

  useEffect(() => {
    if (mode === "mobile" && isInView) {
      onActiveIndexChange(index);
    }
  }, [index, isInView, mode, onActiveIndexChange]);

  return (
    <motion.article
      className={
        mode === "desktop"
          ? "relative flex h-screen w-screen shrink-0 flex-col justify-between overflow-hidden p-16"
          : "relative flex h-[100svh] w-screen shrink-0 flex-col justify-between overflow-hidden px-5 pb-10 pt-12 sm:px-8 sm:py-16"
      }
      style={{
        background: chair.theme.bg,
        color: chair.theme.text,
      }}
      initial={
        shouldReduceMotion || mode === "desktop"
          ? false
          : { opacity: 0, y: 28 }
      }
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true, amount: 0.12 }}
      whileInView={{ opacity: 1, y: 0 }}
    >
      <p
        aria-hidden="true"
        className="absolute right-5 top-16 z-20 text-xs font-semibold tabular-nums opacity-55 sm:right-8 md:hidden"
      >
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>

      <motion.div
        className="relative z-20 max-w-4xl pr-12 md:pr-0"
        initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.3 }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <p
          className="text-sm font-semibold tracking-normal"
          style={{ color: chair.theme.textMuted }}
        >
          {productsCopy.eyebrow}
        </p>
        <h3 className="mt-3 font-display text-5xl font-medium leading-none tracking-normal sm:text-6xl md:text-8xl">
          {chair.name}
        </h3>
        <p
          className="mt-4 max-w-xl text-base leading-7 sm:mt-5 sm:text-lg sm:leading-8"
          style={{ color: chair.theme.textMuted }}
        >
          {chair.tagline}
        </p>
        <div className="mt-5 max-w-lg sm:mt-8">
          <p
            className="line-clamp-3 text-base leading-7 sm:line-clamp-none sm:text-xl sm:leading-8 md:text-2xl md:leading-9"
            style={{ color: chair.theme.textMuted }}
          >
            {chair.description}
          </p>
          <a
            className={
              mode === "mobile"
                ? "hidden"
                : "mt-6 inline-flex items-center justify-center rounded-full border px-5 py-3 text-sm font-semibold transition-transform hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4"
            }
            href="#formulario"
            style={{
              borderColor: chair.theme.ring,
              color: chair.theme.text,
              outlineColor: chair.theme.dot,
            }}
          >
            {chair.detailCta}
          </a>
        </div>
      </motion.div>

      <div
        className={
          mode === "desktop"
            ? chair.image
              ? "absolute bottom-36 right-16 top-24 z-10 w-[72%]"
              : "relative z-10 my-4 h-[52vh] min-h-[320px] max-h-[560px] shrink-0"
            : "relative z-10 my-4 h-[31svh] min-h-[190px] max-h-[340px] sm:my-8 sm:h-[42svh] sm:min-h-[300px] sm:max-h-[390px]"
        }
        ref={trackRef}
      >
        {chair.image &&
        chair.imageAlt &&
        chair.imageWidth &&
        chair.imageHeight ? (
          <motion.img
            alt={chair.imageAlt}
            className="h-full w-full select-none object-contain object-center md:object-right"
            decoding="async"
            draggable={false}
            height={chair.imageHeight}
            initial={
              shouldReduceMotion
                ? false
                : mode === "mobile"
                  ? { opacity: 0, x: 48, scale: 0.96 }
                  : { opacity: 0, x: 20 }
            }
            loading="eager"
            src={chair.image}
            style={{
              WebkitMaskImage:
                "linear-gradient(to bottom, transparent 0%, black 7%, black 90%, transparent 100%)",
              maskImage:
                "linear-gradient(to bottom, transparent 0%, black 7%, black 90%, transparent 100%)",
            }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={{ once: true, amount: 0.25 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            width={chair.imageWidth}
          />
        ) : null}
      </div>

      <div
        className={
          mode === "desktop"
            ? "absolute bottom-16 left-16 right-16 z-20 flex gap-5 border-t pt-6 md:items-center md:justify-between"
            : "relative z-20 flex flex-col gap-3 border-t pt-4 sm:gap-5 sm:pt-6"
        }
        style={{ borderColor: chair.theme.ring }}
      >
        <p className="text-sm font-medium" style={{ color: chair.theme.textMuted }}>
          {productsCopy.interactionHint}
        </p>
        <a
          className="inline-flex min-h-12 w-full items-center justify-center rounded-full border px-5 py-3 text-center text-sm font-semibold tracking-normal transition hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:w-fit"
          href="#formulario"
          style={{
            borderColor: chair.theme.dot,
            color: chair.theme.text,
            outlineColor: chair.theme.dot,
          }}
        >
          {productsCopy.ctaPrefix} {chair.name}
        </a>
      </div>

      <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 gap-3 md:bottom-8">
        {Array.from({ length: total }).map((_, progressIndex) => (
          <span
            className="block h-1 rounded-full transition-opacity"
            key={progressIndex}
            style={{
              background: chair.theme.dot,
              opacity: progressIndex === activeIndex ? 1 : 0.3,
              width: 8,
            }}
          />
        ))}
      </div>
    </motion.article>
  );
}
