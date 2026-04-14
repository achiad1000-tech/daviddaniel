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
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              השאר פרטים
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
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
              viewport={{ once: false }}
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
              viewport={{ once: false }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-8 flex flex-col gap-4"
            >
              {/* Phone */}
              <a
                href="tel:0505552598"
                className="flex items-center gap-3 text-[var(--text-muted)] text-sm hover:text-[var(--gold)] transition-colors"
              >
                <div className="text-[var(--gold)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.6 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.73a16 16 0 0 0 6.29 6.29l1.62-1.62a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <span>0505552598</span>
              </a>

              {/* WhatsApp */}
              <a
                href="https://wa.me/972505552598?text=%D7%94%D7%99%D7%99%2C%20%D7%90%D7%A9%D7%9E%D7%97%20%D7%9C%D7%A4%D7%A8%D7%98%D7%99%D7%9D%20%D7%A2%D7%9C%20%D7%94%D7%9E%D7%95%D7%A4%D7%A2%20%D7%A9%D7%9C%20%D7%93%D7%95%D7%93"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-[var(--text-muted)] text-sm hover:text-[var(--gold)] transition-colors"
              >
                <div className="text-[var(--gold)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/>
                  </svg>
                </div>
                <span>0505552598</span>
              </a>

              {/* Email */}
              <a
                href="mailto:david@daviddaniel.com"
                className="flex items-center gap-3 text-[var(--text-muted)] text-sm hover:text-[var(--gold)] transition-colors"
              >
                <div className="text-[var(--gold)]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </div>
                <span>david@daviddaniel.com</span>
              </a>
            </motion.div>
          </div>

          {/* ── Right: Form ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
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
