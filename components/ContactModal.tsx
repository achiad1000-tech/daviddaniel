"use client";

import { useActionState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { submitContact, type ContactState } from "@/app/actions/contact";

const initialState: ContactState = { success: false, message: "" };

export default function ContactModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [state, formAction, isPending] = useActionState(submitContact, initialState);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state.success]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  // Lock scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "rgba(0,0,0,0.75)",
            backdropFilter: "blur(4px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
          }}
        >
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border)",
              borderRadius: "1rem",
              padding: "2rem",
              width: "100%",
              maxWidth: "480px",
              maxHeight: "90vh",
              overflowY: "auto",
              direction: "rtl",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
              <div>
                <span className="section-label" style={{ fontSize: "0.65rem" }}>השאר פרטים</span>
                <h2 style={{ margin: "0.3rem 0 0", fontSize: "1.6rem", fontWeight: 800, lineHeight: 1.2 }}>
                  נדבר על{" "}
                  <span className="gold-gradient">ההופעה שלך</span>
                </h2>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: "none", border: "none", cursor: "pointer",
                  color: "var(--text-muted)", padding: "4px", flexShrink: 0,
                }}
                aria-label="סגור"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="gold-divider gold-divider-right" style={{ marginBottom: "1.5rem" }} />

            <form ref={formRef} action={formAction} className="flex flex-col gap-4">
              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-name" className="text-sm font-medium text-[var(--text)]">
                  שם מלא <span className="text-[var(--gold)]">*</span>
                </label>
                <input id="modal-name" name="name" type="text" placeholder="ישראל ישראלי" required className="input-dark" />
              </div>

              {/* Phone */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-phone" className="text-sm font-medium text-[var(--text)]">
                  טלפון <span className="text-[var(--gold)]">*</span>
                </label>
                <input id="modal-phone" name="phone" type="tel" placeholder="05X-XXX-XXXX" required className="input-dark" dir="ltr" />
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-email" className="text-sm font-medium text-[var(--text)]">
                  אימייל
                </label>
                <input id="modal-email" name="email" type="email" placeholder="you@company.com" className="input-dark" dir="ltr" />
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label htmlFor="modal-message" className="text-sm font-medium text-[var(--text)]">
                  סוג האירוע / הודעה
                </label>
                <textarea
                  id="modal-message"
                  name="message"
                  rows={3}
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
                    background: state.success ? "rgba(201,168,76,0.1)" : "rgba(220,38,38,0.1)",
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
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
