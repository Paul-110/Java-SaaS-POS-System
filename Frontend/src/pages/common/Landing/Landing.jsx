import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  BarChart3,
  Users,
  Shield,
  FileText,
  Store,
  CheckCircle,
  Play,
  Star,
  ArrowDown,
} from "lucide-react";
import React, { useState, useEffect } from 'react';
import Header from "./Header";
import HeroSection from "./HeroSection";
import TrustedLogos from "./TrustedLogos";
import PricingCalculator from "./PricingCalculator";
// import FeatureComparisonSection from './FeatureComparison'
import MobileAppShowcase from "./MobileAppShowcase";
import TestimonialCarousel from "./TestimonialCarousel";
import LiveDemoSection from "./LiveDemoSection";
import FAQSection from "./FAQSection";
import ContactSection from "./ContactSection";
import Footer from "./Footer";
import PricingSection from "./PricingSection";
import WhyChooseUsSection from "./WhyChooseUsSection";
import KeyFeaturesSection from "./KeyFeaturesSection";
import FeatureComparisonSection from "./FeatureComparisonSection";

function Landing() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="bg-gray-900 text-white overflow-hidden relative">
      <div className="absolute inset-0 z-0 opacity-60" style={{ perspective: '1000px' }}>
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translateX(${mousePosition.x * -30}px) translateY(${mousePosition.y * -30}px)` }}><div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/70 rounded-full filter blur-3xl animate-blob"></div></div>
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translateX(${mousePosition.x * 40}px) translateY(${mousePosition.y * 40}px)` }}><div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500/70 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div></div>
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translateX(${mousePosition.x * -50}px) translateY(${mousePosition.y * -50}px)` }}><div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-500/70 rounded-full filter blur-3xl animate-blob animation-delay-4000"></div></div>
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translateX(${mousePosition.x * 20}px) translateY(${mousePosition.y * 20}px)` }}><div className="absolute -bottom-24 right-20 w-96 h-96 bg-teal-500/60 rounded-full filter blur-3xl animate-blob animation-delay-3000"></div></div>
        <div className="absolute inset-0 transition-transform duration-300 ease-out" style={{ transform: `translateX(${mousePosition.x * -10}px) translateY(${mousePosition.y * -10}px)` }}><div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/50 rounded-full filter blur-3xl animate-blob animation-delay-5000"></div></div>
      </div>
      <style>{`
        @keyframes blob { 0% { transform: translate(0px, 0px) scale(1); } 33% { transform: translate(30px, -50px) scale(1.1); } 66% { transform: translate(-20px, 20px) scale(0.9); } 100% { transform: translate(0px, 0px) scale(1); } } 
        .animate-blob { animation: blob 7s infinite; } 
        .animation-delay-2000 { animation-delay: 2s; } 
        .animation-delay-3000 { animation-delay: 3s; } 
        .animation-delay-4000 { animation-delay: 4s; } 
        .animation-delay-5000 { animation-delay: 5s; }

        /* Custom Scrollbar Styles */
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: rgba(17, 24, 39, 0.5); }
        ::-webkit-scrollbar-thumb { background: rgba(255, 255, 255, 0.1); border-radius: 10px; border: 2px solid transparent; background-clip: content-box; }
        ::-webkit-scrollbar-thumb:hover { background: rgba(16, 185, 129, 0.7); background-clip: content-box; }
      `}</style>
      <div className="relative z-10">
        <Header />
        <main>
          <HeroSection />
          <TrustedLogos />
          <KeyFeaturesSection />
          <div id="why-us"><WhyChooseUsSection /></div>
          <div id="demo"><LiveDemoSection /></div>
          <MobileAppShowcase />
          <TestimonialCarousel />      
          <PricingSection />
          <FeatureComparisonSection />
          <PricingCalculator />
          <FAQSection />
          <ContactSection id="contact" />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
