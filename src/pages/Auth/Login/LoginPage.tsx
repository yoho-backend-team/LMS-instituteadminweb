import { EyeIcon, EyeOff } from "lucide-react";
import image from "../../../assets/Login/image.png";
import { COLORS, FONTS } from "../../../constants/uiConstants";
import { Link, useNavigate } from "react-router-dom";
import { BsInfoCircle } from "react-icons/bs";
import { useRef, useState } from "react";
import { AuthLogin } from "../../../features/Auth/service";
import { useAuth } from "../AuthContext";
import toast from "react-hot-toast";
import { StoreLocalStorage } from "../../../utils/localStorage";
import { useDispatch } from "react-redux";
import { AuthThunks } from "../../../features/Auth/reducer/thunks";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch<any>();
  const { login } = useAuth();
  const navigate = useNavigate();

  const Inputpassword = useRef<HTMLInputElement>(null);
  const Inputemail = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = Inputemail?.current?.value;
    const password = Inputpassword?.current?.value;
    const response = await AuthLogin({ email, password });

    if (response) {
      if (response?.data?.otpVerify) {
        toast.success(response?.message);
        navigate("/otp-verify");
        StoreLocalStorage("OtpToken", response?.data?.token);
        StoreLocalStorage("otp", response?.data?.otp);
        StoreLocalStorage("email", response?.data?.email);
      } else {
        dispatch(AuthThunks(response?.data));
        StoreLocalStorage("instituteId", response?.data?.institute?.uuid);
        login(response?.data?.token);
        toast.success(response?.message);
      }
    } else {
      toast.error(response?.message);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-2">
      {/* IMAGE SECTION */}
      <div className="w-full h-[40vh] sm:h-[50vh] lg:h-screen order-1 lg:order-2">
        <img
          src={image}
          alt="Login Illustration"
          className="object-cover w-full h-full"
        />
      </div>

      {/* FORM SECTION */}
      <div className="flex items-center justify-center w-full px-4 sm:px-6 lg:px-8 xl:px-14 py-8 sm:py-10 lg:py-0 order-2 lg:order-1 flex-wrap">
        <section className="w-full  ">
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
          <div className="mt-8 sm:mt-10 lg:mt-12 xl:mt-16">
            <h1
              style={{
                ...FONTS.login_heading_02,
                color: COLORS.primary,
              }}
              className="font-semibold mb-3 text-xl sm:text-2xl lg:text-3xl xl:text-4xl 2xl:text-5xl"
            >
              Hi, Welcome Back
            </h1>
            <p
              style={{
                ...FONTS.login_description,
              }}
              className="text-[#969696] text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
            >
              Enter your credentials to continue
            </p>
          </div>

          {/* Form */}
          <form
            className="w-full mt-6 sm:mt-8 lg:mt-10 xl:mt-12"
            onSubmit={handleSubmit}
          >
            {/* Email */}
            <div className="w-full mb-4 sm:mb-5">
              <label
                style={{
                  ...FONTS.login_input_head,
                }}
                className="text-[#716F6F] text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              >
                Email Or Username
              </label>
              <input
                type="email"
                ref={Inputemail}
                defaultValue="chandran1@gmail.com"
                className="w-full mt-2 rounded-md px-3 sm:px-4 py-2 sm:py-3 border border-[#716F6F] text-[#716F6F] outline-none text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col mb-4 sm:mb-5">
              <label
                style={{
                  ...FONTS.login_input_head,
                }}
                className="text-[#716F6F] text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  ref={Inputpassword}
                  defaultValue="Testpass@2024"
                  className="w-full mt-2 rounded-md px-3 sm:px-4 py-2 sm:py-3 border border-[#716F6F] text-[#716F6F] outline-none text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl pr-10"
                />
                <span
                  className="absolute transform -translate-y-1/2 top-1/2 right-3 text-gray-500 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-[#716F6F]" />
                  ) : (
                    <EyeIcon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-[#716F6F]" />
                  )}
                </span>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right mt-2">
              <Link
                to="/reset-password"
                style={{
                  ...FONTS.heading_08,
                  color: COLORS.gray_dark_02,
                }}
                className="hover:underline text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl 3xl:text-3xl"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={{
                ...FONTS.bold_heading,
                background: COLORS.primary,
                color: COLORS.white,
              }}
              className="w-full my-4 sm:my-6 py-2 sm:py-3 lg:py-4 rounded-md transition cursor-pointer text-sm sm:text-base lg:text-lg xl:text-xl 2xl:text-2xl"
            >
              Sign In
            </button>

            {/* Info */}
            <div className="flex items-center justify-center gap-2 mt-4">
              <BsInfoCircle className="flex-shrink-0 w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 2xl:w-7 2xl:h-7" />
              <p
                style={{
                  ...FONTS.heading_07,
                  color: COLORS.gray_dark_02,
                }}
                className="text-xs sm:text-sm lg:text-base xl:text-lg 2xl:text-xl"
              >
                Enter the mail ID & Password given by LMS
              </p>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default LoginPage;
