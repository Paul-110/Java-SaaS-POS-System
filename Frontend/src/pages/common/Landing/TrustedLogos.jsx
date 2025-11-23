import React from 'react'

const TrustedLogos = ({ scrollY }) => {
  const logos = ["Venture Co", "Innovate Inc.", "Quantum Leap", "Starlight", "Meridian"];

  return (
    <section className="py-16 relative">
        <div 
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-transform duration-500 ease-out"
          style={{ transform: `translateY(${scrollY * 0.03}px)` }}
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Trusted by leading innovators
            </h2>
            <p className="text-gray-300">Join thousands of successful businesses using our platform</p>
          </div>
          
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
            {logos.map((logo) => (
              <div key={logo} className="bg-white/5 border border-white/10 rounded-xl px-6 py-3 backdrop-blur-lg shadow-lg">
                <span className="text-white font-bold text-lg">{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default TrustedLogos