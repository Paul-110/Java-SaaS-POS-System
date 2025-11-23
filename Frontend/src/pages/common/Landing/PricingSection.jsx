import React from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "../../../components/ui/button";

const pricingPlans = [
  {
    name: "Basic",
    price: "₹999",
    period: "/month",
    features: [
      "Single store",
      "Basic reporting",
      "Email support",
      "Mobile app",
      "Unlimited products",
      "Cloud backup",
    ],
    popular: false,
  },
  {
    name: "Pro",
    price: "₹1,999",
    period: "/month",
    features: [
      "Multi-store",
      "Advanced analytics",
      "Priority support",
      "API access",
      "Custom integrations",
      "Staff management",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    features: [
      "Unlimited stores",
      "Dedicated support",
      "Custom development",
      "White-label options",
      "On-premise deployment",
      "SLA guarantee",
    ],
    popular: false,
  },
];

const PricingSection = () => {
  return (
    <section id="pricing" className="py-20 md:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Choose Your Plan
          </h2>
          <p className="text-xl text-gray-300">
            Flexible pricing plans designed for businesses of all sizes
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {pricingPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-lg shadow-lg ${
                plan.popular ? "ring-2 ring-emerald-500 relative" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">
                  {plan.name}
                </h3>
                <div className="flex items-baseline justify-center">
                  <span className="text-4xl font-bold text-white">
                    {plan.price}
                  </span>
                  <span className="text-gray-400 ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>
              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-emerald-400 mr-3 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                className={`w-full ${
                  plan.popular ? "bg-emerald-600 hover:bg-emerald-500" : "bg-white/10 hover:bg-white/20 text-white"
                }`}
              >
                {plan.name === "Enterprise"
                  ? "Contact Sales"
                  : "Start Trial"}
              </Button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-300 mb-4">
            All plans include a 14-day free trial. No credit card required.
          </p>
          <div className="inline-flex items-center space-x-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 backdrop-blur-lg">
            <CheckCircle className="w-5 h-5 text-emerald-400" />
            <span className="text-gray-300">
              100% money-back guarantee for 30 days
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
