import { HiCheckCircle } from "react-icons/hi";
import { IoClose } from "react-icons/io5";

type PlanType = {
  id: number;
  identity: string;
  description: string;
  price: number;
  features: string[];
};

type PlansProps = {
  plan: PlanType;
  onClose: () => void;
};

export const Plans = ({ plan, onClose }: PlansProps) => {
  return (
    <div>
      <div className="bg-[#1BBFCA] text-white p-2 pl-4 rounded-xl flex justify-between">
        <div>
          <h2 className="font-bold text-2xl">{plan.identity}</h2>
          <p className="text-sm mt-2">{plan.description}</p>
        </div>
        <div className="m-4 border bg-white rounded">
          <button
            onClick={onClose}
          >
            <IoClose size={20} className="bg-gray-700 rounded-full" />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap justify-between my-8">
        <div className="border-2 border-gray-100 shadow-xl rounded-xl p-4 w-full max-w-3xl h-28 flex-1 mb-0">
          <h4 className="text-lg font-semibold mb-4 text-gray-700">FEATURES</h4>
          <ul className="flex flex-wrap gap-8">
            {plan.features.map((feature: any, index: number) => (
              <li key={feature._id || index} className="flex items-center text-gray-600">
                <HiCheckCircle className="text-gray-600 mr-2 text-lg" />
                <span>{feature.feature?.identity || "Unnamed Feature"}</span>
              </li>
            ))}
          </ul>

        </div>

        <div className="bg-white border-2 border-gray-100 shadow-xl rounded-md p-4 w-full max-w-md flex-1">
          <div className="w-full h-32 bg-gray-200 rounded mb-4" />
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">Course Type:</span> {plan.identity}
          </p>
          <p className="text-sm text-gray-600 mb-1">
            <span className="font-semibold">About Course:</span> {plan.description}
          </p>
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">Course Price:</span> ${plan.price}
          </p>

          <div className="flex gap-4">
            <button className="px-4 py-2 border border-[#1BBFCA] bg-cyan-100 text-[#1BBFCA] rounded-md">Cancel</button>
            <button className="px-4 py-2 bg-[#1BBFCA] text-white rounded-md">Renew</button>
          </div>
        </div>
      </div>
    </div>
  );
};
