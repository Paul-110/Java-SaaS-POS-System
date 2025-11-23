import React from 'react';
import { CheckCircle, X } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const FeatureComparisonTable = () => {
  // Feature categories and their features
  const featureCategories = [
    {
      name: 'Core POS Features',
      features: [
        { name: 'Barcode Scanning', basic: true, pro: true, enterprise: true },
        { name: 'Receipt Printing', basic: true, pro: true, enterprise: true },
        { name: 'Product Management', basic: true, pro: true, enterprise: true },
        { name: 'Customer Database', basic: true, pro: true, enterprise: true },
        { name: 'Offline Mode', basic: true, pro: true, enterprise: true },
      ]
    },
    {
      name: 'Advanced Features',
      features: [
        { name: 'Multi-store Management', basic: false, pro: true, enterprise: true },
        { name: 'Advanced Reporting', basic: false, pro: true, enterprise: true },
        { name: 'Inventory Forecasting', basic: false, pro: true, enterprise: true },
        { name: 'Staff Management', basic: false, pro: true, enterprise: true },
        { name: 'API Access', basic: false, pro: true, enterprise: true },
      ]
    },
    {
      name: 'Enterprise Features',
      features: [
        { name: 'White Labeling', basic: false, pro: false, enterprise: true },
        { name: 'Custom Development', basic: false, pro: false, enterprise: true },
        { name: 'On-premise Deployment', basic: false, pro: false, enterprise: true },
        { name: 'SLA Guarantee', basic: false, pro: false, enterprise: true },
        { name: 'Dedicated Account Manager', basic: false, pro: false, enterprise: true },
      ]
    },
  ];

  // Helper function to render feature availability indicator
  const renderAvailability = (available) =>
    available ? (
      <CheckCircle className="w-5 h-5 text-emerald-400" />
    ) : (
      <X className="w-5 h-5 text-white/30" />
    );

  return (
    <div>
      <div className="hidden md:grid grid-cols-4 gap-4 px-6 pb-4 text-center font-medium text-gray-300 border-b border-white/10">
        <div className="text-left">Feature</div>
        <div>Basic</div>
        <div className="text-emerald-400">Pro</div>
        <div>Enterprise</div>
      </div>
      <Accordion type="multiple" className="w-full" defaultValue={['item-0']}>
        {featureCategories.map((category, categoryIndex) => (
          <AccordionItem key={categoryIndex} value={`item-${categoryIndex}`} className="border-b-0">
            <AccordionTrigger className="px-6 py-4 text-left hover:no-underline bg-white/5 my-2 rounded-lg text-white font-semibold text-lg hover:bg-white/10">
              {category.name}
            </AccordionTrigger>
            <AccordionContent className="px-6 pb-2 pt-2 text-gray-300">
              <div className="space-y-2">
                {category.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="grid grid-cols-2 md:grid-cols-4 gap-4 items-center py-3 border-b border-white/10">
                    <div className="col-span-2 md:col-span-1">{feature.name}</div>
                    <div className="flex justify-end md:justify-center">
                      <span className="md:hidden text-gray-400 mr-2">Basic: </span>
                      {renderAvailability(feature.basic)}
                    </div>
                    <div className="flex justify-end md:justify-center">
                      <span className="md:hidden text-gray-400 mr-2">Pro: </span>
                      {renderAvailability(feature.pro)}
                    </div>
                    <div className="flex justify-end md:justify-center">
                      <span className="md:hidden text-gray-400 mr-2">Enterprise: </span>
                      {renderAvailability(feature.enterprise)}
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default FeatureComparisonTable;