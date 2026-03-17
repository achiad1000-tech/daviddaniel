"use client";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div className="section-container py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex flex-col items-center md:items-start">
            <span
              className="gold-gradient font-[family-name:var(--font-playfair)] italic text-xl font-semibold"
            >
              David Daniel
            </span>
            <span className="text-[10px] tracking-[0.25em] text-[var(--text-muted)] uppercase mt-0.5">
              אמן חושים
            </span>
          </div>

          {/* Nav */}
          <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
            {[
              ["אודות", "#about"],
              ["הופעות", "#services"],
              ["גלריה", "#gallery"],
              ["המלצות", "#testimonials"],
              ["צור קשר", "#contact"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
              >
                {label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-4">
            {[
              {
                label: "Instagram",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
                  </svg>
                ),
              },
              {
                label: "Facebook",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                ),
              },
              {
                label: "YouTube",
                href: "#",
                icon: (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z" />
                    <polygon points="9.75,15.02 15.5,12 9.75,8.98" fill="currentColor" stroke="none" />
                  </svg>
                ),
              },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-[var(--text-muted)] hover:text-[var(--gold)] transition-colors"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="mt-8 pt-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-[var(--text-muted)]"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p>© {year} David Daniel. כל הזכויות שמורות.</p>
          <p className="opacity-50 tracking-widest">DavidDaniel.com</p>
        </div>
      </div>
    </footer>
  );
}
