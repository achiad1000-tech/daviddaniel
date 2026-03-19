"use client";

import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const images = [
  { src: "/gallery-1.jpg", alt: "הופעת חושים" },
  { src: "/gallery-2.jpg", alt: "הופעת חושים" },
  { src: "/gallery-3.jpg", alt: "הופעת חושים" },
  { src: "/gallery-4.jpg", alt: "הופעת חושים" },
  { src: "/gallery-5.jpg", alt: "הופעת חושים" },
  { src: "/gallery-6.jpg", alt: "הופעת חושים" },
];

export default function VideoGallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);

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
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="section-label"
          >
            גלריה
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black"
          >
            ראה כדי <span className="gold-gradient">להאמין</span>
          </motion.h2>
          <div className="gold-divider mt-4" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-[var(--text-muted)] max-w-lg mx-auto"
          >
            רגעים בלתי נשכחים מהופעות אחרונות.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {images.map((img, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden rounded-xl cursor-pointer group"
              style={{
                aspectRatio: "4/3",
                border: "1px solid var(--border)",
              }}
              onClick={() => setLightbox(i)}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              {/* Hover overlay */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.25 }}
                style={{ background: "rgba(0,0,0,0.4)" }}
              >
                <motion.div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  initial={{ scale: 0.7, opacity: 0 }}
                  whileHover={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  style={{ background: "rgba(201,168,76,0.2)", border: "1px solid var(--gold)" }}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2">
                    <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.95)" }}
            onClick={() => setLightbox(null)}
          >
            <motion.button
              className="absolute top-5 right-5 text-white"
              style={{ opacity: 0.7 }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              onClick={() => setLightbox(null)}
            >
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </motion.button>

            {/* Prev */}
            <motion.button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white hidden sm:flex items-center justify-center w-10 h-10 rounded-full"
              style={{ opacity: 0.6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox - 1 + images.length) % images.length); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
            </motion.button>

            {/* Next */}
            <motion.button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white hidden sm:flex items-center justify-center w-10 h-10 rounded-full"
              style={{ opacity: 0.6, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.15)" }}
              whileHover={{ opacity: 1, scale: 1.1 }}
              onClick={(e) => { e.stopPropagation(); setLightbox((lightbox + 1) % images.length); }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
            </motion.button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full max-w-4xl max-h-[85vh]"
              style={{ aspectRatio: "4/3" }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={images[lightbox].src}
                alt={images[lightbox].alt}
                fill
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
