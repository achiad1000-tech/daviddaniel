"use client";

import { useRef, useCallback, useState } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

const W = 160;
const H = 220;
const D = 44;
const CARDS = 52;

const RED    = "#C0192B";
const RED_D  = "#9e1322";

/* ─── Front Face ─────────────────────────────────────────────── */
function FrontFace() {
  return (
    <div style={{
      position: "absolute", inset: 0,
      borderRadius: "10px 10px 9px 9px",
      background: `linear-gradient(170deg, #cc1e2f 0%, ${RED} 40%, ${RED_D} 100%)`,
      border: "1px solid rgba(0,0,0,0.35)",
      overflow: "hidden",
    }}>
      {/* Gloss */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        background: "linear-gradient(155deg, rgba(255,255,255,0.15) 0%, transparent 50%)",
        borderRadius: "inherit",
      }} />

      {/* Outer white border */}
      <div style={{
        position: "absolute", inset: 5,
        border: "2px solid rgba(255,255,255,0.88)",
        borderRadius: 6,
      }} />

      {/* Inner white border */}
      <div style={{
        position: "absolute", inset: 11,
        border: "1px solid rgba(255,255,255,0.5)",
        borderRadius: 3,
      }} />

      {/* Diamond cross-hatch pattern */}
      <div style={{
        position: "absolute", inset: 14,
        backgroundImage: `
          repeating-linear-gradient(45deg,  rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 9px),
          repeating-linear-gradient(-45deg, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 1px, transparent 1px, transparent 9px)
        `,
        borderRadius: 2,
      }} />

      {/* Corner ornaments */}
      {[
        { top: 12, left: 12 },
        { top: 12, right: 12 },
        { bottom: 12, left: 12 },
        { bottom: 12, right: 12 },
      ].map((pos, i) => (
        <div key={i} style={{
          position: "absolute", ...pos,
          fontSize: 10, color: "rgba(255,255,255,0.7)",
          lineHeight: 1, userSelect: "none",
          fontFamily: "Georgia, serif",
        }}>✦</div>
      ))}

      {/* Top-left index */}
      <div style={{
        position: "absolute", top: 12, left: 10,
        fontSize: 11, fontFamily: "Georgia, serif", fontWeight: 700,
        color: "rgba(255,255,255,0.85)", lineHeight: 1.35, textAlign: "center",
      }}>A<br />♠</div>

      {/* Bottom-right index */}
      <div style={{
        position: "absolute", bottom: 10, right: 10,
        fontSize: 11, fontFamily: "Georgia, serif", fontWeight: 700,
        color: "rgba(255,255,255,0.85)", lineHeight: 1.35, textAlign: "center",
        transform: "rotate(180deg)",
      }}>A<br />♠</div>

      {/* Center spade */}
      <div style={{
        position: "absolute", top: "41%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontSize: 80, lineHeight: 1,
        color: "rgba(255,255,255,0.93)",
        textShadow: "0 2px 18px rgba(0,0,0,0.45)",
        userSelect: "none",
      }}>♠</div>

      {/* Brand name */}
      <div style={{
        position: "absolute", bottom: 24, left: 0, right: 0, textAlign: "center",
      }}>
        <div style={{
          fontFamily: "Georgia, 'Times New Roman', serif",
          fontStyle: "italic", fontWeight: 700,
          fontSize: 15.5, letterSpacing: "0.04em",
          color: "rgba(255,255,255,0.96)",
          textShadow: "0 1px 6px rgba(0,0,0,0.35)",
        }}>David Daniel</div>
        <div style={{
          fontSize: 7.5, letterSpacing: "0.3em",
          textTransform: "uppercase", marginTop: 3,
          color: "rgba(255,210,130,0.8)",
        }}>אמן חושים</div>
      </div>
    </div>
  );
}

