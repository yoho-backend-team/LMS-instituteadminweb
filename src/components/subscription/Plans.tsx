import { HiCheckCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { cancelplan } from "../../components/subscription/services"; // Adjust import path
import toast from "react-hot-toast";

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

type PlansProps = {
  plan: PlanType;
  show: boolean;
  onClose: () => void;
};

export const Plans = ({ plan, onClose, show }: PlansProps) => {
  const navigate = useNavigate();

  const handleCancel = async () => {
    try {
      toast.loading("Cancelling plan...");
      await cancelplan({ planId: plan._id }); // Pass required params
      toast.dismiss();
      toast.success("Plan cancelled successfully!");
      navigate("/subscription"); // Redirect to subscription page
    } catch (error: any) {
      toast.dismiss();
      toast.error(error?.message || "Failed to cancel plan");
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-[#1BBFCA] text-white p-4 rounded-xl flex justify-between items-start">
        <div>
          <h2 className="font-bold text-2xl">{plan.identity}</h2>
          <p className="text-sm mt-2">{plan.description}</p>
        </div>
        <button
          onClick={onClose}
          className="p-1 rounded-full hover:bg-white/20 transition"
        >
          <IoClose size={22} />
        </button>
      </div>

      {/* Content */}
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Features Box */}
        <div className="border-2 border-gray-100 shadow-xl rounded-xl p-4 flex-1">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">
            FEATURES
          </h4>
          <ul className="flex flex-wrap gap-4">
            {plan.features.filter((f) => f.feature).length > 0 ? (
              plan.features.filter((f) => f.feature).map((feature, index) => (
                <li
                  key={feature._id || index}
                  className="flex items-center text-gray-600 w-full sm:w-auto"
                >
                  <HiCheckCircle className="text-[#1BBFCA] mr-2 text-lg" />
                  <span>{feature.feature?.identity || "Unnamed Feature"}</span>
                </li>
              ))
            ) : (
              <li className="text-gray-400 text-sm">No features available</li>
            )}
          </ul>
        </div>

        {/* Plan Details Box */}
        <div className="bg-white border-2 border-gray-100 shadow-xl rounded-xl p-4 w-full max-w-md">
          <div className="w-full h-32 bg-gray-200 rounded mb-4" />
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Course Type:</span> {plan.identity}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">About Course:</span>{" "}
            {plan.description}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Course Price:</span> ${plan.price}
          </p>

          <div className="flex gap-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 border border-[#1BBFCA] bg-cyan-100 text-[#1BBFCA] rounded-md hover:bg-cyan-200 transition"
            >
              Cancel
            </button>
            <button className="px-4 py-2 bg-[#1BBFCA] text-white rounded-md hover:bg-[#18aab5] transition">
              {show ? "Renew" : "Upgrade Plan"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
