"use client";

import { motion } from "framer-motion";

const testimonials = [
  {
    name: "מיכל כהן",
    role: "מנהלת אירועים, בנק לאומי",
    rating: 5,
    text: "דוד הפך את ערב הגיבוש שלנו לחוויה שאי אפשר לשכוח. אנשים עדיין מדברים על זה חצי שנה אחרי. כל מנהל אירועים חייב לדעת על האיש הזה.",
    initial: "מ",
  },
  {
    name: "אלון שמיר",
    role: 'מנכ"ל, NovaTech',
    rating: 5,
    text: "הזמנו את דוד להשקת המוצר שלנו ולקוחות פשוט איבדו את עשתונותיהם. החוויה יצרה שיחה שהמשיכה הרבה אחרי הערב — ממש פנטסטי.",
    initial: "א",
  },
  {
    name: "שיר לוי",
    role: "הכלה",
    rating: 5,
    text: "דוד ביצע בחתונה שלנו ולא נותר עין יבשה באולם — לא מבכי אלא מצחוק ופליאה. הרגע שהוא 'קרא' את ברכת הכלה שלי עוד לפני שאמרתי אותה... הייתי המומה.",
    initial: "ש",
  },
  {
    name: "דני פרידמן",
    role: 'יו"ר ועד אירועי, Elbit Systems',
    rating: 5,
    text: "ניסינו בעבר הופעות בידור שונות לכנס השנתי שלנו. דוד היה ברמה אחרת לחלוטין. מקצועי, מרתק, ומדויק. ניפגש עוד שנה.",
    initial: "ד",
  },
];

const Stars = ({ count }: { count: number }) => (
  <div className="flex gap-0.5">
    {Array.from({ length: count }).map((_, i) => (
      <motion.svg
        key={i}
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="var(--gold)"
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false }}
        transition={{ delay: i * 0.06, type: "spring", stiffness: 400, damping: 15 }}
      >
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" />
      </motion.svg>
    ))}
  </div>
);

export default function Testimonials() {
  return (
    <section
      id="testimonials"
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
            מה אומרים עלי
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black"
          >
            הקהל <span className="gold-gradient">מדבר</span>
          </motion.h2>
          <div className="gold-divider mt-4" />
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, scale: 1.01 }}
              className="card-dark p-7 flex flex-col gap-4 cursor-default"
            >
              {/* Quote mark */}
              <div
                className="text-6xl leading-none select-none"
                style={{ color: "rgba(201,168,76,0.25)", lineHeight: "0.8", fontFamily: "Georgia, serif" }}
              >
                &#8220;
              </div>

              {/* Stars */}
              <Stars count={t.rating} />

              {/* Text */}
              <p className="text-[var(--text-muted)] text-base leading-relaxed flex-1">
                {t.text}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-2 border-t border-[var(--border)]">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm shrink-0"
                  style={{
                    background: "linear-gradient(135deg, var(--gold-dark), var(--gold))",
                    color: "#0A0A0A",
                  }}
                >
                  {t.initial}
                </div>
                <div>
                  <p className="font-semibold text-[var(--text)] text-sm">{t.name}</p>
                  <p className="text-[var(--text-muted)] text-xs">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
