import React, { useState } from "react";
import { TiTick } from "react-icons/ti";
import { BsThreeDotsVertical } from "react-icons/bs";

interface Plan {
  title: string;
  description: string;
  price: string;
  features: string[];
  image: File | string;
}

const initialPlans: Plan[] = [
  {
    title: "Basic Plan – Free",
    description: "The plan is for everyone",
    price: "0",
    features: [
      "Admins: 100",
      "Students: 200",
      "Teachers: 4",
      "Batches: 6",
      "Courses: 10",
      "Classes: 20",
    ],
    image: "",
  },
  {
    title: "Premium",
    description: "The Plan is for premium plan",
    price: "15000",
    features: [
      "Admins: 100",
      "Students: 100",
      "Teachers: 40",
      "Batches: 60",
      "Courses: 100",
      "Classes: 100",
    ],
    image: "",
  },
  {
    title: "New Year Plan",
    description: "The Plan is for exclusive plan",
    price: "12000",
    features: [
      "Admins: 150",
      "Students: 250",
      "Teachers: 50",
      "Batches: 70",
      "Courses: 120",
      "Classes: 140",
    ],
    image: "",
  },
];

const SubscriptionPlan = () => {
  const [plans, setPlans] = useState<Plan[]>(initialPlans);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="bg-cover bg-center p-10">
      <div className="bg-black p-5 grid">
        <h2 className="text-2xl font-bold text-[#0E2B56] text-center">
          Subscriptions Plan
        </h2>

        {/* Table */}
        <table className="w-full mt-10 text-left border-separate border-spacing-y-3 mb-6 bg-white rounded-xl overflow-hidden">
          <thead className="bg-[#0E2B56] text-white">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Plan</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan, index) => (
              <tr
                key={index}
                className="bg-white shadow-sm rounded-md hover:bg-gray-100 transition"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{plan.title}</td>
                <td className="px-4 py-2">₹{plan.price}</td>
                <td className="px-4 py-2">{plan.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 mt-10 md:grid-cols-3 gap-6 items-start">
        {plans.map((plan, index) => (
          <div
            key={index}
            onClick={() => setSelectedIndex(index)}
            className={`cursor-pointer bg-black/5 backdrop-blur-xl rounded-xl shadow-lg flex flex-col border-2 transition-all duration-200 ${
              selectedIndex === index
                ? "border-green-500 scale-[1.02]"
                : "border-transparent"
            }`}
          >
            <div className="p-4">
              <div className="bg-white w-full h-40 rounded-xl overflow-hidden">
                {typeof plan.image === "string" && plan.image !== "" ? (
                  <img
                    src={plan.image}
                    alt="Plan"
                    className="w-full h-full object-cover"
                  />
                ) : plan.image instanceof File ? (
                  <img
                    src={URL.createObjectURL(plan.image)}
                    alt="Plan"
                    className="w-full h-full object-cover"
                  />
                ) : null}
              </div>

              <h3 className="text-2xl font-bold mt-5">{plan.title}</h3>
              <p className="text-sm mb-2">{plan.description}</p>
              <p className="text-5xl mt-1 text-center font-bold mb-4">
                ₹{plan.price}{" "}
                <span className="text-lg">/ </span>
                <span className="text-sm">Monthly</span>
              </p>
            </div>

            {plan.features.length > 0 && (
              <ul className="text-sm backdrop-blur-md bg-gray-100/10 p-6 mb-4 space-y-1">
                <h3 className="text-lg mb-2 font-semibold">FEATURES</h3>
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex text-md">
                    <span className="bg-white w-4 h-4 rounded-full mr-2 flex items-center justify-center">
                      <TiTick className="text-gray-400 text-sm" />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>
            )}

            <div className="p-6 flex">
              <button className="bg-white text-[#0E2B56] py-2 px-6 text-lg rounded self-start font-bold">
                Active
              </button>
              <button className="bg-white ml-auto p-2 h-8 py-1 rounded self-start font-bold">
                <BsThreeDotsVertical className="text-[#0E2B56]" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlan;
