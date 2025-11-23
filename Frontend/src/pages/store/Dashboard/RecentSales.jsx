import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../../../components/ui/avatar";

const sales = [
  { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "+₹1,999.00" },
  { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "+₹39.00" },
  { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "+₹299.00" },
  { name: "William Kim", email: "will@email.com", amount: "+₹99.00" },
  { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "+₹39.00" },
];

const RecentSales = () => {
  return (
    <Card className="bg-black/20 backdrop-blur-lg border border-white/10 text-white h-full rounded-2xl">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-white">Recent Sales</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {sales.map((sale, index) => (
            <div key={index} className="flex items-center">
              <Avatar className="h-9 w-9">
                <AvatarImage src={`/avatars/${index + 1}.png`} alt="Avatar" />
                <AvatarFallback className="bg-emerald-500/20 text-emerald-400">
                  {sale.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="ml-4 space-y-1">
                <p className="text-sm font-medium leading-none text-white">{sale.name}</p>
                <p className="text-sm text-gray-400">{sale.email}</p>
              </div>
              <div className="ml-auto font-medium text-white">{sale.amount}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentSales;
