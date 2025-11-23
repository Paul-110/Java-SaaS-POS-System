import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, BarChart3, Users, Package, Calendar, Settings, ChevronRight, Play, Pause } from 'lucide-react';

const LiveDemoSection = () => {
  const [activeTab, setActiveTab] = useState('pos');
  const [isPlaying, setIsPlaying] = useState(false);
  
  const tabs = [
    { id: 'pos', label: 'POS Terminal', icon: <ShoppingCart className="w-5 h-5" /> },
    { id: 'analytics', label: 'Analytics', icon: <BarChart3 className="w-5 h-5" /> },
    { id: 'inventory', label: 'Inventory', icon: <Package className="w-5 h-5" /> },
    { id: 'customers', label: 'Customers', icon: <Users className="w-5 h-5" /> },
  ];

  const features = {
    pos: [
      'Intuitive touchscreen interface',
      'Fast barcode scanning',
      'Quick product search',
      'Customizable hotkeys',
      'Multiple payment methods',
      'Receipt customization'
    ],
    analytics: [
      'Real-time sales dashboard',
      'Product performance metrics',
      'Employee performance tracking',
      'Custom report generation',
      'Data export options',
      'Visual data representation'
    ],
    inventory: [
      'Real-time stock tracking',
      'Low stock alerts',
      'Automated reordering',
      'Supplier management',
      'Stock transfer between stores',
      'Batch and expiry tracking'
    ],
    customers: [
      'Customer profiles',
      'Purchase history',
      'Loyalty program integration',
      'Automated marketing',
      'Customer segmentation',
      'Feedback collection'
    ]
  };

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  // Auto-cycle tabs when playing
  useEffect(() => {
    let tabInterval;
    if (isPlaying) {
      tabInterval = setInterval(() => {
        setActiveTab(prevTab => {
          const currentIndex = tabs.findIndex(t => t.id === prevTab);
          const nextIndex = (currentIndex + 1) % tabs.length;
          return tabs[nextIndex].id;
        });
      }, 4000); // Change tab every 4 seconds
    }
    return () => clearInterval(tabInterval);
  }, [isPlaying]);

  return (
    <section className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            See It <span className="text-emerald-400">In Action</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience our intuitive interface and powerful features through our interactive demo
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side - Demo Tabs */}
          <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 sticky top-24 backdrop-blur-lg shadow-lg">
            <h3 className="text-xl font-bold text-white mb-6">Explore Features</h3>
            
            <div className="space-y-3 mb-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${activeTab === tab.id ? 'bg-emerald-600 text-white' : 'bg-white/5 text-white hover:bg-white/10'}`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`${activeTab === tab.id ? 'text-white' : 'text-emerald-400'}`}>
                      {tab.icon}
                    </div>
                    <span className="font-medium">{tab.label}</span>
                  </div>
                  {activeTab === tab.id && <ChevronRight className="w-5 h-5" />}
                </button>
              ))}
            </div>
            
            <div className="space-y-4">
              <h4 className="font-medium text-white">Key Features:</h4>
              <ul className="space-y-2">
                {features[activeTab].map((feature, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="mt-8">
              <Button className="w-full group bg-emerald-600 hover:bg-emerald-500 text-white">
                Request Full Demo
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </div>
          </div>
          
          {/* Right Side - Demo Display */}
          <div className="lg:col-span-8">
            <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-lg shadow-lg">
              {/* Demo Header */}
              <div className="bg-black/20 p-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center space-x-4">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="text-sm font-medium text-gray-300">
                    {activeTab === 'pos' && 'POS Terminal - Checkout'}
                    {activeTab === 'analytics' && 'Analytics Dashboard'}
                    {activeTab === 'inventory' && 'Inventory Management'}
                    {activeTab === 'customers' && 'Customer Management'}
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button 
                    onClick={togglePlayback}
                    className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/30"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <div className="text-xs text-gray-300">{isPlaying ? 'Demo Playing' : 'Click to Play'}</div>
                </div>
              </div>
              
              {/* Demo Content */}
              <div className="p-6 h-[500px] overflow-hidden relative">
                {activeTab === 'pos' && (
                  <div className="h-full">
                    <div className="grid grid-cols-12 gap-4 h-full">
                      {/* Left Side - Products */}
                      <div className="col-span-8 flex flex-col">
                        <div className="bg-black/20 p-3 rounded-lg mb-4">
                          <div className="flex space-x-2">
                            <input type="text" className="flex-1 p-2 border border-white/20 bg-white/5 rounded-md text-white placeholder-gray-400" placeholder="Search products..." />
                            <button className="bg-emerald-600 text-white p-2 rounded">Scan</button>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-4 gap-3 overflow-y-auto flex-1">
                          {Array.from({ length: 12 }).map((_, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 rounded-lg p-3 flex flex-col items-center text-center hover:border-emerald-500 hover:shadow-md transition-all cursor-pointer">
                              <div className="w-12 h-12 bg-black/20 rounded-lg mb-2 flex items-center justify-center">
                                <div className="w-8 h-8 rounded bg-emerald-500/20"></div>
                              </div>
                              <p className="text-xs font-medium text-white mb-1">Product {i + 1}</p>
                              <p className="text-xs text-gray-400">₹{((i + 1) * 99).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right Side - Cart */}
                      <div className="col-span-4 bg-black/20 rounded-lg p-4 flex flex-col border border-white/10">
                        <div className="mb-3 pb-3 border-b border-white/10">
                          <h3 className="font-medium text-white mb-1">Current Sale</h3>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-400">Items: 3</span>
                            <span className="text-gray-400">Total: ₹547.00</span>
                          </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto mb-4">
                          {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center justify-between py-2 border-b border-white/5">
                              <div>
                                <p className="text-sm font-medium text-white">Product {item}</p>
                                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                                  <span>₹{(item * 99).toFixed(2)}</span>
                                  <span>×</span>
                                  <span>{item}</span>
                                </div>
                              </div>
                              <p className="font-medium">₹{(item * item * 99).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                        
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between">
                            <span className="text-gray-400">Subtotal</span>
                            <span className="font-medium">₹547.00</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-400">Tax (18%)</span>
                            <span className="font-medium">₹98.46</span>
                          </div>
                          <div className="flex justify-between text-lg font-bold">
                            <span>Total</span>
                            <span>₹645.46</span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2">
                          <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">Hold</Button>
                          <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500">Pay Now</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                {activeTab === 'analytics' && (
                  <div className="h-full">
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {['Today\'s Sales', 'Weekly Revenue', 'Monthly Growth'].map((title, i) => (
                        <div key={i} className="bg-black/20 rounded-lg p-4 border border-white/10">
                          <p className="text-sm text-gray-400 mb-1">{title}</p>
                          <p className="text-2xl font-bold text-white">
                            {i === 0 ? '₹12,450' : i === 1 ? '₹86,320' : '+18.5%'}
                          </p>
                          <div className="flex items-center mt-2">
                            <div className="w-full bg-white/10 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full ${i === 2 ? 'bg-green-500' : 'bg-emerald-500'}`} 
                                style={{ width: `${i === 0 ? 65 : i === 1 ? 80 : 85}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      <div className="col-span-2 bg-black/20 rounded-lg p-4 border border-white/10">
                        <div className="flex justify-between mb-4">
                          <h3 className="font-medium">Sales Overview</h3>
                          <div className="flex space-x-2">
                            <button className="text-xs bg-emerald-600 text-white px-2 py-1 rounded">Weekly</button>
                            <button className="text-xs bg-white/10 text-gray-300 px-2 py-1 rounded">Monthly</button>
                          </div>
                        </div>
                        <div className="h-48 flex items-end space-x-2">
                          {[35, 55, 40, 70, 85, 60, 30].map((height, i) => (
                            <div key={i} className="flex-1 flex flex-col items-center">
                              <div 
                                className="w-full bg-emerald-500/80 rounded-t" 
                                style={{ height: `${height}%` }}
                              ></div>
                              <p className="text-xs mt-1">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                        <h3 className="font-medium mb-4">Top Categories</h3>
                        <div className="space-y-4">
                          {['Electronics', 'Clothing', 'Groceries', 'Home Goods'].map((category, i) => (
                            <div key={i}>
                              <div className="flex justify-between text-sm mb-1">
                                <span>{category}</span>
                                <span>{[32, 28, 21, 19][i]}%</span>
                              </div>
                              <div className="w-full bg-white/10 rounded-full h-2">
                                <div 
                                  className="h-2 rounded-full bg-emerald-500" 
                                  style={{ width: `${[32, 28, 21, 19][i]}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-4 border border-white/10">
                      <div className="flex justify-between mb-4">
                        <h3 className="font-medium">Recent Transactions</h3>
                        <button className="text-xs text-emerald-400">View All</button>
                      </div>
                      <div className="grid grid-cols-4 text-xs text-gray-400 mb-2">
                        <span>Order ID</span>
                        <span>Customer</span>
                        <span>Amount</span>
                        <span>Status</span>
                      </div>
                      {[1, 2, 3].map((i) => (
                        <div key={i} className="grid grid-cols-4 py-2 border-t border-white/5">
                          <span className="text-sm">#ORD-{1000 + i}</span>
                          <span className="text-sm">Customer {i}</span>
                          <span className="text-sm">₹{(i * 450).toFixed(2)}</span>
                          <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800 inline-block text-center w-20">
                            Completed
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'inventory' && (
                  <div className="h-full">
                    <div className="flex space-x-4 mb-6">
                      <div className="flex-1">
                        <input type="text" className="w-full p-2 border border-white/20 bg-white/5 rounded-md text-white placeholder-gray-400" placeholder="Search inventory..." />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">Filter</Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500">+ Add Product</Button>
                      </div>
                    </div>
                    
                    <div className="bg-black/20 rounded-lg p-4 mb-6 border border-white/10">
                      <div className="grid grid-cols-5 gap-4">
                        {['Total Products', 'In Stock', 'Low Stock', 'Out of Stock', 'Categories'].map((title, i) => (
                          <div key={i} className="bg-white/5 rounded-lg p-3 text-center border border-white/10">
                            <p className="text-sm text-gray-400 mb-1">{title}</p>
                            <p className="text-xl font-bold text-white">
                              {i === 0 ? '1,245' : i === 1 ? '1,100' : i === 2 ? '95' : i === 3 ? '50' : '32'}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-6 bg-black/20 p-3 text-sm font-medium text-white">
                        <div>Product</div>
                        <div>SKU</div>
                        <div>Category</div>
                        <div>Price</div>
                        <div>Stock</div>
                        <div>Actions</div>
                      </div>
                      
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-6 p-3 border-t border-white/5 items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-black/20 rounded flex-shrink-0"></div>
                            <span className="text-sm font-medium">Product {i + 1}</span>
                          </div>
                          <div className="text-sm text-gray-400">SKU-{1000 + i}</div>
                          <div className="text-sm text-gray-400">
                            {['Electronics', 'Clothing', 'Groceries', 'Home Goods', 'Toys'][i]}
                          </div>
                          <div className="text-sm">₹{((i + 1) * 499).toFixed(2)}</div>
                          <div>
                            <span className={`text-xs px-2 py-1 rounded-full ${i === 3 ? 'bg-red-500/20 text-red-300' : i === 2 ? 'bg-yellow-500/20 text-yellow-300' : 'bg-green-500/20 text-green-300'}`}>
                              {i === 3 ? 'Out of stock' : i === 2 ? 'Low stock' : `${(i + 1) * 25} in stock`}
                            </span>
                          </div>
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800" title="Edit">
                              <Settings className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-emerald-400 hover:text-emerald-300" title="Restock">
                              <Package className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {activeTab === 'customers' && (
                  <div className="h-full">
                    <div className="flex space-x-4 mb-6">
                      <div className="flex-1">
                        <input type="text" className="w-full p-2 border border-white/20 bg-white/5 rounded-md text-white placeholder-gray-400" placeholder="Search customers..." />
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">Filter</Button>
                        <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500">+ Add Customer</Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-4 mb-6">
                      {['Total Customers', 'New This Month', 'Repeat Customers', 'Avg. Spend'].map((title, i) => (
                        <div key={i} className="bg-black/20 rounded-lg p-4 border border-white/10">
                          <p className="text-sm text-gray-400 mb-1">{title}</p>
                          <p className="text-xl font-bold text-white">
                            {i === 0 ? '3,542' : i === 1 ? '128' : i === 2 ? '68%' : '₹1,250'}
                          </p>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white/5 border border-white/10 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-6 bg-black/20 p-3 text-sm font-medium text-white">
                        <div>Customer</div>
                        <div>Email</div>
                        <div>Phone</div>
                        <div>Total Spent</div>
                        <div>Last Purchase</div>
                        <div>Actions</div>
                      </div>
                      
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="grid grid-cols-6 p-3 border-t border-white/5 items-center">
                          <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-black/20 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-medium">
                              {['RK', 'PS', 'AP', 'SK', 'MJ'][i]}
                            </div>
                            <span className="text-sm font-medium">
                              {['Rajesh Kumar', 'Priya Sharma', 'Amit Patel', 'Sneha Kapoor', 'Mohit Jain'][i]}
                            </span>
                          </div>
                          <div className="text-sm text-gray-400">customer{i + 1}@example.com</div>
                          <div className="text-sm text-gray-400">+91 98765 4{i}210</div>
                          <div className="text-sm">₹{((i + 1) * 2500).toLocaleString()}</div>
                          <div className="text-sm text-gray-400">{['Today', '2 days ago', '1 week ago', '2 weeks ago', '1 month ago'][i]}</div>
                          <div className="flex space-x-2">
                            <button className="p-1 text-blue-600 hover:text-blue-800" title="View Profile">
                              <Users className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-emerald-400 hover:text-emerald-300" title="Schedule Follow-up">
                              <Calendar className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Demo Overlay - Shown when not playing */}
                {!isPlaying && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-10">
                    <div className="text-center">
                      <button
                        onClick={togglePlayback}
                        className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center hover:bg-emerald-500 transition-colors mb-4 mx-auto"
                      >
                        <Play className="w-6 h-6" />
                      </button>
                      <p className="text-white text-lg font-medium">Click to Play Interactive Demo</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            <div className="mt-6 text-center">
              <p className="text-gray-300 mb-4">Want to see more? Schedule a personalized demo with our team.</p>
              <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white/10">
                Book a Live Demo
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveDemoSection;