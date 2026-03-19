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

export default function Navbar() {
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
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
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
            <a
              href="#"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex flex-col leading-none select-none"
            >
              <span
                className="gold-gradient font-[family-name:var(--font-playfair)] italic text-lg md:text-xl font-semibold tracking-wide"
              >
                David Daniel
              </span>
              <span className="text-[10px] tracking-[0.25em] text-[var(--text-muted)] uppercase">
                אמן חושים
              </span>
            </a>

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
              <a href="#contact" className="btn-primary text-sm py-2 px-5 hidden sm:inline-flex">
                הזמן הופעה
              </a>

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
              <a href="#contact" className="btn-primary mt-4 text-base text-center" onClick={() => setMenuOpen(false)}>
                הזמן הופעה
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
