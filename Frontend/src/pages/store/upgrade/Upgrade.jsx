import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { CheckCircle, Star } from "lucide-react";
import { getAllSubscriptionPlans } from "../../../Redux Toolkit/features/subscriptionPlan/subscriptionPlanThunks";

const Upgrade = () => {
  const dispatch = useDispatch();
  const { plans, loading } = useSelector((state) => state.subscriptionPlan);
  const { store } = useSelector((state) => state.store);

  useEffect(() => {
    dispatch(getAllSubscriptionPlans());
  }, [dispatch]);

  const currentPlanId = store?.subscription?.planId;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight text-white">Upgrade Your Plan</h2>
        <p className="text-gray-400">
          Choose a plan that fits your business needs and unlock more features.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col bg-black/20 backdrop-blur-lg border rounded-2xl transition-all duration-300 ${
              currentPlanId === plan.id
                ? "border-emerald-500 shadow-lg shadow-emerald-900/50"
                : "border-white/10"
            }`}
          >
            {currentPlanId === plan.id && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white">
                Current Plan
              </Badge>
            )}
            <CardHeader className="border-b border-white/10 text-center">
              <CardTitle className="text-2xl font-bold text-white">{plan.name}</CardTitle>
              <div className="text-4xl font-bold text-emerald-400 my-4">
                ₹{plan.price}
                <span className="text-base font-medium text-gray-400">/{plan.billingCycle.toLowerCase()}</span>
              </div>
              <CardDescription className="text-gray-400">{plan.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pt-6">
              <ul className="space-y-3">
                {plan.features?.map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-sm text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter className="border-t border-white/10 p-6">
              <Button
                className="w-full text-lg"
                disabled={currentPlanId === plan.id}
                variant={currentPlanId === plan.id ? "outline" : "default"}
              >
                {currentPlanId === plan.id ? "Currently Active" : "Choose Plan"}
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Upgrade;
