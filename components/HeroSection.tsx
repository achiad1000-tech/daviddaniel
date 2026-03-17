"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToGallery = () => {
    document.querySelector("#gallery")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden"
      style={{ background: "var(--bg)" }}
    >
      {/* ── Cinematic background layers ── */}
      {/* Deep vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 50% 40%, rgba(201,168,76,0.06) 0%, transparent 65%)",
        }}
      />
      {/* Ambient top glow */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
        animate={{ scale: [1, 1.06, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Subtle horizontal lines */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(201,168,76,0.5) 60px, rgba(201,168,76,0.5) 61px)",
        }}
      />
      {/* Corner vignettes */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      {/* ── Parallax content ── */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-10 flex flex-col items-center text-center px-6 pt-20"
      >
        {/* Eyebrow label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="section-label tracking-[0.3em]">
            ✦ &nbsp; מנטליסט &nbsp; · &nbsp; ישראל &nbsp; ✦
          </span>
        </motion.div>

        {/* Main headline */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4 }}
          className="mt-4 text-[clamp(2.6rem,8vw,6rem)] font-black leading-[1.05] tracking-tight"
        >
          <span className="gold-gradient">אמן חושים</span>
          <br />
          <span className="text-[var(--text)]">דוד דניאל</span>
        </motion.h1>

        {/* Domain / Brand tag */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.65 }}
          className="mt-3 font-[family-name:var(--font-playfair)] italic text-[var(--gold)] text-xl md:text-2xl tracking-widest opacity-80"
        >
          DavidDaniel.com
        </motion.p>

        {/* Sub-tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-5 max-w-md text-[var(--text-muted)] text-base md:text-lg leading-relaxed"
        >
          חוויה בלתי נשכחת של קריאת מחשבות, השפעה נסתרת ומסתורין אמיתי —
          <br className="hidden md:block" />
          לאירועים עסקיים, פרטיים ובמות.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-8 flex flex-col sm:flex-row items-center gap-4"
        >
          <button onClick={scrollToContact} className="btn-primary text-base md:text-lg px-8 py-3.5">
            הזמן הופעה
          </button>
          <button onClick={scrollToGallery} className="btn-outline text-base md:text-lg px-8 py-3.5">
            צפה בסרטון
          </button>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-[var(--text-muted)] text-sm"
        >
          {["500+ הופעות", "חברות Fortune 500", "ביקורות ★★★★★"].map((badge) => (
            <span key={badge} className="flex items-center gap-2">
              <span className="text-[var(--gold)] text-xs">◆</span>
              {badge}
            </span>
          ))}
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}
      >
        <span className="text-[var(--text-muted)] text-xs tracking-widest uppercase">גלול למטה</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 border border-[var(--gold)] rounded-full flex items-start justify-center pt-1.5 opacity-60"
        >
          <div className="w-1 h-1.5 bg-[var(--gold)] rounded-full" />
        </motion.div>
      </motion.div>
    </section>
  );
}
