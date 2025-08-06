import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HiCheckCircle } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { getAllPlanThunk, getInstituteSubcriptionThunk, getSubscriptionStatusThunk, upgradeRequestThunk, } from "./thunk";

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
};


type SubScriptionPlanProps = {
  onSelectPlan: (plan: PlanType) => void;
};

// const plans: PlanType[] = [
//   {
//     id: 1,
//     name: "Basic Plan",
//     description: "The Plan is for everyone",
//     price: 2000,
//     features: ["Admins", "Students", "Teachers", "Batches", "Courses", "Classes"],
//   },
//   {
//     id: 2,
//     name: "Premium Plan",
//     description: "The Plan is for Premium users",
//     price: 15000,
//     features: ["Admins", "Students", "Teachers", "Batches", "Courses", "Classes"],
//   },
//   {
//     id: 3,
//     name: "New Year Plan",
//     description: "The Plan is an exclusive offer",
//     price: 12000,
//     features: ["Admins", "Students", "Teachers", "Batches", "Courses", "Classes"],
//   },
// ];

export const SubScriptionPlan = ({ onSelectPlan }: SubScriptionPlanProps) => {
  const dispatch:any = useDispatch()
  const plans: PlanType[] = useSelector((state: any) => state.subscription?.plans)
  const insitituteSubscription = useSelector((state: any) => state.subscription?.insitituteSubscription)
  const status = useSelector((state: any) => state.subscription?.status)
  const upgradeRequest = useSelector((state: any) => state.subscription?.upgradeRequest);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);

  const handleUpgrade = async (plan: PlanType) => {
  try {
    const actualInstituteId = insitituteSubscription?.[0]?.instituteId?._id;

    if (!actualInstituteId) {
      console.error("No institute ID found for upgrade");
      return;
    }

    await dispatch(upgradeRequestThunk(plan.id.toString(), actualInstituteId));
  } catch (error) {
    console.error("Upgrade error:", error);
  }
};

  useEffect(() => {
    dispatch(getAllPlanThunk());
    dispatch(getInstituteSubcriptionThunk())
    dispatch(getSubscriptionStatusThunk())
  }, [dispatch]);

  useEffect(() => {
  if (upgradeRequest) {
    dispatch(getInstituteSubcriptionThunk({}));
    dispatch(getSubscriptionStatusThunk({}));
  }
}, [upgradeRequest]);


  useEffect(() => {
    if (plans?.length && insitituteSubscription && !selectedPlan) {
      const subscribedPlan = plans.find(
        (p) => p.identity === insitituteSubscription?.plan?.identity
      );
      setSelectedPlan(subscribedPlan || plans[0]);
    }
  }, [plans, insitituteSubscription]);


  return (
    <div className="flex flex-wrap justify-between gap-4 px-6 py-4">
      {plans?.map((plan) => {
        const isSelected = selectedPlan?.
          identity
          === plan.
            identity
          ;

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
              <h2 className="text-xl font-semibold mb-1">{plan?.identity}</h2>
              <p className={cn("text-sm mb-4", isSelected ? "text-white/90" : "text-gray-500")}>
                {plan?.description}
              </p>
              <p className={cn("text-center text-2xl font-extrabold mb-4", isSelected ? "text-white" : "text-gray-600")}>
                ₹{plan.price.toLocaleString()}{" "}
                <span className="text-sm font-normal">/Monthly</span>
              </p>
            </div>

            <div
              className={cn(
                "p-4 rounded-xl mb-6 text-sm ",
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
                        isSelected ? "text-white bg-[#1BBFCA]" : "text-gray-400"
                      )}
                    />
                    <span>
                      {feature.feature?.identity || "Unnamed Feature"}
                    </span>
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
                onClick={() => handleUpgrade(plan)}
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