/* ─── Right Face — card stack edge ───────────────────────────── */
function RightFace() {
  const cardH = H / CARDS;
  return (
    <div style={{
      position: "absolute",
      top: 0, left: "100%",
      width: D, height: H,
      transform: "rotateY(90deg)",
      transformOrigin: "0% 50%",
      border: "1px solid rgba(0,0,0,0.28)",
      borderLeft: "none",
      borderRadius: "0 8px 8px 0",
      overflow: "hidden",
      background: "#f8f6f2",
    }}>
      {/* Card layer stripes */}
      {Array.from({ length: CARDS }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          top: i * cardH,
          left: 0, right: 0,
          height: cardH,
          background: i % 3 === 0 ? "#fefcf8" : i % 3 === 1 ? "#f8f6f2" : "#f4f1ec",
          borderBottom: cardH >= 1 ? "0.5px solid rgba(0,0,0,0.07)" : undefined,
        }} />
      ))}

      {/* Red stripe top edge (card back color) */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 5,
        background: `linear-gradient(180deg, ${RED} 0%, ${RED_D} 100%)`,
        zIndex: 2,
      }} />
      {/* Red stripe bottom edge */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 5,
        background: `linear-gradient(0deg, ${RED} 0%, ${RED_D} 100%)`,
        zIndex: 2,
      }} />

      {/* Inner shadow from front face */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(90deg, rgba(0,0,0,0.22) 0%, rgba(0,0,0,0.06) 45%, transparent 100%)",
      }} />
    </div>
  );
}

/* ─── Left Face — card stack edge (in shadow) ────────────────── */
function LeftFace() {
  const cardH = H / CARDS;
  return (
    <div style={{
      position: "absolute",
      top: 0, right: "100%",
      width: D, height: H,
      transform: "rotateY(-90deg)",
      transformOrigin: "100% 50%",
      border: "1px solid rgba(0,0,0,0.35)",
      borderRight: "none",
      borderRadius: "8px 0 0 8px",
      overflow: "hidden",
      background: "#e8e4de",
    }}>
      {/* Card layer stripes */}
      {Array.from({ length: CARDS }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          top: i * cardH,
          left: 0, right: 0,
          height: cardH,
          background: i % 3 === 0 ? "#edeae4" : i % 3 === 1 ? "#e8e4de" : "#e2ded8",
          borderBottom: cardH >= 1 ? "0.5px solid rgba(0,0,0,0.08)" : undefined,
        }} />
      ))}

      {/* Red stripe top/bottom */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: 5,
        background: `linear-gradient(180deg, #8a1020 0%, #6d0c18 100%)`,
        zIndex: 2,
      }} />
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: 5,
        background: `linear-gradient(0deg, #8a1020 0%, #6d0c18 100%)`,
        zIndex: 2,
      }} />

      {/* Strong shadow (this face is in shade) */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(270deg, rgba(0,0,0,0.38) 0%, rgba(0,0,0,0.18) 60%, rgba(0,0,0,0.08) 100%)",
      }} />
    </div>
  );
}

