"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent, type MotionValue } from "framer-motion";

const W = 160;
const H = 220;
const D = 44;
const CARDS = 52;

const GOLD   = "#C9A84C";
const GOLD_L = "#E5C76B";
const GOLD_D = "#9A7B2E";
const IVORY  = "#faf7f0";
const IVORY_D = "#ede8db";
const IVORY_L = "#fefcf8";
const CREAM  = "#e4ddd0";

/* ─── Front Face ─────────────────────────────────────────────── */
function FrontFace() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      borderRadius: "10px 10px 9px 9px",
      background: `linear-gradient(170deg, ${IVORY_L} 0%, ${IVORY} 50%, ${IVORY_D} 100%)`,
      border: `1.5px solid ${GOLD_D}`,
      overflow: "hidden",
      boxShadow: `inset 0 0 0 1px rgba(255,255,255,0.6)`,
    }}>
      {/* Subtle warm gloss */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(155deg, rgba(255,255,255,0.55) 0%, transparent 45%)",
        borderRadius: "inherit",
      }} />

      {/* Outer gold border */}
      <div style={{
        position: "absolute", inset: 6,
        border: `1.5px solid ${GOLD}`,
        borderRadius: 6,
      }} />

      {/* Inner thin gold border */}
      <div style={{
        position: "absolute", inset: 11,
        border: `0.5px solid rgba(201,168,76,0.45)`,
        borderRadius: 3,
      }} />

      {/* Subtle gold diamond pattern */}
      <div style={{
        position: "absolute", inset: 14,
        backgroundImage: `
          repeating-linear-gradient(45deg,  rgba(201,168,76,0.08) 0px, rgba(201,168,76,0.08) 1px, transparent 1px, transparent 10px),
          repeating-linear-gradient(-45deg, rgba(201,168,76,0.08) 0px, rgba(201,168,76,0.08) 1px, transparent 1px, transparent 10px)
        `,
        borderRadius: 2,
      }} />

      {/* Corner ornaments */}
      {[
        { top: 13, left: 13 },
        { top: 13, right: 13 },
        { bottom: 13, left: 13 },
        { bottom: 13, right: 13 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos,
          fontSize: 11, color: GOLD,
          lineHeight: 1, userSelect: "none",
          fontFamily: "Georgia, serif",
        }}>✦</div>
      ))}

      {/* Center spade — black with gold shadow */}
      <div style={{
        position: "absolute", top: "41%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 82, lineHeight: 1,
        color: "#1a1a1a",
        textShadow: `0 2px 0 rgba(0,0,0,0.15), 0 0 20px rgba(201,168,76,0.2)`,
        userSelect: "none",
      }}>♠</div>

      {/* Bottom shadow for depth */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 60,
        background: "linear-gradient(to top, rgba(0,0,0,0.04), transparent)",
        pointerEvents: "none",
      }} />

      {/* Brand name */}
      <div style={{
        position: "absolute", bottom: 22, left: 0, right: 0, textAlign: "center",
      }}>
        <div style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic", fontWeight: 700,
          fontSize: 15.5, letterSpacing: "0.04em",
          background: `linear-gradient(135deg, ${GOLD_D}, ${GOLD}, ${GOLD_L})`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}>David Daniel</div>
        <div style={{
          fontSize: 7.5, letterSpacing: "0.28em",
          textTransform: "uppercase", marginTop: 3,
          color: GOLD_D,
          opacity: 0.85,
        }}>אמן חושים</div>
      </div>
    </div>
  );
}

/* ─── Inside Cards — horizontal planes visible from the top ──── */
function InsideCards({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const opacity = useTransform(scrollYProgress, [0.05, 0.15], [0, 1]);
  const NUM = 10;

  return (
    <>
      {Array.from({ length: NUM }, (_, idx) => NUM - 1 - idx).map((i) => {
        const isTop = i === 0;
        return (
          <motion.div
            key={i}
            style={{
              position: "absolute",
              left: 4, right: 4,
              // Stagger top position → after rotateX(-90) each card sits slightly deeper in the box
              top: 4 + i * 3,
              // This dimension becomes the card's depth (into the box) after rotation
              height: D - 6,
              rotateX: -90,
              transformOrigin: "50% 0%",
              opacity,
              borderRadius: isTop ? 6 : 4,
              background: isTop
                ? `linear-gradient(180deg, ${IVORY_L} 0%, ${IVORY} 70%, ${IVORY_D} 100%)`
                : `linear-gradient(180deg, ${IVORY} 0%, ${IVORY_D} 100%)`,
              border: `${isTop ? "1px" : "0.5px"} solid ${isTop ? GOLD : "rgba(201,168,76,0.45)"}`,
              boxShadow: isTop ? `0 2px 10px rgba(0,0,0,0.25)` : undefined,
            }}
          >
            {/* Gold frame on top card */}
            {isTop && (
              <div style={{
                position: "absolute", inset: 4,
                border: `0.5px solid ${GOLD}`,
                borderRadius: 3,
              }} />
            )}
            {/* Gloss on top card */}
            {isTop && (
              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(180deg, rgba(255,255,255,0.45) 0%, transparent 55%)",
                borderRadius: "inherit",
                pointerEvents: "none",
              }} />
            )}
          </motion.div>
        );
      })}
    </>
  );
}

