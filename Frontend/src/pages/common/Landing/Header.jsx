import { ShoppingCart, Menu, X, ChevronDown } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { Button } from '../../../components/ui/button'
import { useLocation, useNavigate } from 'react-router'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isScrolled, setIsScrolled] = useState(false)
    const [activeSection, setActiveSection] = useState('')
    const navigate = useNavigate();

    // Handle scroll effect for header
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10)
        }
        
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Handle active link highlighting on scroll
    useEffect(() => {
        const sections = document.querySelectorAll('section[id]');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, { rootMargin: '-50% 0px -50% 0px' });

        sections.forEach(section => observer.observe(section));

        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    const handleLoginButtonClick = () => {
        navigate('/auth/login');
    }

    const handleNavClick = (e, href) => {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        if (targetElement) {
            const headerOffset = 80; // Height of the fixed header
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
        setIsMenuOpen(false); // Close mobile menu on click
    }

    const navLinks = [
        { name: 'Features', href: '#features' },
        { name: 'Why Us', href: '#why-us' },
        { name: 'Demo', href: '#demo' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Testimonials', href: '#testimonials' },
        { name: 'Contact', href: '#contact' },
    ];

    const renderNavLink = (link, isMobile = false) => (
        <a 
            key={link.name} 
            href={link.href} 
            onClick={(e) => handleNavClick(e, link.href)}
            className={`relative font-medium transition-colors ${isMobile ? 'block w-full px-4 py-4 border-b border-border' : 'py-2'} ${activeSection === link.href.substring(1) ? 'text-primary' : 'text-muted-foreground'} hover:text-primary group`}
        >
            {link.name}
            <span className={`absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 ${isMobile ? 'hidden' : 'w-0 group-hover:w-full'}`}></span>
        </a>
    );

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-gray-900/70 backdrop-blur-lg border-b border-white/10' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-20">
            {/* Left Side: Logo */}
            <div className="flex-1 flex justify-start">
              <div className="flex items-center">
                <div className="flex items-center space-x-2 group cursor-pointer" onClick={() => navigate('/')}>
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 transform group-hover:scale-105 bg-transparent ">
                    <ShoppingCart className="w-6 h-6 font-bold text-muted-foreground group-hover:text-emerald-600 transition-colors" />
                  </div>
                  <span className="text-xl font-bold text-muted-foreground group-hover:text-primary transition-colors">POS Pro</span>
                </div>
              </div>
            </div>

            {/* Center: Desktop Navigation */}
            <nav className="hidden md:flex justify-center items-center space-x-6">
              {navLinks.map(link => renderNavLink(link))}
            </nav>

            {/* Right Side: CTA Buttons */}
            <div className="flex-1 hidden md:flex justify-end items-center space-x-4">
                <button onClick={handleLoginButtonClick} className="relative font-medium transition-colors text-muted-foreground hover:text-primary group py-2 px-2">
                  Sign In
                  <span className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full"></span>
                </button>
                <button onClick={(e) => handleNavClick(e, '#contact')} className="relative font-medium transition-colors text-muted-foreground hover:text-primary group py-2 px-2">
                  Request Demo
                  <span className="absolute bottom-0 left-0 h-0.5 bg-primary transition-all duration-300 w-0 group-hover:w-full"></span>
                </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center space-x-2">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-muted-foreground hover:text-primary p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-white/10 bg-gray-900/90 backdrop-blur-lg">
              <nav className="flex flex-col -mt-4">
                {navLinks.map(link => renderNavLink(link, true))}
                <div className="flex flex-col space-y-3 p-4">
                  <Button onClick={handleLoginButtonClick} variant="outline" className="w-full border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white">Sign In</Button>
                  <Button onClick={() => handleNavClick({ preventDefault: () => {} }, '#contact')} variant="outline" className="w-full border-emerald-500 text-emerald-400 hover:bg-emerald-500 hover:text-white">Request Demo</Button>
                </div>
              </nav>
            </div>
          )}
        </div>
      </header>
  )
}

export default Header