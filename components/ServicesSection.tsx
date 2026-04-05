"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="2" strokeLinecap="round" />
        <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="2" strokeLinecap="round" />
        <path d="M12 2v2M6.5 3.5l1.5 1.5M17.5 3.5l-1.5 1.5" />
      </svg>
    ),
    title: "ימי הולדת",
    subtitle: "Birthday Events",
    description:
      "הפוך את יום ההולדת לחוויה שתיזכר לכל החיים. דוד יוצר רגעים של פליאה, צחוק והפתעה שהופכים כל מסיבה לאגדית — עם רגע אישי ומיוחד לבעל/ת השמחה.",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "ימי חברה / גיבוש",
    subtitle: "Corporate & Team Events",
    description:
      "מופע שמחבר בין אנשים, שובר קרח ויוצר אנרגיה שמתרגמת לעבודת צוות אמיתית. דוד ישאיר את הצוות שלך עם חיוך, זיכרונות משותפים ותחושת \"אנחנו\".",
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    title: "בר / בת מצווה",
    subtitle: "Bar & Bat Mitzvah",
    description:
      "אירוע הבר/בת מצווה הוא אירוע של פעם בחיים — מופע שמשלב קריאת מחשבות, הפתעות ורגעים שיגרמו לכל המשפחה לדבר עליהם שנים קדימה.",
  },
];

/* ── Char reveal — each character slides up individually ────── */
function CharReveal({
  text,
  className,
  progress,
  startAt = 0,
  endAt = 1,
}: {
  text: string;
  className?: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  startAt?: number;
  endAt?: number;
}) {
  const chars = text.split("");
  return (
    <span className={className} style={{ display: "inline-block" }}>
      {chars.map((char, i) => {
        const charStart = startAt + (i / chars.length) * (endAt - startAt);
        const charEnd = startAt + ((i + 1) / chars.length) * (endAt - startAt);
        return <SingleChar key={i} char={char} range={[charStart, charEnd]} progress={progress} />;
      })}
    </span>
  );
}

function SingleChar({
  char,
  range,
  progress,
}: {
  char: string;
  range: [number, number];
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  const y = useTransform(progress, range, [40, 0]);
  const opacity = useTransform(progress, range, [0, 1]);
  return (
    <motion.span
      style={{ y, opacity, display: "inline-block", whiteSpace: "pre" }}
    >
      {char}
    </motion.span>
  );
}

function ServiceCard({ service }: { service: (typeof services)[0] }) {
  return (
    <div className="card-dark p-7 flex flex-col gap-5 w-full h-full">
      <div
        className="w-14 h-14 rounded-lg flex items-center justify-center"
        style={{
          background: "rgba(201,168,76,0.06)",
          border: "1px solid rgba(201,168,76,0.2)",
          color: "var(--gold)",
        }}
      >
        {service.icon}
      </div>
      <div>
        <h3 className="text-xl font-bold text-[var(--text)]">{service.title}</h3>
        <p className="text-xs text-[var(--gold)] tracking-widest uppercase mt-0.5">
          {service.subtitle}
        </p>
      </div>
      <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">
        {service.description}
      </p>
    </div>
  );
}

export default function ServicesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Desktop: Cards spread horizontally — slow, across full section scroll
  const left0 = useTransform(sectionProgress, [0.15, 0.55], ["50%", "17%"]);
  const left1 = useTransform(sectionProgress, [0.15, 0.55], ["50%", "50%"]);
  const left2 = useTransform(sectionProgress, [0.15, 0.55], ["50%", "83%"]);
  const lefts = [left0, left1, left2];

  const rotate0 = useTransform(sectionProgress, [0.15, 0.55], [-4, 0]);
  const rotate2 = useTransform(sectionProgress, [0.15, 0.55], [4, 0]);
  const rotates = [rotate0, undefined, rotate2];

  // Mobile: Cards spread vertically (top / center / bottom)
  const mobileY0 = useTransform(sectionProgress, [0.15, 0.55], [0, -290]);
  const mobileY1 = useTransform(sectionProgress, [0.15, 0.55], [0, 0]);
  const mobileY2 = useTransform(sectionProgress, [0.15, 0.55], [0, 290]);
  const mobileYs = [mobileY0, mobileY1, mobileY2];

  const mobileRotate0 = useTransform(sectionProgress, [0.15, 0.55], [4, 0]);
  const mobileRotate2 = useTransform(sectionProgress, [0.15, 0.55], [-4, 0]);
  const mobileRotates = [mobileRotate0, undefined, mobileRotate2];

  return (
    <section
      ref={sectionRef}
      id="services"
      className="section-padding"
      style={{ background: "var(--bg-surface)", overflow: "hidden" }}
    >
      <div className="section-container">
        {/* Header — chars reveal synced with cards */}
        <div className="text-center mb-14">
          <div><CharReveal text="מה אני מציע" className="section-label" progress={sectionProgress} startAt={0} endAt={0.15} /></div>
          <h2 className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black">
            <CharReveal text="הופעות לכל " progress={sectionProgress} startAt={0.05} endAt={0.25} />
            <CharReveal text="אירוע" className="gold-gradient" progress={sectionProgress} startAt={0.12} endAt={0.3} />
          </h2>
          <div className="gold-divider mt-4" />
          <div className="mt-4">
            <CharReveal text="כל הופעה מותאמת אישית לאופי ולמטרות האירוע שלך." className="text-[var(--text-muted)] max-w-xl mx-auto text-base md:text-lg" progress={sectionProgress} startAt={0.1} endAt={0.35} />
          </div>
        </div>

        {/* Cards — all stacked at center, fan out on scroll */}
        <div
          className="relative hidden md:block"
          style={{ height: 380 }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              style={{
                position: "absolute",
                top: 0,
                left: lefts[i],
                x: "-50%",
                width: "min(30%, 360px)",
                height: "100%",
                rotate: rotates[i],
                zIndex: i === 1 ? 3 : i === 0 ? 2 : 1,
              }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>

        {/* Mobile — stacked center, spread vertically on scroll */}
        <div
          className="relative md:hidden"
          style={{ height: 880 }}
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                x: "-50%",
                y: mobileYs[i],
                marginTop: "-90px",
                width: "min(85%, 340px)",
                rotate: mobileRotates[i],
                zIndex: i === 1 ? 3 : i === 0 ? 2 : 1,
              }}
            >
              <ServiceCard service={service} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
