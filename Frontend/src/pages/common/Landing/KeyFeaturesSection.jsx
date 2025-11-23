import { BarChart3 } from 'lucide-react'
import { Shield } from 'lucide-react'
import { Store } from 'lucide-react'
import { FileText } from 'lucide-react'
import { Users } from 'lucide-react'
import { ShoppingCart } from 'lucide-react'
import React from 'react'

const keyFeatures=[
              {
                icon: <ShoppingCart className="w-8 h-8" />,
                title: "Barcode Scanning & Billing",
                description: "Lightning-fast barcode scanning with instant product lookup and billing"
              },
              {
                icon: <BarChart3 className="w-8 h-8" />,
                title: "Inventory & Stock Management",
                description: "Real-time inventory tracking with low stock alerts and automated reordering"
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "Customer & Employee Profiles",
                description: "Comprehensive profiles for customers and role-based employee management"
              },
              {
                icon: <Shield className="w-8 h-8" />,
                title: "Role-Based Access Control",
                description: "Secure access control with customizable permissions for different staff roles"
              },
              {
                icon: <FileText className="w-8 h-8" />,
                title: "Sales Reporting",
                description: "Detailed analytics and reports to track performance and growth"
              },
              {
                icon: <Store className="w-8 h-8" />,
                title: "Multi-store Management",
                description: "Manage multiple locations from a single dashboard with centralized control"
              }
            ]

const KeyFeaturesSection = () => {
  return (
    <section id="features" className="py-20 md:py-28 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Everything You Need to Run Your Store
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our comprehensive POS system includes all the features modern retailers need to succeed.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {keyFeatures.map((feature, index) => (
              <div key={index} className="bg-white/5 border border-white/10 rounded-2xl p-8 transform hover:-translate-y-2 transition-transform duration-300 backdrop-blur-lg shadow-lg">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-6 text-emerald-400">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
  )
}

export default KeyFeaturesSection