"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "אודות", href: "#about" },
  { label: "הופעות", href: "#services" },
  { label: "גלריה", href: "#gallery" },
  { label: "המלצות", href: "#testimonials" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar({ introPlaying = false, onOpenModal }: { introPlaying?: boolean; onOpenModal?: () => void }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: introPlaying ? 0 : 1 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: introPlaying ? 0 : 0.2 }}
        className="fixed top-0 inset-x-0 z-50 transition-all duration-300"
        style={{
          background: scrolled
            ? "rgba(8, 8, 8, 0.92)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(201,168,76,0.12)" : "none",
        }}
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col leading-none select-none cursor-pointer"
              style={{ textDecoration: "none", gap: "0.2rem" }}
              initial={{ opacity: 0, scale: 0, filter: "blur(6px)" }}
              animate={
                introPlaying
                  ? { opacity: 0, scale: 0, filter: "blur(6px)" }
                  : { opacity: 1, scale: 1, filter: "blur(0px)" }
              }
              transition={{
                opacity: { duration: 0.5, delay: 0.25 },
                scale: { type: "spring", stiffness: 380, damping: 18, delay: 0.15 },
                filter: { duration: 0.5, delay: 0.25 },
              }}
            >
              <span
                className="font-[family-name:var(--font-playfair)] italic font-semibold tracking-wide"
                style={{
                  fontSize: "1.125rem",
                  background: "linear-gradient(135deg, #C9A84C, #E5C76B, #9A7B2E)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                David Daniel
              </span>
              <span
                className="tracking-[0.25em] uppercase"
                style={{ fontSize: "10px", color: "var(--text-muted)" }}
              >
                אמן חושים
              </span>
            </motion.a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-sm font-medium text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors duration-200"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA + Mobile Menu */}
            <div className="flex items-center gap-3">
              <button onClick={onOpenModal} className="btn-primary text-sm py-2 px-5 hidden sm:inline-flex">
                הזמן הופעה
              </button>

              {/* Hamburger */}
              <button
                onClick={() => setMenuOpen((p) => !p)}
                className="md:hidden flex flex-col justify-center items-center w-10 h-10 gap-1.5 rounded focus:outline-none"
                aria-label="תפריט"
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-[var(--gold)] origin-center transition-all"
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-6 h-0.5 bg-[var(--gold)]"
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-0.5 bg-[var(--gold)] origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 top-16 z-40 md:hidden bg-[rgba(8,8,8,0.97)] border-b border-[var(--border)] backdrop-blur-xl"
          >
            <div className="section-container py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-right text-lg font-medium py-3 text-[var(--text)] hover:text-[var(--gold)] transition-colors border-b border-[var(--border)] last:border-0"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
