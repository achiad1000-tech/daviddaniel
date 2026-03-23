"use client";

import { useState, useEffect, useRef } from "react";
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

export default function Home() {
  const [introPlaying, setIntroPlaying] = useState(true);
  const [heroFixed, setHeroFixed] = useState(false);
  const landingEndFired = useRef(false);
  const heroNaturalTop = useRef(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    // Store hero's natural offsetTop before it ever becomes fixed
    const hero = document.getElementById("hero");
    if (hero) heroNaturalTop.current = hero.offsetTop;
  }, []);

  useEffect(() => {
    document.body.style.overflow = introPlaying ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [introPlaying]);

  function handleRevealChange(reveal: boolean) {
    setHeroFixed(reveal);
    if (!reveal) {
      landingEndFired.current = false;
    }
  }

  function handleLandingEnd() {
    if (landingEndFired.current) return;
    landingEndFired.current = true;
    // Use pre-stored natural offsetTop — hero.offsetTop is 0 when position:fixed
    window.scrollTo({ top: heroNaturalTop.current, behavior: "instant" });
    setHeroFixed(false);
  }

  return (
    <>
      <AnimatePresence>
        {introPlaying && (
          <IntroScreen key="intro" onComplete={() => setIntroPlaying(false)} />
        )}
      </AnimatePresence>
      <Navbar introPlaying={introPlaying} />
      <main>
        <LandingSection
          introPlaying={introPlaying}
          onRevealChange={handleRevealChange}
          onLandingEnd={handleLandingEnd}
        />
        <HeroSection fixed={heroFixed} />
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