/* ─── Right Face — card stack edge ───────────────────────────── */
function RightFace({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const flapRotateX = useTransform(scrollYProgress, [0, 0.25], [270, 75]);
  const cardH = H / CARDS;
  const FLAP_H = 28;
  return (
    <div style={{
      position: "absolute",
      top: 0, left: "100%",
      width: D, height: H,
      transform: "rotateY(90deg)",
      transformOrigin: "0% 50%",
      transformStyle: "preserve-3d",
    }}>
      {/* Face body */}
      <div style={{
        position: "absolute", inset: 0,
        border: `1px solid ${GOLD_D}`,
        borderLeft: "none",
        borderRadius: "0 8px 8px 0",
        overflow: "hidden",
        background: IVORY,
        backfaceVisibility: "hidden",
      }}>
        {Array.from({ length: CARDS }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: i * cardH, left: 0, right: 0, height: cardH,
            background: i % 3 === 0 ? IVORY_L : i % 3 === 1 ? IVORY : IVORY_D,
            borderBottom: cardH >= 1 ? `0.5px solid rgba(0,0,0,0.06)` : undefined,
          }} />
        ))}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 6,
          background: `linear-gradient(180deg, ${GOLD_L} 0%, ${GOLD} 100%)`, zIndex: 2,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
          background: `linear-gradient(0deg, ${GOLD_L} 0%, ${GOLD} 100%)`, zIndex: 2,
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          background: "linear-gradient(90deg, rgba(0,0,0,0.12) 0%, rgba(0,0,0,0.04) 45%, transparent 100%)",
        }} />
      </div>

      {/* Side flap */}
      <motion.div style={{
        position: "absolute",
        top: 0, left: 0,
        width: D, height: FLAP_H,
        rotateX: flapRotateX,
        transformOrigin: "50% 0%",
        background: IVORY_L,
        border: `1px solid ${GOLD}`,
        overflow: "hidden",
        backfaceVisibility: "hidden",
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: i * (FLAP_H / 8), left: 0, right: 0, height: FLAP_H / 8,
            background: i % 2 === 0 ? IVORY_L : IVORY,
          }} />
        ))}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(90deg, rgba(0,0,0,0.08) 0%, transparent 60%)",
        }} />
      </motion.div>
    </div>
  );
}

/* ─── Left Face — card stack edge (in shadow) ────────────────── */
function LeftFace({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const flapRotateX = useTransform(scrollYProgress, [0, 0.25], [270, 75]);
  const cardH = H / CARDS;
  const FLAP_H = 28;
  return (
    <div style={{
      position: "absolute",
      top: 0, right: "100%",
      width: D, height: H,
      transform: "rotateY(-90deg)",
      transformOrigin: "100% 50%",
      transformStyle: "preserve-3d",
    }}>
      {/* Face body */}
      <div style={{
        position: "absolute", inset: 0,
        border: `1px solid ${GOLD_D}`,
        borderRight: "none",
        borderRadius: "8px 0 0 8px",
        overflow: "hidden",
        background: IVORY_D,
        backfaceVisibility: "hidden",
      }}>
        {Array.from({ length: CARDS }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: i * cardH, left: 0, right: 0, height: cardH,
            background: i % 3 === 0 ? IVORY : i % 3 === 1 ? IVORY_D : CREAM,
            borderBottom: cardH >= 1 ? `0.5px solid rgba(0,0,0,0.07)` : undefined,
          }} />
        ))}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 6,
          background: `linear-gradient(180deg, ${GOLD} 0%, ${GOLD_D} 100%)`, zIndex: 2,
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: 6,
          background: `linear-gradient(0deg, ${GOLD} 0%, ${GOLD_D} 100%)`, zIndex: 2,
        }} />
        <div style={{
          position: "absolute", inset: 0, zIndex: 3,
          background: "linear-gradient(270deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)",
        }} />
      </div>

      {/* Side flap */}
      <motion.div style={{
        position: "absolute",
        top: 0, left: 0,
        width: D, height: FLAP_H,
        rotateX: flapRotateX,
        transformOrigin: "50% 0%",
        background: IVORY,
        border: `1px solid ${GOLD}`,
        overflow: "hidden",
        backfaceVisibility: "hidden",
      }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} style={{
            position: "absolute",
            top: i * (FLAP_H / 8), left: 0, right: 0, height: FLAP_H / 8,
            background: i % 2 === 0 ? IVORY : IVORY_D,
          }} />
        ))}
        <div style={{
          position: "absolute", inset: 0,
          background: "linear-gradient(270deg, rgba(0,0,0,0.1) 0%, transparent 60%)",
        }} />
      </motion.div>
    </div>
  );
}

