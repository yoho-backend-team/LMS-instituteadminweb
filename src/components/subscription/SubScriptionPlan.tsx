import { useState } from "react";
import { cn } from "@/lib/utils";
import { HiCheckCircle } from "react-icons/hi";

type PlanType = {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
};

type SubScriptionPlanProps = {
  onSelectPlan: (plan: PlanType) => void;
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

export const SubScriptionPlan = ({ onSelectPlan }: SubScriptionPlanProps) => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(
  plans.find((p) => p.name === "Basic Plan") || null
);

  return (
    <div className="flex flex-wrap justify-between gap-4 px-6 py-4">
      {plans.map((plan) => {
        const isSelected = selectedPlan?.name === plan.name;

        return (
          <div
            key={plan.id}
            onClick={() => setSelectedPlan(plan)}
            className={cn(
              "w-full max-w-sm rounded-2xl border-2 border-gray-100 shadow-xl p-6 flex flex-col justify-between cursor-pointer transition-all duration-300",
              isSelected ? "bg-[#1BBFCA] text-white" : "bg-white text-gray-700"
            )}
          >
            <div>
              <div className={cn("w-full h-40 mb-4", isSelected ? "bg-white rounded-xl" : "bg-gray-200 rounded-xl")} />
              <h2 className="text-xl font-semibold mb-1">{plan.name}</h2>
              <p className={cn("text-sm mb-4", isSelected ? "text-white/90" : "text-gray-500")}>
                {plan.description}
              </p>
              <p className={cn("text-center text-2xl font-extrabold mb-4",isSelected ? "text-white" : "text-gray-600")}>
                ₹{plan.price.toLocaleString()}{" "}
                <span className="text-sm font-normal">/Monthly</span>
              </p>
            </div>

            <div
              className={cn(
                "p-4 rounded-xl mb-6 text-sm " ,
                isSelected ? "bg-[#1BBFCA]/4" : "bg-gray-100"
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
              <button
                className={cn(
                  "w-full text-sm p-3 rounded",
                  isSelected
                    ? "bg-white text-[#1BBFCA] hover:bg-gray-100"
                    : "bg-[#1BBFCA] text-white hover:bg-cyan-600 border-transparent"
                )}
                disabled={!isSelected}
                onClick={() => onSelectPlan(plan)} 
              >
                Your Plan
              </button>

              <button
                className={cn(
                  "w-full text-sm border p-3 rounded",
                  isSelected
                    ? " bg-[#1BBFCA] text-white hover:bg-cyan-600 border-white"
                    : " text-[#1BBFCA] cursor-not-allowed border-[#1BBFCA]"
                )}
                disabled={isSelected}
                onClick={() => onSelectPlan(plan)} 
              >
                Upgrade Plan
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
