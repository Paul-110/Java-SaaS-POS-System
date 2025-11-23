import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const PricingCalculator = () => {
  return (
    <section className="py-20 md:py-28 relative">
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
         <div className="bg-white/5 border border-white/10 rounded-2xl shadow-xl overflow-hidden p-8 backdrop-blur-lg">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white mb-4">Need a custom plan?</h3>
              <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                We offer custom plans for enterprise clients with specific needs. Contact our sales team to get a personalized quote.
              </p>
              <Button className="bg-emerald-600 hover:bg-emerald-500 text-white">
                Contact Sales
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </div>
         </div>
      </div>
    </section>
  );
};

export default PricingCalculator;