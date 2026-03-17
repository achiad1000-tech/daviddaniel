"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { success: false, message: "" };

export default function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) {
      formRef.current?.reset();
    }
  }, [state.success]);

  return (
    <section
      id="contact"
      className="section-padding"
      style={{ background: "var(--bg)" }}
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24 items-start">
          {/* ── Left: Copy ── */}
          <div>
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              השאר פרטים
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black leading-tight"
            >
              נדבר על<br />
              <span className="gold-gradient">ההופעה שלך</span>
            </motion.h2>
            <div className="gold-divider gold-divider-right mt-4" />

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-[var(--text-muted)] text-base leading-relaxed max-w-md"
            >
              כל הופעה מתחילה בשיחה. ספר לי על האירוע שלך ואחזור
              אליך תוך 24 שעות עם הצעה מותאמת אישית.
            </motion.p>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-col gap-4"
            >
              {[
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  ),
                  text: "050-000-0000",
                },
                {
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  ),
                  text: "david@daviddaniel.com",
                },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 text-[var(--text-muted)] text-sm"
                >
                  <div className="text-[var(--gold)]">{item.icon}</div>
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="rounded-xl p-7 md:p-9"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border)",
              }}
            >
              <form ref={formRef} action={formAction} className="flex flex-col gap-5">
                {/* Name */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-sm font-medium text-[var(--text)]">
                    שם מלא <span className="text-[var(--gold)]">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="ישראל ישראלי"
                    required
                    className="input-dark"
                  />
                </div>

                {/* Phone */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-sm font-medium text-[var(--text)]">
                    טלפון <span className="text-[var(--gold)]">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="05X-XXX-XXXX"
                    required
                    className="input-dark"
                    dir="ltr"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-sm font-medium text-[var(--text)]">
                    אימייל
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    className="input-dark"
                    dir="ltr"
                  />
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-sm font-medium text-[var(--text)]">
                    סוג האירוע / הודעה
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="ספר לי על האירוע — תאריך משוער, סוג, מספר משתתפים..."
                    className="input-dark resize-none"
                  />
                </div>

                {/* Feedback */}
                {state.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="rounded-md px-4 py-3 text-sm font-medium"
                    style={{
                      background: state.success
                        ? "rgba(201,168,76,0.1)"
                        : "rgba(220,38,38,0.1)",
                      border: `1px solid ${state.success ? "rgba(201,168,76,0.3)" : "rgba(220,38,38,0.3)"}`,
                      color: state.success ? "var(--gold)" : "#f87171",
                    }}
                  >
                    {state.message}
                  </motion.div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary w-full text-base py-4 mt-1 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isPending ? (
                    <span className="flex items-center gap-2 justify-center">
                      <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
                      </svg>
                      שולח...
                    </span>
                  ) : (
                    "שלח פנייה"
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
