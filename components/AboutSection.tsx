"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function TextReveal({ children, className }: { children: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 40%"],
  });

  const words = children.split(" ");

  return (
    <div ref={ref} className={className}>
      {words.map((word, i) => {
        const start = i / words.length;
        const end = (i + 1) / words.length;
        return <Word key={i} word={word} range={[start, end]} progress={scrollYProgress} />;
      })}
    </div>
  );
}

function Word({
  word,
  range,
  progress,
}: {
  word: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span style={{ opacity, transition: "opacity 0.1s" }}>
      {word}{" "}
    </motion.span>
  );
}

function ScrollReveal({
  children,
  offset = 0,
  className,
}: {
  children: React.ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "start 60%"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [24 + offset * 6, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <motion.div ref={ref} style={{ y, opacity }} className={className}>
      {children}
    </motion.div>
  );
}

export default function AboutSection() {
  return (
    <section id="about" className="section-padding" style={{ background: "var(--bg)" }}>
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* ── Image / Visual side ── */}
          <ScrollReveal className="order-2 lg:order-1">
            <div className="relative">
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
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(201,168,76,0.08) 0%, transparent 50%, rgba(0,0,0,0.3) 100%)",
                  }}
                />
              </div>

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
          </ScrollReveal>

          {/* ── Text side ── */}
          <div className="order-1 lg:order-2 flex flex-col gap-5">
            <ScrollReveal offset={0}>
              <span className="section-label">מי אני</span>
            </ScrollReveal>

            <TextReveal className="text-3xl md:text-4xl lg:text-5xl font-black leading-tight">
              הסוד שאי-אפשר להסביר
            </TextReveal>

            <div className="gold-divider gold-divider-right" />

            <TextReveal className="text-[var(--text-muted)] text-base md:text-lg leading-relaxed">
              תתכוננו לחוויה שלא ראיתם קודם. 45 דקות של צחוק, הפתעה, רגעים בלתי נשכחים והרבה איך הוא עשה את זה?! דוד דניאל משלב אומנות חושים מתקדמת, קריאת מחשבות, השפעה על תת־המודע והומור חד שמרים את כל הקהל.
            </TextReveal>

            <TextReveal className="text-[var(--text-muted)] text-base leading-relaxed">
              המופע בנוי כך שהקהל לא רק צופה – אלא חלק בלתי נפרד מהקסם. במהלך ההופעה האורחים עולים לבמה, משתתפים, מופתעים ובעיקר נהנים מכל רגע. ובמרכז – בעל/ת האירוע מקבלים רגע מיוחד שלא ישכחו לעולם.
            </TextReveal>

            <TextReveal className="text-[var(--text-muted)] text-base leading-relaxed">
              ומהרגע הראשון? הקסם כבר מתחיל לעבוד… דוד דניאל מגיע עם אנרגיה מחשמלת, מתקשר עם הקהל ויוצר אווירה סוחפת עוד לפני שהמופע הרשמי מתחיל. זה לא עוד מופע – זו חוויה שמדברים עליה הרבה אחרי שהיא נגמרת.
            </TextReveal>

            <ScrollReveal offset={0} className="pt-2">
              <a href="#contact" className="btn-primary inline-flex">
                צור קשר עכשיו
              </a>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