/* ─── Top Face — scroll-driven opening ───────────────────────── */
function TopFace({ scrollY }: { scrollY: MotionValue<number> }) {
  const rotateX = useTransform(scrollY, [80, 500], [90, -95]);
  const cardW = W / CARDS;
  return (
    <motion.div style={{
      position: "absolute",
      bottom: "100%", left: 0,
      width: W, height: D,
      rotateX,
      transformOrigin: "50% 100%",
      border: "1px solid rgba(0,0,0,0.3)",
      borderBottom: "none",
      borderRadius: "8px 8px 0 0",
      overflow: "hidden",
      background: "#f5f2ed",
    }}>
      {Array.from({ length: CARDS }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: i * cardW,
          top: 0, bottom: 0,
          width: cardW,
          background: i % 3 === 0 ? "#fefcf8" : i % 3 === 1 ? "#f5f2ed" : "#efece6",
          borderRight: cardW >= 1 ? "0.5px solid rgba(0,0,0,0.07)" : undefined,
        }} />
      ))}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 5,
        background: `linear-gradient(90deg, ${RED} 0%, ${RED_D} 100%)`, zIndex: 2,
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: 5,
        background: `linear-gradient(270deg, ${RED} 0%, ${RED_D} 100%)`, zIndex: 2,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(180deg, rgba(0,0,0,0.2) 0%, transparent 60%)",
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
      border: "1px solid rgba(0,0,0,0.3)",
      borderTop: "none",
      borderRadius: "0 0 8px 8px",
      overflow: "hidden",
      background: "#eae7e1",
    }}>
      {Array.from({ length: CARDS }).map((_, i) => (
        <div key={i} style={{
          position: "absolute",
          left: i * cardW,
          top: 0, bottom: 0,
          width: cardW,
          background: i % 3 === 0 ? "#f0ede8" : i % 3 === 1 ? "#eae7e1" : "#e4e0da",
          borderRight: cardW >= 1 ? "0.5px solid rgba(0,0,0,0.07)" : undefined,
        }} />
      ))}
      <div style={{
        position: "absolute", top: 0, left: 0, bottom: 0, width: 5,
        background: `linear-gradient(90deg, #8a1020 0%, #6d0c18 100%)`, zIndex: 2,
      }} />
      <div style={{
        position: "absolute", top: 0, right: 0, bottom: 0, width: 5,
        background: `linear-gradient(270deg, #8a1020 0%, #6d0c18 100%)`, zIndex: 2,
      }} />
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        background: "linear-gradient(0deg, rgba(0,0,0,0.25) 0%, transparent 60%)",
      }} />
    </div>
  );
}

/* ─── CardBox3D ──────────────────────────────────────────────── */
function CardBox3D({ scrollY }: { scrollY: MotionValue<number> }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const wrapRef  = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const wrap  = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner) return;
    const rect = wrap.getBoundingClientRect();
    const dx = (e.clientX - (rect.left + rect.width  / 2)) / (rect.width  / 2);
    const dy = (e.clientY - (rect.top  + rect.height / 2)) / (rect.height / 2);
    inner.style.transform  = `rotateX(${-dy * 18}deg) rotateY(${dx * 22}deg)`;
    inner.style.transition = "transform 0.08s ease-out";
  }, []);

  const handleMouseLeave = useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return;
    inner.style.transform  = "rotateX(0deg) rotateY(0deg)";
    inner.style.transition = "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
  }, []);

  return (
    <div
      ref={wrapRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ perspective: 900, cursor: "pointer" }}
    >
      <div
        ref={innerRef}
        style={{
          width: W, height: H,
          position: "relative",
          transformStyle: "preserve-3d",
          transform: "rotateX(0deg) rotateY(0deg)",
          transition: "transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      >
        <FrontFace />
        <RightFace />
        <LeftFace />
        <TopFace scrollY={scrollY} />
        <BottomFace />
      </div>
    </div>
  );
}

/* ─── LandingSection ─────────────────────────────────────────── */
export default function LandingSection({ introPlaying = false }: { introPlaying?: boolean }) {
  const [textVisible, setTextVisible] = useState(false);
  const { scrollY } = useScroll();

  return (
    <section style={{
      height: "100vh",
      position: "relative",
      overflow: "hidden",
      background: "var(--bg)",
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

      {/* Red glow */}
      <div style={{
        position: "absolute", bottom: 0, left: "50%",
        transform: "translateX(-50%)",
        width: 350, height: 100,
        background: "radial-gradient(ellipse at center, rgba(192,25,43,0.2) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      {/* 3D card box */}
      <div style={{ position: "absolute", bottom: 40, left: "50%", transform: "translateX(-50%)" }}>
        <motion.div
          initial={{ y: 260, opacity: 0 }}
          animate={introPlaying ? { y: 260, opacity: 0 } : { y: 0, opacity: 1 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.7 }}
          onAnimationComplete={() => { if (!introPlaying) setTextVisible(true); }}
        >
          <CardBox3D scrollY={scrollY} />
        </motion.div>
      </div>
    </section>
  );
}
