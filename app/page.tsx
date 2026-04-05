"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import IntroScreen from "@/components/IntroScreen";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import VideoGallery from "@/components/VideoGallery";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import LandingSection from "@/components/LandingSection";
import useIsMobile from "@/hooks/useIsMobile";

export default function Home() {
  const [introPlaying, setIntroPlaying] = useState(true);
  const isMobile = useIsMobile();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.body.style.overflow = introPlaying ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [introPlaying]);

  return (
    <>
      <AnimatePresence>
        {introPlaying && (
          <IntroScreen key="intro" onComplete={() => setIntroPlaying(false)} />
        )}
      </AnimatePresence>
      <Navbar introPlaying={introPlaying} />
      <main>
        {isMobile ? (
          <HeroSection />
        ) : (
          <LandingSection introPlaying={introPlaying}>
            <HeroSection />
          </LandingSection>
        )}
        <AboutSection />
        <ServicesSection />
        <VideoGallery />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
