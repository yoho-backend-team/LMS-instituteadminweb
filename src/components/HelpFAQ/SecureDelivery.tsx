import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router";

const SecureDelivery = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/help-faqs");
  };

  return (
    <div>
      <div onClick={() => handleNavigate()} className="">
        {" "}
        <IoArrowBackOutline className="h-6 w-6 bg-[#1BBFCA] rounded text-white" />
      </div>
      <div className="bg-[#1BBFCA] p-5 mt-5 text-white text-xl rounded-md font-semibold">
        Secure Delivery
      </div>
      <div className="bg-white mt-5 rounded-2xl gap-5 p-15">
        <div className="text-[#1BBFCA] text-3xl font-semibold">
          Secure Delivery with One-Time Password
        </div>
        <div className="text-[#716F6F] text-sm mt-5 border-b-1 pb-3">
          Learn more about six-digit delivery pin and where you can find it. An
          OTP adds an extra layer of security for your order item(s).
        </div>

        <div className="grid gap-6 mt-5  text-[#716F6F]">
          <div>
            <h3 className="font-semibold mb-1 text-lg">
              What is Secure Delivery with OTP?
            </h3>
            <p className="text-sm">
              Amazon delivery with OTP (One-time password) adds an extra layer
              of security to your packages. It is a six-digit number sent to
              your registered email address, when the package is Out for
              Delivery. It is valid until the end of the delivery day.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-lg">
              Will I get OTP for delivery of all my orders?
            </h3>
            <p className="text-sm">
              No, only selected products on Amazon.in will require an OTP for
              successful delivery.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-lg">
              I didn't get the OTP, where can I find it?
            </h3>
            <p className="text-sm">
              You will receive the OTP in your registered email address, SMS, or
              WhatsApp Messages. You can also find the OTP in tracking details
              of Your Order. If you are unable to locate the OTP at the time of
              delivery, request the delivery associate to resend it to your
              registered mobile number.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-1 text-lg">
              When shall I share the OTP with Delivery Associate?
            </h3>
            <p className="text-sm">
              Share the OTP with delivery associate in person at the time of
              Delivery Only. Do not share the OTP over phone. If you are not
              available to receive the package, you can share the OTP with
              someone you trust, so they can receive the package. We don't
              recommend sharing the OTP with an unknown person. If no one is
              available to receive the package, we will re-attempt the delivery
              on the next working day.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecureDelivery;