/* ─── Top Face — scroll-driven opening ───────────────────────── */
function TopFace({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const rotateX = useTransform(scrollYProgress, [0, 0.25], [90, -100]);
  const cardW = W / CARDS;
  return (
    <motion.div style={{
      position: "absolute",
      bottom: "100%", left: 0,
      width: W, height: D,
      rotateX,
      transformOrigin: "50% 100%",
      border: `1px solid ${GOLD}`,
      borderBottom: "none",
      borderRadius: "8px 8px 0 0",
      overflow: "hidden",
      background: IVORY_L,
    }}>
      {Array.from({ length: CARDS }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: i * cardW, top: 0, bottom: 0, width: cardW,
          background: i % 3 === 0 ? IVORY_L : i % 3 === 1 ? IVORY : IVORY_D,
          borderRight: cardW >= 1 ? `0.5px solid rgba(0,0,0,0.06)` : undefined,
        }} />
      ))}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 6,
        background: `linear-gradient(90deg, ${GOLD_L} 0%, ${GOLD} 100%)`, zIndex: 2,
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: 6,
        background: `linear-gradient(270deg, ${GOLD_L} 0%, ${GOLD} 100%)`, zIndex: 2,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(180deg, rgba(0,0,0,0.08) 0%, transparent 50%)",
      }} />
    </motion.div>
  );
}

/* ─── Bottom Face — sealed ────────────────────────────────────── */
function BottomFace() {
  const cardW = W / CARDS;
  return (
    <div style={{
      position: "absolute",
      top: "100%", left: 0,
      width: W, height: D,
      transform: "rotateX(-90deg)",
      transformOrigin: "50% 0%",
      border: `1px solid ${GOLD_D}`,
      borderTop: "none",
      borderRadius: "0 0 8px 8px",
      overflow: "hidden",
      background: CREAM,
    }}>
      {Array.from({ length: CARDS }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: i * cardW, top: 0, bottom: 0,
          width: cardW,
          background: i % 3 === 0 ? IVORY_D : i % 3 === 1 ? CREAM : "#ddd6c8",
          borderRight: cardW >= 1 ? `0.5px solid rgba(0,0,0,0.07)` : undefined,
        }} />
      ))}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 6,
        background: `linear-gradient(90deg, ${GOLD} 0%, ${GOLD_D} 100%)`, zIndex: 2,
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: 6,
        background: `linear-gradient(270deg, ${GOLD} 0%, ${GOLD_D} 100%)`, zIndex: 2,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(0deg, rgba(0,0,0,0.12) 0%, transparent 50%)",
      }} />
    </div>
  );
}

