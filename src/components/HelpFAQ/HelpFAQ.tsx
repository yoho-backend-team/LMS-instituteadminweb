import React from "react";
import { IoMdCall } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router";

const HelpFAQ = () => {
  const navigate = useNavigate();

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    if (selectedValue) {
      navigate(selectedValue);
    }
  };

  return (
    <div className="p-3">
      <div className="bg-[#1BBFCA] p-5 text-white text-lg rounded-md font-bold">
        CUSTOMER
      </div>

      <div className="bg-white w-full mt-5 p-5 rounded-2xl shadow-2xl">
        <div className="justify-center text-center text-[#716F6F] font-bold text-2xl">
          Hello, How Can We Help You
        </div>
        <select
          className="bg-white mt-5 w-2/4 h-12 ring-1 ring-[#716F6F] rounded text-[#716F6F]"
          onChange={handleSelectChange}
        >
          <option value="">Select a topic</option>
          <option value="/track-order">Track Package</option>
          <option value="/find-missingpackage">Find Missing Package</option>
          <option value="/shipping-speed">Shipping Speed</option>
          <option value="/secure-delivery">Secure Delivery</option>
        </select>

        <div className="grid grid-cols-3 mt-10">
          <div className="flex flex-col text-[#716F6F] gap-4">
            <span className="text-lg text-[#1BBFCA] font-semibold">
              For assistance related to your orders
            </span>
            <span>1.Track your package</span>
            <span>2.Find a missing package</span>
            <span>3.Shipping speed</span>
            <span>4.Shippment is late</span>
            <span>5.Secure Delivery</span>
          </div>
          <div className="flex flex-col text-[#716F6F] gap-4">
            <span className="text-lg text-[#1BBFCA] font-semibold">
              For assistance related to your orders
            </span>
            <span>1.Class</span>
            <span>2.Payment Slip</span>
            <span>3.Id card PDF</span>
            <span>4.Pay</span>
            <span>5.Class Updated</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 mt-5 gap-5 text-[#716F6F]">
        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="bg-[#1BBFCA] w-12 h-11 rounded-md p-3">
            <IoMdCall className="fill-white h-6 w-6" />
          </div>
          <div className="mt-3 font-bold text-[#716F6F]">+ (810) 2548 2568</div>
          <div className="mt-3">We are always happy to help!</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="bg-[#1BBFCA] w-12 h-11 rounded-md p-3">
            <IoMdCall className="fill-white h-6 w-6" />
          </div>
          <div className="mt-3 font-bold text-[#716F6F]">+ (810) 2548 2568</div>
          <div className="mt-3">We are always happy to help!</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="bg-[#1BBFCA] w-12 h-11 rounded-md p-3">
            <IoMdMail className="fill-white h-6 w-6" />
          </div>
          <div className="mt-3 font-bold text-[#716F6F]">help@gmail.com</div>
          <div className="mt-3">Best way to get answer fast!</div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-2xl">
          <div className="bg-[#1BBFCA] w-12 h-11 rounded-md p-3">
            <IoMdMail className="fill-white h-6 w-6" />
          </div>
          <div className="mt-3 font-bold text-[#716F6F]">help@gmail.com</div>
          <div className="mt-3">Best way to get answer fast!</div>
        </div>
      </div>
    </div>
  );
};

export default HelpFAQ;
