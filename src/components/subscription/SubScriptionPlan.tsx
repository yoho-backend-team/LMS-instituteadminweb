import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { HiCheckCircle } from "react-icons/hi";

type PlanType = {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
};

const plans: PlanType[] = [
  {
    id: 1,
    name: "Basic Plan",
    description: "The Plan is for everyone",
    price: 2000,
    features: ["Admins", "Students", "Teachers", "Batches", "Courses", "Classes"],
  },
  {
    id: 2,
    name: "Premium Plan",
    description: "The Plan is for Premium users",
    price: 15000,
    features: ["Admins", "Students", "Teachers", "Batches", "Courses", "Classes"],
  },
  {
    id: 3,
    name: "New Year Plan",
    description: "The Plan is an exclusive offer",
    price: 12000,
    features: ["Admins", "Students", "Teachers", "Batches", "Courses", "Classes"],
  },
];

export const SubScriptionPlan = () => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Basic Plan");

  return (
    <div className="flex flex-wrap justify-between gap-4 px-6 py-4">
      {plans.map((plan) => {
        const isSelected = plan.name === selectedPlan;

        return (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan.name)}
            className={cn(
              "w-full max-w-sm rounded-2xl border shadow-md p-6 flex flex-col justify-between cursor-pointer transition-all duration-300",
              isSelected ? "bg-[#1BBFCA] text-white" : "bg-white text-gray-700"
            )}
          >
            <div>
              <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
              <p className={cn("text-sm mb-4", isSelected ? "text-white/90" : "text-gray-500")}>
                {plan.description}
              </p>
              <p className="text-center text-2xl font-bold mb-4">
                ₹{plan.price.toLocaleString()}{" "}
                <span className="text-sm font-normal">/Monthly</span>
              </p>
            </div>

            <div
              className={cn(
                "p-4 rounded-xl mb-6 text-sm",
                isSelected ? "bg-[#1BBFCA]/20" : "bg-gray-100"
              )}
            >
              <p className={cn("font-semibold uppercase mb-3", isSelected ? "text-white" : "text-gray-600")}>
                Features
              </p>
              <ul className="space-y-2">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <HiCheckCircle
                      className={cn(
                        "w-6 h-6 rounded-full p-1 transition-all",
                        isSelected
                          ? "text-white bg-[#1BBFCA]"
                          : "text-gray-400 color-white"
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col gap-2">
              <Button
                className={cn(
                  "w-full rounded-full text-sm",
                  isSelected
                    ? "bg-white text-cyan-500 hover:bg-gray-100"
                    : "bg-gray-200 text-gray-600 cursor-not-allowed"
                )}
                disabled={!isSelected}
              >
                Your Plan
              </Button>

              <Button
                className={cn(
                  "w-full rounded-full text-sm border",
                  isSelected
                    ? "bg-white text-cyan-500 border-cyan-500 cursor-not-allowed"
                    : "bg-cyan-500 text-white hover:bg-cyan-600 border-transparent"
                )}
                disabled={isSelected}
              >
                Upgrade Plan
              </Button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
