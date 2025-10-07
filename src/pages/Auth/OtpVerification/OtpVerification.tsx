import React, { useRef, useState } from "react";
import otpimg from "../../../assets/otpimg.png";
import {
  GetLocalStorage,
  RemoveLocalStorage,
} from "../../../utils/localStorage";
import { AuthOtp } from "../../../features/Auth/service";
import toast from "react-hot-toast";
import { useAuth } from "../AuthContext";
import { COLORS, FONTS } from "../../../constants/uiConstants";

const OtpVerification = () => {
  const { login } = useAuth();
  const inputLength = 6;
  const [otpInput, setOtpInput] = useState<string[]>(
    Array(inputLength).fill("")
  );
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const otpValue = GetLocalStorage("otp");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    if (!value || value.length > 1) return;
    const updatedOtp = [...otpInput];
    updatedOtp[index] = value;
    setOtpInput(updatedOtp);

    if (index < inputLength - 1 && value !== "") {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace") {
      e.preventDefault();
      const updatedOtp = [...otpInput];
      updatedOtp[index] = "";
      setOtpInput(updatedOtp);
      if (index > 0) inputsRef.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const token = GetLocalStorage("OtpToken");
    const email = GetLocalStorage("email");
    const data = { token, email, otp: otpInput.join("") };
    const response = await AuthOtp(data);

    if (response?.status === "success" || response?.status === "sucess") {
      RemoveLocalStorage("OtpToken");
      RemoveLocalStorage("otp");
      RemoveLocalStorage("email");
      login(response?.data?.token);
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-col lg:flex-col">
  {/* IMAGE SECTION */}
  <div className="w-full h-[40vh] sm:h-[50vh] lg:h-[50vh] xl:h-[50vh] order-1 lg:order-1">
    <img
      src={otpimg}
      alt="OTP Verification"
      className="w-full h-full object-cover"
    />
  </div>

  {/* FORM SECTION */}
  <div className="flex flex-col justify-between items-center w-full px-4 sm:px-6 lg:px-8 xl:px-14 py-8 sm:py-10 lg:py-0 order-2 lg:order-2">
    <section className="w-full">
      {/* Heading */}
      <h1
        style={{ ...FONTS.login_heading, color: COLORS.primary }}
        className="tracking-[10px] sm:tracking-[15px] lg:tracking-[20px] text-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl mt-10"
      >
        LMS
      </h1>

      {/* Title & Description */}
      <div className="mt-8 sm:mt-10 lg:mt-12 xl:mt-16 text-center">
        <h1
          style={{ ...FONTS.login_heading_02, color: COLORS.primary }}
          className="font-semibold mb-3 text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
        >
          OTP Verification
        </h1>
        <p
          style={{ ...FONTS.login_description }}
          className="text-[#969696] text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
        >
          Enter the 6 Digit OTP Sent to your Mobile Number
        </p>
        <span
          style={{ ...FONTS.login_description }}
          className="text-[#969696] text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl block mt-1"
        >
          {typeof otpValue === "string" || typeof otpValue === "number"
            ? otpValue
            : ""}
        </span>
      </div>

      {/* OTP Inputs */}
      <div className="w-full mt-6 sm:mt-8 lg:mt-10 flex justify-center gap-3 sm:gap-4 lg:gap-5 flex-wrap">
        {otpInput.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            value={digit}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="border-2 border-[#1BBFCA] w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 xl:w-20 xl:h-20 text-lg sm:text-xl lg:text-2xl text-center rounded-md focus:outline-none"
            required
          />
        ))}
      </div>

      {/* Submit & Resend */}
      <div className="w-full flex flex-col items-center gap-4 mt-6 sm:mt-8">
        <button
          onClick={handleSubmit}
          style={{
            background: COLORS.primary,
            color: COLORS.white,
            ...FONTS.bold_heading,
          }}
          className="w-full py-2 sm:py-3 lg:py-4 rounded-md text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl cursor-pointer transition hover:bg-[#19acc5]"
        >
          Verify
        </button>
        <p className="text-[#716F6F] text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl cursor-pointer hover:text-[#1BBFCA] transition">
          Resend OTP
        </p>
      </div>
    </section>
  </div>
</div>

  );
};

export default OtpVerification;
