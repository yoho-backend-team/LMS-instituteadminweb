import { Link, useNavigate } from "react-router-dom";
import image from "../../../assets/Login/image.png";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import { BsInfoCircle } from "react-icons/bs";
import React, { useRef } from "react";
import { ForgetPassword } from "../../../features/Auth/service";
import { StoreLocalStorage } from "../../../utils/localStorage";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const navigate = useNavigate();
  const inputEmail = useRef<HTMLInputElement | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = inputEmail.current?.value;
    const response = await ForgetPassword({ email });

    StoreLocalStorage("otp", response?.otp);
    StoreLocalStorage("OtpToken", response?.token);
    StoreLocalStorage("email", response?.email);

    if (response?.status === "failed") {
      toast.error(response?.message);
    } else {
      toast.success(response?.message || "OTP sent successfully");
      navigate("/otp-verify");
    }
  }

  return (
    <div className="min-h-screen w-full flex flex-col md:grid md:grid-cols-2">
      {/* IMAGE SECTION (top on mobile, right on desktop) */}
      <div className="w-full h-[40vh] md:h-screen order-1 md:order-2">
        <img
          src={image}
          alt="Change Password Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* FORM SECTION (bottom on mobile, left on desktop) */}
      <div className="flex items-center justify-center w-full px-6 py-10 md:px-14 md:py-0 order-2 md:order-1">
        <section className="w-full ">
          {/* Heading */}
          <h1
            style={{
              ...FONTS.login_heading,
              color: COLORS.primary,
            }}
            className="tracking-[10px] sm:tracking-[15px] lg:tracking-[20px] text-center text-3xl sm:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
          >
            LMS
          </h1>

          {/* Title & Description */}
          <div className="mt-10 md:mt-12">
            <h1
              style={{
                ...FONTS.login_heading_02,
                color: COLORS.primary,
                fontSize: "clamp(1.5rem, 1.5vw + 1rem, 2.75rem)",
              }}
              className="font-semibold mb-3"
            >
              Forgot Password?
            </h1>
            <p
              style={{
                ...FONTS.login_description,
                fontSize: "clamp(0.875rem, 0.5vw + 0.75rem, 1.25rem)",
              }}
              className="text-[#969696]"
            >
              Enter your email and we’ll send you instructions to reset your password.
            </p>
          </div>

          {/* Form */}
          <form className="w-full mt-6 md:mt-10" onSubmit={handleSubmit}>
            {/* Email */}
            <div className="w-full mb-4">
              <label
                style={{
                  ...FONTS.login_input_head,
                  fontSize: "clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)",
                }}
                className="text-[#716F6F]"
              >
                Email or Username
              </label>
              <input
                type="email"
                ref={inputEmail}
                className="w-full mt-2 rounded-md px-4 py-2 border border-[#716F6F] text-[#716F6F] outline-none text-sm sm:text-base md:text-base lg:text-base xl:text-base"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                ...FONTS.bold_heading,
                background: COLORS.primary,
                color: COLORS.white,
                fontSize: "clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)",
              }}
              className="w-full my-6 py-2 rounded-md transition cursor-pointer"
            >
              Send OTP
            </button>

            {/* Back to Login */}
            <Link
              to="/login"
              className="flex items-center justify-center gap-2 mt-2"
            >
              <BsInfoCircle
                style={{ fontSize: "clamp(1rem, 1vw + 0.5rem, 1.25rem)" }}
              />
              <p
                style={{
                  ...FONTS.heading_07,
                  color: COLORS.gray_dark_02,
                  fontSize: "clamp(0.875rem, 0.5vw + 0.75rem, 1.125rem)",
                }}
              >
                Back to Login
              </p>
            </Link>
          </form>
        </section>
      </div>
    </div>
  );
};

export default ChangePassword;
