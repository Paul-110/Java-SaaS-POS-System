import React, { useState, useEffect } from "react";
import { Button } from "../../../components/ui/button";
import { Play, ArrowRight, CheckCircle, ShoppingCart, BarChart3, Shield } from "lucide-react";
import { useNavigate } from "react-router";
import { TypewriterText } from "./components";

const HeroSection = () => {
  const navigate = useNavigate();
  const [currentBusinessTypeIndex, setCurrentBusinessTypeIndex] = useState(0);

  const businessTypes = [
    "Restaurants",
    "Cafes & Bakeries",
    "Bookstores",
    "Supermarkets",
    "Retail Chains",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBusinessTypeIndex((prevIndex) => (prevIndex + 1) % businessTypes.length);
    }, 4000); // Change text every 4 seconds
    return () => clearInterval(interval);
  }, []);

  const handleGetStartedClick = () => {
    navigate('/auth/onboarding');
  }
  
  const handleWatchDemo = () => {
    const demoSection = document.querySelector('#demo');
    if (demoSection) {
      const headerOffset = 80; // Adjust if you have a fixed header
      const elementPosition = demoSection.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-24 pb-32 md:pt-32 md:pb-40 relative">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div 
            className="inline-block bg-white/10 text-emerald-300 rounded-full px-4 py-1 text-sm font-medium mb-6 animate-pulse"
          >
            New Feature: Multi-store Management Now Available
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
            <span 
              className="bg-gradient-to-r from-primary to-emerald-600 bg-clip-text text-transparent animate-fade-in-up"
              style={{ animationDelay: '0.1s' }}
            >
                A New Command Center for
            </span>
            <br />
            <TypewriterText
              key={currentBusinessTypeIndex}
              text={businessTypes[currentBusinessTypeIndex]}
              speed={80}
              delay={200}
              className="text-emerald-400 h-16 md:h-20 inline-block"
              showCursor={true}
              cursorBlink={true}
            />
          </h1>
          <p 
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.2s' }}
          >
            Unify your sales, inventory, and customer data into one intuitive platform.
            Make smarter decisions, delight your customers, and watch your business thrive.
          </p>
          
          {/* Feature Highlights */}
          <div 
            className="flex flex-wrap justify-center gap-4 mb-8 animate-fade-in-up"
            style={{ animationDelay: '1.6s' }}
          >
            {[
              { icon: <ShoppingCart className="w-4 h-4" />, text: "Fast Checkout" },
              { icon: <BarChart3 className="w-4 h-4" />, text: "Real-time Analytics" },
              { icon: <Shield className="w-4 h-4" />, text: "Secure Access" },
              { icon: <CheckCircle className="w-4 h-4" />, text: "GST Ready" }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center space-x-1 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1 text-sm shadow-sm border border-white/10 animate-fade-in-up hover:scale-105 transition-all duration-300"
                style={{ animationDelay: `${1.8 + index * 0.1}s` }}
              >
                <span className="text-emerald-400">{feature.icon}</span>
                <span className="text-foreground">{feature.text}</span>
              </div>
            ))}
          </div>
          
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in-up"
            style={{ animationDelay: '2.2s' }}
          >
            <Button 
              onClick={handleGetStartedClick} 
              size="lg" 
              className="text-lg px-8 py-3 shadow-lg shadow-emerald-600/30 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-bounce-subtle bg-emerald-600 hover:bg-emerald-500 text-white"
            >
              Start Your Free Trial
              <ArrowRight className="w-5 h-5 ml-2"/>
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-3 hover:bg-white/10 transition-all duration-300 border-white/30 text-white hover:text-white"
              onClick={handleWatchDemo}
            >
              See It In Action
              <Play className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-subtle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-5px);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
          opacity: 0;
        }
        
        .animate-bounce-subtle {
          animation: bounce-subtle 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
