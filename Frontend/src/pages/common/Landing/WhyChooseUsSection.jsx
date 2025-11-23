import { CheckCircle, BarChart3, Zap, Shield, Users } from 'lucide-react'
import React from 'react'

const WhyChooseUsSection = () => {
  return (
    <section className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Why Choose Our POS System?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                We've designed our POS system with modern retailers in mind, focusing on ease of use, 
                reliability, and powerful features that drive business growth.
              </p>
              <div className="space-y-4">
                {[
                  "Easy to use interface",
                  "Works offline",
                  "GST-ready invoicing",
                  "Mobile-friendly design",
                  "24x7 Support"
                ].map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    <span className="text-gray-200">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-96">
              <div className="absolute top-0 left-1/4 w-64 h-64 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 transform -rotate-6 hover:rotate-0 transition-transform duration-300 backdrop-blur-lg shadow-lg">
                <Zap className="w-12 h-12 text-emerald-400 mb-3" />
                <h4 className="font-bold text-lg text-white">Blazing Fast</h4>
                <p className="text-sm text-gray-300 text-center">Instant transactions and real-time data sync.</p>
              </div>
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 transform rotate-3 hover:rotate-0 transition-transform duration-300 backdrop-blur-lg shadow-lg">
                <Shield className="w-12 h-12 text-emerald-400 mb-3" />
                <h4 className="font-bold text-lg text-white">Bank-Grade Security</h4>
                <p className="text-sm text-gray-300 text-center">Your data is always safe and encrypted.</p>
              </div>
              <div className="absolute top-1/4 right-0 w-60 h-60 bg-white/5 border border-white/10 rounded-2xl flex flex-col items-center justify-center p-6 transform rotate-8 hover:rotate-0 transition-transform duration-300 backdrop-blur-lg shadow-lg">
                <Users className="w-12 h-12 text-emerald-400 mb-3" />
                <h4 className="font-bold text-lg text-white">24/7 Support</h4>
                <p className="text-sm text-gray-300 text-center">Our team is always here to help you succeed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default WhyChooseUsSection