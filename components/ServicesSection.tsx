"use client";

import { motion, type Variants } from "framer-motion";

const services = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" />
        <line x1="12" y1="12" x2="12" y2="16" />
        <line x1="10" y1="14" x2="14" y2="14" />
      </svg>
    ),
    title: "אירועים עסקיים",
    subtitle: "Corporate Events",
    description:
      "הגדל את מעורבות העובדים ושאיר רושם בלתי נמחק על לקוחות ושותפים עסקיים. הופעה שמשלבת בידור, מחשבה ורגע של פליאה — שכולם ידברו עליה .",
    highlights: ["השקות מוצר", "ועידות חברה", "ערבי גיבוש", "אירועי סיום שנה"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
    ),
    title: "אירועים פרטיים",
    subtitle: "Private Events",
    description:
      "הפוך את האירוע שלך לחוויה שתיזכר לנצח. מסיבות יום הולדת, מסיבות רווקות, ומפגשים משפחתיים — דוד מביא רגע של קסם שמחבר ומאחד.",
    highlights: ["חתונות ואירוסין", "ימי הולדת VIP", "מסיבות רווקות", "אירועים משפחתיים"],
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </svg>
    ),
    title: "הופעות בימה",
    subtitle: "Stage Performances",
    description:
      "הופעת בימה מלאה — ניסיון מרהיב עבור קהל גדול. מופע מקצועי ומותאם אישית שמלהיב, מפליא ומשאיר את הקהל רוצה עוד.",
    highlights: ["תיאטראות ואולמות", "פסטיבלים", "מופעי פתיחה", "ערבי גאלה"],
  },
];

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.0, 0.0, 0.2, 1] },
  },
};

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="section-padding"
      style={{ background: "var(--bg-surface)" }}
    >
      <div className="section-container">
        {/* Header */}
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            מה אני מציע
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black"
          >
            הופעות לכל{" "}
            <span className="gold-gradient">אירוע</span>
          </motion.h2>
          <div className="gold-divider mt-4" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-[var(--text-muted)] max-w-xl mx-auto text-base md:text-lg"
          >
            כל הופעה מותאמת אישית לאופי ולמטרות האירוע שלך.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8"
        >
          {services.map((service) => (
            <motion.div
              key={service.title}
              variants={cardVariants}
              className="card-dark p-7 flex flex-col gap-5 group"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 rounded-lg flex items-center justify-center transition-colors duration-300"
                style={{
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "var(--gold)",
                }}
              >
                {service.icon}
              </div>

              {/* Titles */}
              <div>
                <h3 className="text-xl font-bold text-[var(--text)]">{service.title}</h3>
                <p className="text-xs text-[var(--gold)] tracking-widest uppercase mt-0.5">
                  {service.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-[var(--text-muted)] text-sm leading-relaxed flex-1">
                {service.description}
              </p>

              {/* Highlights */}
              <ul className="flex flex-col gap-1.5">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-[var(--text-muted)]">
                    <span className="text-[var(--gold)] text-xs">◆</span>
                    {h}
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href="#contact"
                className="mt-2 text-sm font-semibold text-[var(--gold)] flex items-center gap-1.5 group-hover:gap-3 transition-all duration-200"
              >
                לפרטים ותאום
                <span className="text-lg leading-none">←</span>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
