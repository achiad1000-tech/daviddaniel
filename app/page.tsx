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
import ContactModal from "@/components/ContactModal";
import WhatsAppButton from "@/components/WhatsAppButton";
import Footer from "@/components/Footer";

export default function Home() {
  const [introPlaying, setIntroPlaying] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

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
      <Navbar introPlaying={introPlaying} onOpenModal={() => setModalOpen(true)} />
      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <WhatsAppButton />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <VideoGallery />
        <Testimonials />
        <FAQ onOpenModal={() => setModalOpen(true)} />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