/* ─── Ace Card Face — rises from the box ─────────────────────── */
function AceFace() {
  return (
    <div style={{
      width: W, height: H,
      borderRadius: 10,
      background: `linear-gradient(170deg, ${IVORY_L} 0%, ${IVORY} 55%, ${IVORY_D} 100%)`,
      border: `1.5px solid ${GOLD_D}`,
      position: "relative", overflow: "hidden",
      boxShadow: `0 16px 50px rgba(0,0,0,0.55), 0 4px 12px rgba(0,0,0,0.3), inset 0 0 0 1px rgba(255,255,255,0.55)`,
    }}>
      {/* Gloss */}
      <div style={{
        position: "absolute", inset: 0, borderRadius: "inherit",
        background: "linear-gradient(145deg, rgba(255,255,255,0.52) 0%, transparent 45%)",
        pointerEvents: "none",
      }} />
      {/* Gold outer frame */}
      <div style={{ position: "absolute", inset: 7, border: `1.5px solid ${GOLD}`, borderRadius: 5 }} />
      {/* Gold inner frame */}
      <div style={{ position: "absolute", inset: 12, border: `0.5px solid rgba(201,168,76,0.4)`, borderRadius: 3 }} />

      {/* Top-left corner index */}
      <div style={{
        position: "absolute", top: 10, left: 12,
        fontFamily: "Georgia, serif", lineHeight: 1, textAlign: "center", color: "#111",
        userSelect: "none",
      }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>A</div>
        <div style={{ fontSize: 15, marginTop: 1 }}>♠</div>
      </div>

      {/* Bottom-right corner index */}
      <div style={{
        position: "absolute", bottom: 10, right: 12,
        fontFamily: "Georgia, serif", lineHeight: 1, textAlign: "center",
        transform: "rotate(180deg)", color: "#111", userSelect: "none",
      }}>
        <div style={{ fontSize: 22, fontWeight: 900, letterSpacing: "-0.02em" }}>A</div>
        <div style={{ fontSize: 15, marginTop: 1 }}>♠</div>
      </div>

      {/* Center spade */}
      <div style={{
        position: "absolute", top: "47%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 90, lineHeight: 1, color: "#111",
        textShadow: `0 2px 0 rgba(0,0,0,0.1), 0 0 18px rgba(201,168,76,0.18)`,
        userSelect: "none",
      }}>♠</div>

      {/* Subtle gold glow at bottom — where it meets the box opening */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 50,
        background: `linear-gradient(to top, rgba(201,168,76,0.12), transparent)`,
        pointerEvents: "none",
      }} />
    </div>
  );
}

// Default 3D angle so sides are always visible (not edge-on)
const BASE_RX = 0;
const BASE_RY = 0;

/* ─── Sweep Card — single element handles both rise from box AND sweep ── */
function SweepCard({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const RISE = H + 70; // 290px — how far above the box the card rises

  // Phase 1 [0.25→0.40]: rise out of the box (starts immediately after box opens)
  const y = useTransform(scrollYProgress, [0.25, 0.40], [0, -RISE]);

  // clipPath reveals the card as it rises (simulates card coming out of box opening)
  const clipPath = useTransform(y, v => `inset(0px 0px ${Math.max(0, H + v)}px 0px)`);

  // fade in when rising starts — no fade out, card exits off-screen
  const opacity = useTransform(scrollYProgress, [0.23, 0.27], [0, 1]);

  // Phase 3 [0.57→0.62]: dart left
  // Phase 4 [0.62→0.74]: sweep right while growing large
  // After 0.74: continues right, fully exits the page
  const x = useTransform(scrollYProgress,
    [0.57, 0.62, 0.62, 0.74, 0.82],
    ["0vw", "-63vw", "-63vw", "73vw", "120vw"]
  );

  const scale = useTransform(scrollYProgress,
    [0.57, 0.63, 0.69, 0.74],
    [1,    1,    4.2,  4.2]
  );

  const rotate = useTransform(scrollYProgress, [0.62, 0.70, 0.74], [0, -3, 0]);

  return (
    <motion.div style={{
      position: "fixed",
      bottom: 40, // aligned with box bottom
      left: `calc(50% - ${W / 2}px)`,
      y, x, scale, rotate, opacity, clipPath,
      zIndex: 200,
      pointerEvents: "none",
      width: W, height: H,
      filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.7)) drop-shadow(0 4px 16px rgba(201,168,76,0.25))",
    }}>
      <AceFace />
    </motion.div>
  );
}

/* ─── CardBox3D ──────────────────────────────────────────────── */
function CardBox3D({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const rect = wrap.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    inner.style.transform  = `rotateX(${BASE_RX + (-dy * 15)}deg) rotateY(${BASE_RY + (dx * 22)}deg)`;
    inner.style.transition = "transform 0.08s ease-out";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform  = `rotateX(${BASE_RX}deg) rotateY(${BASE_RY}deg)`;
    inner.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 700, cursor: "pointer" }}
    >
      <div
        ref={innerRef}
        style={{
          width: W, height: H,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: `rotateX(${BASE_RX}deg) rotateY(${BASE_RY}deg)`,
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <InsideCards scrollYProgress={scrollYProgress} />
        <FrontFace />
        <RightFace scrollYProgress={scrollYProgress} />
        <LeftFace scrollYProgress={scrollYProgress} />
        <TopFace scrollYProgress={scrollYProgress} />
        <BottomFace />
      </div>
    </div>
  );
}

