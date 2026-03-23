"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HeroSection({ fixed = false }: { fixed?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      id="hero"
      className={`${fixed ? "" : "relative"} flex items-center overflow-hidden`}
      style={{
        background: "var(--bg)",
        paddingTop: "150px",
        ...(fixed
          ? { position: "fixed", inset: 0, zIndex: 10 }
          : { marginBottom: "4rem" }),
      }}
    >
      {/* Background orbs */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 70% at 60% 40%, rgba(201,168,76,0.07) 0%, transparent 65%)",
          y: bgY,
        }}
      />
      <motion.div
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.09) 0%, transparent 70%)",
          filter: "blur(60px)",
        }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 w-[400px] h-[300px] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(201,168,76,0.05) 0%, transparent 70%)",
          filter: "blur(50px)",
        }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      <motion.div
        style={{ opacity }}
        className="section-container relative z-10 w-full py-14 md:py-24 lg:py-28"
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* ── Right: Text ── */}
          <div className="order-1 flex flex-col gap-5 md:gap-6 text-right">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <span className="section-label tracking-[0.3em]">
                ✦ &nbsp; מנטליסט &nbsp; · &nbsp; ישראל &nbsp; ✦
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="text-[clamp(2rem,6vw,4.5rem)] font-black leading-[1.08] tracking-tight"
            >
              מוכנים לחוויה של<br />
              <motion.span
                className="gold-gradient"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
              >
                טירוף חושים?
              </motion.span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed max-w-lg"
            >
              דוד דניאל מביא לאירוע שלכם ישירות ממסך הטלוויזיה — אמן החושים שכולם מדברים עליו.
              45 דקות של צחוק, הפתעה ורגעים שלא ישכחו לעולם.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="text-[var(--text-muted)] text-sm md:text-base leading-relaxed max-w-lg"
            >
              אם בדיוק חיפשתם מופע אנרגטי שמהפנט את כל הקהל —
              אתם במקום הנכון.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href="#contact"
                className="btn-primary inline-flex"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                להזמין את דוד
              </motion.a>
            </motion.div>
          </div>

          {/* ── Left: Video ── */}
          <motion.div
            initial={{ opacity: 0, x: -30, scale: 0.97 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 flex flex-col gap-4"
          >
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{
                border: "1px solid rgba(201,168,76,0.25)",
                boxShadow: "0 0 60px rgba(201,168,76,0.1), 0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              <video
                src="/david-showreel.mp4"
                controls
                playsInline
                className="w-full block"
                style={{ aspectRatio: "16/9", background: "#000" }}
              />
            </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </section>
  );
}
