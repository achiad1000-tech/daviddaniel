"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  { text: "דוד הפך את ערב הגיבוש שלנו לחוויה שאי אפשר לשכוח. אנשים עדיין מדברים על זה חצי שנה אחרי.", time: "19:22" },
  { text: "הזמנו את דוד להשקת המוצר שלנו ולקוחות פשוט איבדו את עשתונותיהם. החוויה יצרה שיחה שהמשיכה הרבה אחרי הערב.", time: "20:45" },
  { text: "דוד ביצע בחתונה שלנו ולא נותר עין יבשה באולם — לא מבכי אלא מצחוק ופליאה. הייתי המומה.", time: "21:03" },
  { text: "ניסינו בעבר הופעות בידור שונות לכנס השנתי שלנו. דוד היה ברמה אחרת לחלוטין. מקצועי, מרתק, ומדויק.", time: "18:17" },
  { text: "הזמנו את דוד לאירוע השנתי שלנו. מהרגע הראשון הוא תפס את הקהל ולא שיחרר. תודה על חוויה מטורפת!", time: "22:30" },
  { text: "עבדתי עם עשרות אמנים. דוד הוא ברמה אחרת. מקצועי, דייקן, ומשאיר את כולם עם פה פעור. ממליץ בחום.", time: "17:48" },
  { text: "הילדים לא הפסיקו לדבר על המופע. דוד יצר רגע מיוחד לתומר שהוא יזכור לכל החיים. תודה מכל הלב!", time: "23:11" },
  { text: "הבאנו את דוד לאירוע גיבוש של 200 איש. הוא הצליח לרתק את כולם עד האחרון. חוויה ברמה בינלאומית.", time: "20:05" },
];

function MessageBubble({ t }: { t: (typeof testimonials)[0] }) {
  return (
    <div
      className="shrink-0 rounded-xl p-4 flex flex-col gap-2 select-none"
      style={{
        width: 300,
        background: "#1a2e1a",
        border: "1px solid rgba(37,211,102,0.15)",
        direction: "rtl",
      }}
    >
      <p className="text-[#e9edef] text-sm leading-relaxed">{t.text}</p>
      <div className="flex items-center gap-1 justify-start" style={{ direction: "ltr" }}>
        <span className="text-[#8696a0] text-[10px]">{t.time}</span>
        <svg width="16" height="11" viewBox="0 0 16 11" fill="none">
          <path d="M11.07 0.66L4.5 7.24L2.93 5.66L2.22 6.37L4.5 8.66L11.78 1.37L11.07 0.66Z" fill="#53bdeb"/>
          <path d="M14.07 0.66L7.5 7.24L6.93 6.66L6.22 7.37L7.5 8.66L14.78 1.37L14.07 0.66Z" fill="#53bdeb"/>
        </svg>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovering, setHovering] = useState(false);

  const items = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const handleMouseMove = (e: React.MouseEvent) => {
    if (cursorRef.current) {
      const rect = wrapperRef.current!.getBoundingClientRect();
      cursorRef.current.style.left = `${e.clientX - rect.left}px`;
      cursorRef.current.style.top = `${e.clientY - rect.top}px`;
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    const track = trackRef.current;
    if (!track) return;

    e.preventDefault();
    track.classList.add("dragging");

    const startX = e.clientX;
    const computedTransform = getComputedStyle(track).transform;
    const matrix = new DOMMatrix(computedTransform);
    const startTranslate = matrix.m41;

    // Limit drag range: one set = 8 cards × 320px (300+20gap)
    const setWidth = testimonials.length * 320;
    const minX = -(setWidth * 3); // don't go past 3rd set
    const maxX = 0; // don't go past start

    const onMove = (ev: MouseEvent) => {
      const dx = ev.clientX - startX;
      const newX = Math.max(minX, Math.min(maxX, startTranslate + dx));
      track.style.transform = `translateX(${newX}px)`;
    };

    const onUp = () => {
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseup", onUp);
      track.classList.remove("dragging");
    };

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  };

  return (
    <section
      id="testimonials"
      className="section-padding"
      style={{ background: "var(--bg)" }}
    >
      <div className="section-container mb-10">
        <div className="text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            מה אומרים עלי
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="mt-2 text-3xl md:text-4xl lg:text-5xl font-black"
          >
            הקהל <span className="gold-gradient">מדבר</span>
          </motion.h2>
          <div className="gold-divider mt-4" />
        </div>
      </div>

      <div
        ref={wrapperRef}
        className="testimonials-wrapper overflow-hidden relative"
        style={{ width: "100%", direction: "ltr" }}
        onMouseEnter={() => {
          setHovering(true);
          trackRef.current?.classList.add("paused");
        }}
        onMouseLeave={() => {
          setHovering(false);
          trackRef.current?.classList.remove("paused");
        }}
        onMouseMove={handleMouseMove}
        onMouseDown={handleMouseDown}
      >
        {/* Custom cursor - drag button */}
        <div
          ref={cursorRef}
          className="pointer-events-none absolute z-20 transition-opacity duration-200"
          style={{
            opacity: hovering ? 1 : 0,
            transform: "translate(-50%, -50%)",
          }}
        >
          <div
            className="flex items-center gap-2 rounded-full px-4 py-2 shadow-lg"
            style={{
              background: "var(--gold)",
              color: "#000",
              fontSize: 13,
              fontWeight: 700,
              whiteSpace: "nowrap",
              direction: "rtl",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M19 12H5M5 12L10 7M5 12L10 17" />
            </svg>
            גרור
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
              <path d="M5 12H19M19 12L14 7M19 12L14 17" />
            </svg>
          </div>
        </div>

        <div ref={trackRef} className="testimonials-track flex gap-5 shrink-0">
          {items.map((t, i) => (
            <MessageBubble key={`msg-${i}`} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