/* ─── LandingSection ─────────────────────────────────────────── */
export default function LandingSection({
  introPlaying = false,
  onRevealChange,
}: {
  introPlaying?: boolean;
  onRevealChange?: (v: boolean) => void;
}) {
  const [textVisible, setTextVisible] = useState(false);
  const outerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: rawProgress } = useScroll({
    target: outerRef,
    offset: ["start start", "end start"],
  });
  const scrollYProgress = useSpring(rawProgress, { stiffness: 130, damping: 22, mass: 0.4 });

  // Box drops off screen after card is fully risen
  const sceneY = useTransform(scrollYProgress, [0.40, 0.52], [0, 620]);

  // Sticky section wipes from left→right during card sweep
  const stickyClipLeft = useTransform(scrollYProgress, [0.62, 0.74], ["0%", "110%"]);
  const stickyClipPath = useTransform(stickyClipLeft, c => `inset(0 0 0 ${c})`);

  // HeroSection fixed during [0.58, ~end of section], then unfixes seamlessly
  const prevReveal = useRef(false);
  useMotionValueEvent(rawProgress, "change", (latest) => {
    const reveal = latest >= 0.58 && latest < 0.998;
    if (reveal !== prevReveal.current) {
      prevReveal.current = reveal;
      onRevealChange?.(reveal);
    }
  });

  return (
    <div ref={outerRef} style={{ height: "420vh", position: "relative" }}>
    <motion.section style={{
      height: "100vh",
      position: "sticky",
      top: 0,
      overflow: "hidden",
      background: "var(--bg)",
      zIndex: 20,
      clipPath: stickyClipPath,
    }}>
      {/* Center content */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "1.5rem", direction: "rtl",
        textAlign: "center", padding: "0 1.5rem",
      }}>
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={textVisible ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          style={{
            width: 48, height: 1,
            background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.7), transparent)",
          }}
        />
        <motion.span
          initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0, filter: "blur(8px)" }}
          animate={textVisible
            ? { clipPath: "circle(150% at 50% 50%)", opacity: 1, filter: "blur(0px)" }
            : { clipPath: "circle(0% at 50% 50%)", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{ fontSize: "0.7rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600 }}
        >
          ✦ &nbsp; חוויה אינטראקטיבית &nbsp; ✦
        </motion.span>
        <motion.h2
          initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0, filter: "blur(16px)" }}
          animate={textVisible
            ? { clipPath: "circle(150% at 50% 50%)", opacity: 1, filter: "blur(0px)" }
            : { clipPath: "circle(0% at 50% 50%)", opacity: 0, filter: "blur(16px)" }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            fontFamily: "var(--font-playfair)", fontStyle: "italic", fontWeight: 600,
            fontSize: "clamp(2rem, 5vw, 3.6rem)", lineHeight: 1.2, color: "var(--text)", margin: 0,
          }}
        >
          בחר קלף מהחפיסה
        </motion.h2>
        <motion.p
          initial={{ clipPath: "circle(0% at 50% 50%)", opacity: 0, filter: "blur(8px)" }}
          animate={textVisible
            ? { clipPath: "circle(150% at 50% 50%)", opacity: 1, filter: "blur(0px)" }
            : { clipPath: "circle(0% at 50% 50%)", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)", color: "var(--text-muted)", lineHeight: 1.7, maxWidth: 420, margin: 0 }}
        >
          גלול למטה — ותגלה מה הקלף שבחרת עוד לפני שידעת שבחרת
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={textVisible ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.4rem", marginTop: "0.5rem" }}
        >
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "rgba(138,138,128,0.6)" }}>גלול</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 36, background: "linear-gradient(to bottom, rgba(201,168,76,0.6), transparent)" }}
          />
        </motion.div>
      </div>

      {/* Gold glow under box */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 350, height: 120,
        background: "radial-gradient(ellipse at center, rgba(201,168,76,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* 3D card box — drops off screen after card is out */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}>
        <motion.div style={{
          y: sceneY,
          filter: "drop-shadow(0 20px 50px rgba(0,0,0,0.7)) drop-shadow(0 4px 16px rgba(201,168,76,0.25))",
        }}>
          <motion.div
            initial={{ y: 260, opacity: 0 }}
            animate={introPlaying ? { y: 260, opacity: 0 } : { y: 0, opacity: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
            onAnimationComplete={() => { if (!introPlaying) setTextVisible(true); }}
          >
            <CardBox3D scrollYProgress={scrollYProgress} />
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
    <SweepCard scrollYProgress={scrollYProgress} />
    </div>
  );
}
