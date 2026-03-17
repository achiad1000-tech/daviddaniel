"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const videos = [
  {
    label: "הופעה בכנס שנתי — 2024",
    description: "קריאת מחשבות בפני 300 מנכ\"לים",
  },
  {
    label: "ילד בן 8 עוצר את דוד",
    description: "הרגע שסחף את הרשת",
  },
  {
    label: "גאלה של חברת היי-טק",
    description: "20 דקות שלא ישכחו",
  },
  {
    label: "Behind the Scenes",
    description: "מאחורי הקלעים של הכנה להופעה",
  },
];

export default function VideoGallery() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section
      id="gallery"
      className="section-padding"
      style={{ background: "var(--bg)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            גלריה
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black"
          >
            ראה כדי <span className="gold-gradient">להאמין</span>
          </motion.h2>
          <div className="gold-divider mt-4" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[var(--text-muted)] max-w-lg mx-auto"
          >
            רגעים בלתי נשכחים מהופעות אחרונות — צפה בעצמך.
          </motion.p>
        </div>

        {/* Grid */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 lg:gap-6"
        >
          {videos.map((video, i) => (
            <motion.div
              key={i}
              variants={{
                hidden: { opacity: 0, scale: 0.96 },
                visible: { opacity: 1, scale: 1, transition: { duration: 0.55, ease: "easeOut" } },
              }}
              className="video-placeholder cursor-pointer group"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Gradient overlay */}
              <div
                className="absolute inset-0 transition-opacity duration-400"
                style={{
                  background:
                    "linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 60%)",
                  opacity: hovered === i ? 1 : 0.5,
                }}
              />

              {/* Gold shimmer on hover */}
              {hovered === i && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(201,168,76,0.06) 0%, transparent 70%)",
                  }}
                />
              )}

              {/* Play button */}
              <motion.div
                animate={{ scale: hovered === i ? 1.1 : 1 }}
                transition={{ duration: 0.2 }}
                className="relative z-10 flex flex-col items-center gap-3"
              >
                <div
                  className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                  style={{
                    borderColor: hovered === i ? "var(--gold)" : "rgba(255,255,255,0.4)",
                    background: hovered === i
                      ? "rgba(201,168,76,0.15)"
                      : "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(4px)",
                  }}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="mr-[-4px]"
                    style={{ color: hovered === i ? "var(--gold)" : "white" }}
                  >
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                </div>
              </motion.div>

              {/* Caption */}
              <div className="absolute bottom-4 right-4 left-4 z-10">
                <p className="text-white font-semibold text-sm md:text-base leading-tight">
                  {video.label}
                </p>
                <p className="text-[rgba(255,255,255,0.6)] text-xs mt-0.5">
                  {video.description}
                </p>
              </div>

              {/* Corner number */}
              <div className="absolute top-4 left-4 text-[var(--gold)] text-xs font-bold tracking-widest opacity-60">
                {String(i + 1).padStart(2, "0")}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
