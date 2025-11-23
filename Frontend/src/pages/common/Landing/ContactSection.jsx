import React from 'react';
import { Button } from '@/components/ui/button';
import { Phone, Mail, MapPin, Clock, ArrowRight, CheckCircle } from 'lucide-react';

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Contact Form */}
          <div>
            <div className="mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Ready to Streamline Your Store?
              </h2>
              <p className="text-xl text-gray-300">
                Join thousands of retailers who trust our POS system to grow their business
              </p>
            </div>
            
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-lg shadow-lg">
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-white placeholder-gray-400" 
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-white placeholder-gray-400" 
                      placeholder="you@example.com"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-white placeholder-gray-400" 
                      placeholder="+91 98765 43210"
                    />
                  </div>
                  <div>
                    <label htmlFor="business" className="block text-sm font-medium text-gray-300 mb-1">Business Name</label>
                    <input 
                      type="text" 
                      id="business" 
                      className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-white placeholder-gray-400" 
                      placeholder="Your business name"
                    />
                  </div>
                </div>
                
                <div className="mb-4">
                  <label htmlFor="interest" className="block text-sm font-medium text-gray-300 mb-1">I'm interested in</label>
                  <select 
                    id="interest" 
                    className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-white"
                  >
                    <option value="">Select an option</option>
                    <option value="demo">Scheduling a demo</option>
                    <option value="pricing">Pricing information</option>
                    <option value="trial">Starting a free trial</option>
                    <option value="question">General question</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                  <textarea 
                    id="message" 
                    rows="4" 
                    className="w-full px-4 py-2 border border-white/20 bg-white/10 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 text-white placeholder-gray-400" 
                    placeholder="Tell us about your business needs"
                  ></textarea>
                </div>
                
                <Button className="w-full py-3 text-lg group bg-emerald-600 hover:bg-emerald-500 text-white">
                  Send Message
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </form>
            </div>
          </div>
          
          {/* Right Side - Contact Info */}
          <div>
            <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8 backdrop-blur-lg shadow-lg">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Phone className="w-5 h-5 " />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Phone</p>
                    <p className="text-gray-300">+91 98765 43210</p>
                    <p className="text-gray-300">+91 98765 43211</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Mail className="w-5 h-5 " />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Email</p>
                    <p className="text-gray-300">sales@pospro.com</p>
                    <p className="text-gray-300">support@pospro.com</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <MapPin className="w-5 h-5 " />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Office Address</p>
                    <p className="text-gray-300">Capital Park, Gachibowli</p>
                    <p className="text-gray-300">Hyderabad, Telangana 500032</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center flex-shrink-0 text-emerald-400">
                    <Clock className="w-5 h-5 " />
                  </div>
                  <div>
                    <p className="font-medium text-white mb-1">Business Hours</p>
                    <p className="text-gray-300">Monday - Friday: 9:00 AM - 8:00 PM</p>
                    <p className="text-gray-300">Saturday: 10:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                "Free personalized demo",
                "14-day free trial with full features",
                "Dedicated onboarding specialist",
                "24/7 customer support"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-200">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;