import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import VideoGallery from "@/components/VideoGallery";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

// Stats bar — server component (no "use client" needed here)
function StatsBar() {
  const stats = [
    { number: "500+", label: "הופעות" },
    { number: "10+", label: "שנות ניסיון" },
    { number: "98%", label: "שביעות רצון" },
    { number: "∞", label: "רגעים בלתי נשכחים" },
  ];

  return (
    <div
      style={{
        background: "var(--bg-surface)",
        borderTop: "1px solid rgba(201,168,76,0.1)",
        borderBottom: "1px solid rgba(201,168,76,0.1)",
      }}
    >
      <div className="section-container py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-center gap-1">
              <span
                className="text-3xl md:text-4xl font-black gold-gradient"
              >
                {s.number}
              </span>
              <span className="text-xs text-[var(--text-muted)] tracking-wider uppercase">
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <StatsBar />
        <AboutSection />
        <ServicesSection />
        <VideoGallery />
        <Testimonials />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
