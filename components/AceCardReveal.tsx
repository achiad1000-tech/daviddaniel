"use client";

import { useScroll, useTransform, motion } from "framer-motion";

function AceOfSpades() {
  return (
    <div
      style={{
        width: 260,
        height: 364,
        borderRadius: 18,
        background: "#fefefe",
        border: "1.5px solid #e0e0e0",
        boxShadow: "0 30px 100px rgba(0,0,0,0.85), 0 0 0 1px rgba(0,0,0,0.08)",
        position: "relative",
        overflow: "hidden",
        fontFamily: "Georgia, serif",
        color: "#111",
        userSelect: "none",
      }}
    >
      {/* Top-left corner */}
      <div style={{ position: "absolute", top: 12, left: 14, lineHeight: 1, textAlign: "center" }}>
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em" }}>A</div>
        <div style={{ fontSize: 18 }}>♠</div>
      </div>

      {/* Bottom-right corner */}
      <div style={{ position: "absolute", bottom: 12, right: 14, lineHeight: 1, textAlign: "center", transform: "rotate(180deg)" }}>
        <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: "-0.02em" }}>A</div>
        <div style={{ fontSize: 18 }}>♠</div>
      </div>

      {/* Center spade */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -52%)",
        fontSize: 160, lineHeight: 1, color: "#111",
      }}>♠</div>

      {/* Gold shimmer border */}
      <div style={{
        position: "absolute", inset: 6, borderRadius: 12,
        border: "1px solid rgba(201,168,76,0.2)", pointerEvents: "none",
      }} />
    </div>
  );
}

export default function AceCardReveal() {
  const { scrollY } = useScroll();

  // Phase 1 (0–100):    card hidden inside box
  // Phase 2 (100–500):  flap opens, card slowly rises out of box
  // Phase 3 (500–800):  card grows to cover full screen
  // Phase 4 (800–1100): card shrinks + drifts to bottom-right corner

  const y = useTransform(
    scrollY,
    [0,       100,     200,     500,     800,     1100],
    ["84vh",  "84vh",  "76vh",  "55vh",  "20vh",  "80vh"]
  );

  const scale = useTransform(
    scrollY,
    [0,    100,   200,   500,   800,   1100],
    [0.07, 0.07,  0.13,  0.45,  5.2,   0.15]
  );

  const x = useTransform(
    scrollY,
    [800, 1100],
    ["0vw", "35vw"]
  );

  const rotate = useTransform(
    scrollY,
    [0, 800, 1100],
    [0, 0, 18]
  );

  const opacity = useTransform(
    scrollY,
    [0, 90, 120, 1000, 1150],
    [0, 0,  1,   1,    0.7]
  );

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        pointerEvents: "none",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <motion.div style={{ position: "absolute", y, x, scale, rotate, opacity }}>
        <AceOfSpades />
      </motion.div>
    </div>
  );
}
