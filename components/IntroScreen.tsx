"use client";

import { useCallback } from "react";
import { motion, useAnimation } from "framer-motion";
import Image from "next/image";

// ─── Constants ────────────────────────────────────────────────────────────────
const LOGO_TEXT      = "David Daniel";
const SUBTITLE_WORDS = ["אמן", "חושים"];
const GOLD_GRADIENT  = "linear-gradient(135deg, #E5C76B 0%, #C9A84C 50%, #9A7B2E 100%)";
const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1];

const letterVariants = {
  hidden: { opacity: 0, y: 44, filter: "blur(10px)" },
  visible: {
    opacity: 1, y: 0, filter: "blur(0px)",
    transition: { duration: 0.9, ease: EASE_OUT },
  },
};

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.5 } },
};

const subtitleVariants = {
  hidden: { opacity: 0, y: 10 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: EASE_OUT, delay: i * 0.9 },
  }),
};

// ─── IntroScreen ─────────────────────────────────────────────────────────────
export default function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const subtitleCtrl = useAnimation();

  // Logo finishes → trigger subtitle word-by-word → schedule exit
  const handleLogoComplete = useCallback(() => {
    subtitleCtrl.start("visible");
    setTimeout(onComplete, 2400);
  }, [subtitleCtrl, onComplete]);

  return (
    <motion.div
      key="intro-screen"
      exit={{
        y: "-100%",
        transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
      }}
      style={{ position: "fixed", inset: 0, zIndex: 9999, background: "#080808", overflow: "hidden" }}
    >
      {/* Background image — slow zoom */}
      <motion.div
        animate={{ scale: 1.08 }}
        transition={{ duration: 5, ease: "easeOut" }}
        style={{ position: "absolute", inset: 0, transformOrigin: "center center" }}
      >
        <Image
          src="/intro-bg.jpg"
          alt=""
          fill
          priority
          style={{ objectFit: "cover", objectPosition: "50% 15%" }}
          sizes="100vw"
        />
      </motion.div>

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.48) 0%, rgba(0,0,0,0.72) 100%)",
      }} />

      {/* Logo + subtitle */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        direction: "rtl", gap: "0.12em",
        fontSize: "clamp(2.8rem, 8vw, 5.5rem)",
      }}>
        {/* Logo letters */}
        <motion.span
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          onAnimationComplete={handleLogoComplete}
          aria-label="David Daniel"
          style={{
            display: "inline-flex", flexDirection: "row",
            direction: "ltr", flexWrap: "nowrap",
            fontFamily: "var(--font-playfair)",
            fontStyle: "italic", fontWeight: 600,
            letterSpacing: "0.04em", fontSize: "1em",
          }}
        >
          {LOGO_TEXT.split("").map((char, i) =>
            char === " " ? (
              <motion.span
                key={`space-${i}`}
                variants={letterVariants}
                aria-hidden="true"
                style={{ display: "inline-block", width: "0.32em" }}
              />
            ) : (
              <motion.span
                key={`${char}-${i}`}
                variants={letterVariants}
                style={{
                  display: "inline-block",
                  background: GOLD_GRADIENT,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {char}
              </motion.span>
            ),
          )}
        </motion.span>

        {/* Subtitle — triggered after logo completes */}
        <motion.div
          initial="hidden"
          animate={subtitleCtrl}
          style={{
            display: "inline-flex", flexDirection: "row",
            direction: "rtl", gap: "0.4em",
            fontSize: "0.19em", letterSpacing: "0.25em",
            textTransform: "uppercase", color: "var(--text-muted)",
          }}
        >
          {SUBTITLE_WORDS.map((word, i) => (
            <motion.span
              key={word}
              custom={i}
              variants={subtitleVariants}
              style={{ display: "inline-block" }}
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}
