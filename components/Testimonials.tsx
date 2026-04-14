"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const testimonials = [
  { text: "דודדד 😅\nמה זה היההה\nאנשים פה עד עכשיו מנסים להבין איך עשית את זה 🤣\nמטורף לגמרי", time: "22:14" },
  { text: "דוד היקר,\nרצינו להודות לך מכל הלב על ערב פשוט יוצא דופן 🙏\nמהרגע שעלית לבמה הרגשנו שיש פה משהו אחר לגמרי.\nהצלחת לרתק את כולם – גם את מי שבדרך כלל לא מתחבר לדברים כאלה 😅\nהיה שילוב מושלם של הומור, מתח והפתעות, והקהל פשוט לא הפסיק להגיב.\nגם אחרי שהמופע נגמר אנשים ניגשו אלינו ושאלו עליך.\nאין ספק שעשית לנו את האירוע!", time: "09:47" },
  { text: "דוד תודה ענקית!!\nהצלחת להרים את כל הקהל, גם את מי שבדרך כלל לא זורם 😂\nהיה פשוט מושלם", time: "21:03" },
  { text: "דוד היקר,\nאין לנו מילים לתאר כמה נהנינו מהמופע שלך 🙌\nהצלחת להרים את האווירה מהרגע הראשון ולהחזיק אותה עד הסוף.\nהקהל היה מרותק לחלוטין, וכל רגע הביא איתו עוד הפתעה.\nזה לא רק מופע – זו חוויה שלמה.\nאנשים עדיין מדברים על זה גם כמה ימים אחרי 😄\nתודה רבה על ערב בלתי נשכח!", time: "18:30" },
  { text: "דוד תודה רבה!\nבהתחלה לא ידענו למה לצפות\nאבל מהר מאוד הבנו שמדובר במשהו אחר לגמרי\nהיה פשוט וואו 🙏", time: "23:58" },
  { text: "דוד היקר,\nאיזה ערב עשית לנו 😍\nמהרגע הראשון הרגשנו שאתה שולט בעניינים ומוביל את הקהל בצורה מדהימה.\nהיו רגעים שפשוט הסתכלנו אחד על השני ולא האמנו למה שאנחנו רואים 😅\nהצלחת לשבור את הקרח, להכניס אנרגיה וליצור חוויה שכולם נהנו ממנה.\nתודה על השקעה, מקצועיות והרבה נשמה!", time: "20:22" },
  { text: "דוד היקר, תודה רבה על ערב מדהים 🙏\nמהרגע שעלית הבמה כולם היו מרותקים\nבאמת שלא ציפינו לרמה כזאת!", time: "17:11" },
  { text: "דוד תודה ענקית על מופע מדהים!\nבהתחלה לא ממש ידענו למה לצפות, אבל מהר מאוד הבנו שעשינו את הבחירה הנכונה.\nהצלחת ליצור חיבור מדהים עם הקהל, לגרום לכולם להשתתף ולהרגיש חלק.\nהתגובות היו מטורפות – צחוק, הלם והתלהבות ביחד 🤯\nקיבלנו המון מחמאות אחרי האירוע וזה הרבה בזכותך.\nתודה על מקצועיות ואנרגיות מדהימות!", time: "11:45" },
  { text: "דוד היקר, תודה על ערב מיוחד 🙏\nהרגיש שאתה נותן את כל הלב שלך במופע\nזה ממש הורגש בקהל ❤️", time: "00:06" },
  { text: "דוד היקר,\nרצינו להגיד לך תודה גדולה על ערב מלא קסם ורגש 🙏\nהיית מדויק, מצחיק ומאוד נעים מול הקהל.\nהצלחת לשלב בין רגעים מצחיקים לרגעים שפשוט השאירו את כולם בלי מילים.\nהייתה תחושה שאתה באמת רואה את הקהל ומתחבר אליו, וזה עשה את כל ההבדל.\nאין ספק שנמליץ עליך לכל מי שנשאל!", time: "15:37" },
  { text: "דוד תודה על הופעה מדהימה!\nהקהל היה פשוט מרותק לאורך כל הזמן\nגם המבוגרים וגם הצעירים השתתפו ונהנו\nקיבלנו המון מחמאות בזכותך 🙌", time: "19:52" },
  { text: "דוד תודה ענקית 🙏\nהמופע שלך היה אחד הדברים הכי טובים שהיו באירוע שלנו.\nהצלחת לחבר בין אנשים, לגרום להם להשתחרר וליהנות באמת.\nהתגובות אחרי זה היו פשוט מדהימות – כולם דיברו עליך.\nזה בדיוק מה שקיווינו לו ואפילו יותר.\nשמחים שבחרנו בך!", time: "08:19" },
  { text: "דוד היקר,\nאיזה ערב עשית לנו 😍\nהיית מצחיק, מעניין וסופר מפתיע\nאנשים לא הפסיקו לדבר על זה גם יום אחרי\nתודה על חוויה מיוחדת", time: "13:28" },
  { text: "דוד תודה רבה על הכל!\nהאמת שהגענו עם ציפיות, אבל הצלחת לעבור אותן בענק 🔥\nהקהל שיתף פעולה, צחק, היה מופתע — והכל בזכות הדרך שבה הובלת את המופע.\nהיה ברור שמדובר במקצוען אמיתי שיודע לקרוא את הקהל.\nאנחנו שמחים מאוד שבחרנו בך וממליצים מכל הלב!", time: "16:04" },
  { text: "דוד היקר,\nרצינו להגיד לך תודה גדולה על ערב בלתי נשכח 🙏\nהצלחת להחזיק את הקהל מהרגע הראשון\nכולם היו בשוק ממה שעשית שם 😂\nאין ספק שאתה מקצוען אמיתי!", time: "10:51" },
  { text: "דוד היקר,\nרצינו לפרגן לך מכל הלב על מופע ברמה גבוהה מאוד.\nהרגיש שהכל זורם בצורה טבעית, בלי מאמץ, וזה מה שהפך את זה לכל כך מיוחד.\nהקהל היה מעורב, צחק, הופתע ולא הפסיק להגיב.\nזה לא משהו שרואים בכל אירוע.\nתודה רבה על ערב בלתי נשכח ועל חוויה שכולם יזכרו עוד הרבה זמן.", time: "07:33" },
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
      <p className="text-[#e9edef] text-sm leading-relaxed" style={{ whiteSpace: "pre-wrap" }}>{t.text}</p>
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
