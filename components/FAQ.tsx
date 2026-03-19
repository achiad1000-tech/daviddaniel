"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "למי מתאים המופע?",
    a: "המופע מתאים לכל סוג אירוע — ימי הולדת, בר/בת מצווה, חתונות, מסיבות רווקות, ימי גיבוש, כנסים עסקיים, השקות מוצר וסיומי שנה. בקיצור, אם יש קהל — יש מופע.",
  },
  {
    q: "לאיזה ערים בארץ ניתן להזמין את המופע?",
    a: "דוד מגיע לכל מקום בארץ — תל אביב, ירושלים, חיפה, באר שבע ועוד. אין בעיה עם נסיעות, פשוט תאמו מראש.",
  },
  {
    q: "מה המחיר של המופע?",
    a: "המופע יכול להשתנות בהתאם לצרכי האירוע וכך גם המחיר שלו.",
    cta: { text: "צרו קשר ותקבלו הצעת מחיר", href: "#contact" },
  },
  {
    q: "כמה זמן נמשך המופע?",
    a: "45 דקות שירגישו כמו דקה אחת — כי כשכל הקהל עצור מנשימה, הזמן פשוט עובר אחרת.",
  },
  {
    q: "האם צריך להכין משהו מראש?",
    a: "כלום. דוד מגיע עם הכל. כל מה שצריך זה קהל נלהב, קצת מקום ואור סביר. לא נדרש ציוד טכני מיוחד.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="section-padding" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            שאלות נפוצות
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black"
          >
            יש לכם <span className="gold-gradient">שאלות?</span>
          </motion.h2>
          <div className="gold-divider mt-4" />
        </div>

        {/* Accordion */}
        <div className="max-w-2xl mx-auto flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="rounded-xl overflow-hidden"
              style={{ border: "1px solid var(--border)", background: "var(--bg-card)" }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 px-6 py-5 text-right"
                onClick={() => setOpen(open === i ? null : i)}
              >
                <span className="font-bold text-[var(--text)] text-base">{faq.q}</span>
                <span
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-300"
                  style={{
                    background: "rgba(201,168,76,0.08)",
                    border: "1px solid rgba(201,168,76,0.25)",
                    transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                    color: "var(--gold)",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <div className="px-6 pb-5 text-[var(--text-muted)] text-sm leading-relaxed flex flex-col gap-2">
                      <p>{faq.a}</p>
                      {faq.cta && (
                        <a href={faq.cta.href} className="text-[var(--gold)] hover:underline font-medium">
                          {faq.cta.text} ←
                        </a>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
