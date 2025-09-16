import { useState } from "react";
import { SubScriptionPlan } from "../../../components/subscription/SubScriptionPlan";
import { Subscriptions } from "../../../components/subscription/Subscriptions";
import { Plans } from "../../../components/subscription/Plans";

type PlanType = {
  id: number;
  identity: string;
  description: string;
  price: number;
  features: {
    feature: { identity: string };
    count?: number;
    _id?: string;
  }[];
  _id: string;
};

const Subscription = () => {
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [viewPlan, setViewPlan] = useState(false);
  const [institutePlan, setinstitutePlan] = useState(false);

  return (
    <div className="overflow-scroll">
      {viewPlan && selectedPlan ? (
        <Plans
          plan={selectedPlan}
          show={institutePlan}
          onClose={() => {
            setViewPlan(false);
            setSelectedPlan(null);
          }}
        />
      ) : (
        <>
          <Subscriptions />
          <SubScriptionPlan
            onSelectPlan={(plan: PlanType, show: boolean) => {
              setSelectedPlan(plan);
              setinstitutePlan(show);
              setViewPlan(true);
            }}
          />
        </>
      )}
    </div>
  );
};

export default Subscription;
