"use client";

import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.15, ease: "easeOut" },
  }),
};

export default function AboutSection() {
  return (
    <section id="about" className="section-padding" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Image / Visual side ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className="order-2 lg:order-1"
          >
            <div className="relative">
              {/* Main image placeholder */}
              <div
                className="relative rounded-lg overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  background: "var(--bg-card)",
                  border: "1px solid var(--border)",
                  maxHeight: "520px",
                }}
              >
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
                {/* Placeholder silhouette */}
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 text-[var(--text-muted)]">
                  <div className="w-24 h-24 rounded-full border-2 border-[var(--border)] flex items-center justify-center">
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <circle cx="12" cy="7" r="4" /><path d="M4 21v-1a8 8 0 0 1 16 0v1" />
                    </svg>
                  </div>
                  <span className="text-sm tracking-wider">תמונה מקצועית</span>
                </div>
              </div>

              {/* Floating accent card */}
              <div
                className="absolute -bottom-5 -left-5 p-4 rounded-lg shadow-2xl"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid rgba(201,168,76,0.3)",
                  minWidth: "150px",
                }}
              >
                <p className="text-[var(--gold)] font-black text-3xl leading-none">500+</p>
                <p className="text-[var(--text-muted)] text-sm mt-1">הופעות בהצלחה</p>
              </div>

              {/* Gold corner accent */}
              <div
                className="absolute -top-3 -right-3 w-16 h-16 pointer-events-none"
                style={{
                  borderTop: "2px solid var(--gold)",
                  borderRight: "2px solid var(--gold)",
                  borderRadius: "0 8px 0 0",
                  opacity: 0.5,
                }}
              />
            </div>
          </motion.div>

          {/* ── Text side ── */}
          <div className="order-1 lg:order-2 flex flex-col gap-5">
            <motion.span
              variants={fadeUp}
              custom={0}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="section-label"
            >
              מי אני
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight"
            >
              הסוד שאי-אפשר<br />
              <span className="gold-gradient">להסביר</span>
            </motion.h2>

            <div className="gold-divider gold-divider-right" />

            <motion.p
              variants={fadeUp}
              custom={2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed"
            >
              דוד דניאל הוא אמן חושים מוביל בישראל, המשלב פסיכולוגיה,
              אמנות הבמה וכוח סוגסטיה לכדי חוויה שמשאירה קהלים המומים —
              ומדברים על כך שבועות לאחר מכן.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-[var(--text-muted)] text-base leading-relaxed"
            >
              במהלך קריירה של מעל עשר שנים, דוד הופיע בפני אלפי צופים
              באירועי חברות של ארגונים מובילים, בחתונות, ובמסגרות בימתיות.
              כל הופעה בנויה בהתאמה אישית — כי אין שתי קהלים זהות.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="text-[var(--text-muted)] text-base leading-relaxed"
            >
              האמנות שלו אינה טריקים — היא חדירה אמיתית לתודעה האנושית.
              ולכן, כל מי שצפה בדוד מסכים על דבר אחד: <em>"זה לא ייאמן."</em>
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="pt-2"
            >
              <a href="#contact" className="btn-primary inline-flex">
                צור קשר עכשיו
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
