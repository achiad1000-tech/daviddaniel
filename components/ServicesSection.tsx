"use client";

import { motion } from "framer-motion";

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
            viewport={{ once: false }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="section-label"
          >
            מה אני מציע
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black"
          >
            הופעות לכל{" "}
            <span className="gold-gradient">אירוע</span>
          </motion.h2>
          <div className="gold-divider mt-4" />
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-[var(--text-muted)] max-w-xl mx-auto text-base md:text-lg"
          >
            כל הופעה מותאמת אישית לאופי ולמטרות האירוע שלך.
          </motion.p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="card-dark p-7 flex flex-col gap-5 group cursor-default"
              style={{ transition: "box-shadow 0.3s" }}
            >
              {/* Icon */}
              <motion.div
                className="w-14 h-14 rounded-lg flex items-center justify-center"
                style={{
                  background: "rgba(201,168,76,0.06)",
                  border: "1px solid rgba(201,168,76,0.2)",
                  color: "var(--gold)",
                }}
                whileHover={{ background: "rgba(201,168,76,0.12)", scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                {service.icon}
              </motion.div>

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
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
