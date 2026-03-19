"use client";

import Image from "next/image";
import { motion, Variants } from "framer-motion";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: i * 0.15,
      ease: "easeOut",
    },
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
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
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
                <Image
                  src="/david-daniel.jpg"
                  alt="דוד דניאל - אמן חושים"
                  fill
                  className="object-cover object-top"
                  priority
                />
                {/* Gradient overlay */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
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
              viewport={{ once: false, amount: 0.3 }}
              className="section-label"
            >
              מי אני
            </motion.span>

            <motion.h2
              variants={fadeUp}
              custom={1}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
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
              viewport={{ once: false, amount: 0.3 }}
              className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed"
            >
              תתכוננו לחוויה שלא ראיתם קודם.
              45 דקות של צחוק, הפתעה, רגעים בלתי נשכחים והרבה "איך הוא עשה את זה?!"
              דוד דניאל משלב אומנות חושים מתקדמת, קריאת מחשבות, השפעה על תת־המודע והומור חד שמרים את כל הקהל.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={3}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-[var(--text-muted)] text-base leading-relaxed"
            >
              המופע בנוי כך שהקהל לא רק צופה – אלא חלק בלתי נפרד מהקסם.
              במהלך ההופעה האורחים עולים לבמה, משתתפים, מופתעים ובעיקר נהנים מכל רגע.
              ובמרכז – בעל/ת האירוע מקבלים רגע מיוחד שלא ישכחו לעולם.
            </motion.p>
            <motion.p
              variants={fadeUp}
              custom={4}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
              className="text-[var(--text-muted)] text-base leading-relaxed"
            >
              ומהרגע הראשון? הקסם כבר מתחיל לעבוד…
              דוד דניאל מגיע עם אנרגיה מחשמלת, מתקשר עם הקהל ויוצר אווירה סוחפת עוד לפני שהמופע הרשמי מתחיל.
              זה לא עוד מופע – זו חוויה שמדברים עליה הרבה אחרי שהיא נגמרת.
            </motion.p>

            <motion.div
              variants={fadeUp}
              custom={5}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.3 }}
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
