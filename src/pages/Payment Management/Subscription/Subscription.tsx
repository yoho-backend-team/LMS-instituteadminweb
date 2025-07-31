import { useState } from "react";
import { SubScriptionPlan } from "../../../components/subscription/SubScriptionPlan";
import { Subscriptions } from "../../../components/subscription/Subscriptions";
import { Plans } from "../../../components/subscription/Plans";

type PlanType = {
  id: number;
  name: string;
  description: string;
  price: number;
  features: string[];
};

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [viewPlan, setViewPlan] = useState(false);

  return (
    <div className="overflow-scroll">
      {viewPlan && selectedPlan ? (
        <Plans
          plan={selectedPlan}
          onClose={() => {
            setViewPlan(false);
            setSelectedPlan(null);
          }}
        />
      ) : (
        <>
          <Subscriptions />
          <SubScriptionPlan
            onSelectPlan={(plan) => {
              setSelectedPlan(plan);
              setViewPlan(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Subscription;
