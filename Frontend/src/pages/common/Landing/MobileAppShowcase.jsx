import React from 'react';
import { Button } from '@/components/ui/button';
import { Smartphone, Download, CheckCircle, ArrowRight } from 'lucide-react';

const MobileAppShowcase = () => {
  const appFeatures = [
    'Real-time sales tracking',
    'Inventory management on the go',
    'Push notifications for low stock',
    'Mobile receipt generation',
    'Customer management',
    'Offline functionality'
  ];

  return (
    <section className="py-20 md:py-28 overflow-hidden relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/10 text-emerald-300 rounded-full px-4 py-1 text-sm font-medium mb-6">
              <Smartphone className="w-4 h-4" />
              <span>Mobile App</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Take Your Business <span className="text-emerald-400">Anywhere</span> With Our Mobile App
            </h2>
            
            <p className="text-lg text-gray-300 mb-8">
              Our mobile app gives you the freedom to manage your business from anywhere. 
              Check sales, update inventory, and stay connected with your team—all from your smartphone.
            </p>
            
            <div className="space-y-4 mb-8">
              {appFeatures.map((feature, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-200">{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="group bg-emerald-600 hover:bg-emerald-500 text-white">
                Download for iOS
                <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </Button>
              <Button size="lg" variant="outline" className="group border-white/30 text-white hover:bg-white/10">
                Download for Android
                <Download className="ml-2 w-5 h-5 group-hover:-translate-y-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="relative flex justify-center">
            <div className="relative">
              {/* Phone Frame */}
              <div className="w-[280px] h-[580px] bg-gray-800/50 backdrop-blur-sm border border-white/10 rounded-[40px] p-3 shadow-2xl relative z-10 overflow-hidden">
                {/* Inner Bezel */}
                <div className="absolute top-0 left-0 right-0 h-20 bg-gray-900 rounded-t-[37px] z-20">
                  {/* Notch */}
                  <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-40 h-6 bg-gray-900 rounded-b-xl z-30"></div>
                </div>
                
                {/* Screen Content */}
                <div className="w-full h-full bg-gray-900 rounded-[32px] overflow-hidden relative">
                  {/* App Header */}
                  <div className="bg-emerald-600 text-white p-4 pt-14">
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-bold">POS Pro</h3>
                        <p className="text-xs opacity-90">Dashboard</p>
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    </div>
                  </div>
                  
                  {/* App Content */}
                  <div className="p-4">
                    {/* Stats Cards */}
                    <div className="grid grid-cols-2 gap-3 mb-4 ">
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-xs text-gray-400">Today's Sales</p>
                        <p className="text-lg font-bold text-white">₹12,450</p>
                        <p className="text-xs text-green-500">+8% from yesterday</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-lg border border-white/10">
                        <p className="text-xs text-gray-400">Orders</p>
                        <p className="text-lg font-bold text-white">48</p>
                        <p className="text-xs text-green-500">+5 new today</p>
                      </div>
                    </div>
                    
                    {/* Recent Orders */}
                    <div className="mb-4">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-sm">Recent Orders</h4>
                        <p className="text-xs text-emerald-400">View All</p>
                      </div>
                      
                      {/* Order Items */}
                      {[1, 2, 3].map((item) => (
                        <div key={item} className="bg-white/5 border border-white/10 rounded-lg p-3 mb-2 shadow-sm">
                          <div className="flex justify-between">
                            <div>
                              <p className="text-xs font-medium">Order #{1000 + item}</p>
                              <p className="text-xs text-gray-400">2 mins ago</p>
                            </div>
                            <p className="text-sm font-bold">₹{(item * 450).toLocaleString()}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Quick Actions */}
                    <div>
                      <h4 className="font-medium text-sm mb-2">Quick Actions</h4>
                      <div className="grid grid-cols-3 gap-2">
                        {['New Sale', 'Inventory', 'Reports'].map((action, i) => (
                          <div key={i} className="bg-white/5 border border-white/10 p-2 rounded-lg text-center">
                            <div className="w-8 h-8 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-1">
                              <div className="w-4 h-4 bg-emerald-500 rounded-md"></div>
                            </div>
                            <p className="text-xs">{action}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Navigation */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gray-900/50 border-t border-white/10 p-2 flex justify-around backdrop-blur-sm">
                    {['Home', 'Sales', 'Products', 'More'].map((item, i) => (
                      <div key={i} className={`p-2 rounded-md ${i === 0 ? 'bg-emerald-500/10' : ''}`}>
                        <div className={`w-5 h-5 mx-auto ${i === 0 ? 'bg-emerald-500' : 'bg-gray-500'} rounded-md`}></div>
                        <p className={`text-[10px] mt-1 text-center ${i === 0 ? 'text-emerald-400 font-medium' : 'text-gray-400'}`}>{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* QR Code */}
            <div className="absolute -right-4 bottom-20 bg-card p-4 rounded-xl shadow-lg transform rotate-3 z-20 border">
              <div className="w-24 h-24 bg-muted mb-2 flex items-center justify-center">
                <div className="w-16 h-16 bg-foreground flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-1">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-white"></div>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-center font-medium">Scan to download</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileAppShowcase;