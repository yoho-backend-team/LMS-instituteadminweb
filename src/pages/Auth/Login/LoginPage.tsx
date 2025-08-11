/* eslint-disable @typescript-eslint/no-explicit-any */
import { EyeIcon, EyeOff } from 'lucide-react';
import image from '../../../assets/Login/image.png';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { data, Link, useNavigate } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { useRef, useState } from 'react';
import { AuthLogin } from '../../../features/Auth/service';
import { useAuth } from '../AuthContext';
import toast from 'react-hot-toast';
import { StoreLocalStorage } from '../../../utils/localStorage';
import { useDispatch } from 'react-redux';
import { AuthThunks } from '../../../features/Auth/reducer/thunks';

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
				navigate('/otp-verify');
				StoreLocalStorage('OtpToken', response?.data?.token);
				StoreLocalStorage('otp', response?.data?.otp);
				StoreLocalStorage('email', response?.data?.email);
			} else {
				dispatch(AuthThunks(response?.data));
				StoreLocalStorage('instituteId', response?.data?.institute?.uuid)
				login(response?.data?.token);
				toast.success(response?.message);
			}
		} else {
			toast.error(response?.message);
		}
	};

	return (
		<div className='h-screen w-screen grid grid-cols-2'>
			<div className='w-full h-screen grid items-center'>
				<section className=' px-14 '>
					<h1
						style={{ ...FONTS.login_heading, color: COLORS.primary }}
						className='tracking-[20px] text-center'
					>
						LMS
					</h1>
					<div className='mt-12'>
						<h1 style={{ ...FONTS.login_heading_02, color: COLORS.primary }}>
							Hi, Welcome Back
						</h1>
						<p
							style={{ ...FONTS.login_description }}
							className='text-[#969696]'
						>
							Enter your Credentials to continue
						</p>
					</div>

					<div>
						<form className='w-full my-4' onSubmit={handleSubmit}>
							<div className='w-full'>
								<label
									style={{ ...FONTS.login_input_head }}
									className='text-[#716F6F]'
								>
									Email Or Username
								</label>
								<input
									type='email'
									ref={Inputemail}
									defaultValue='chandran1@gmail.com'
									className='w-full mb-3 mt-2 rounded-md px-4 py-2 outline-none border border-[#716F6F] text-[#716F6F]'
								/>
							</div>

							<div className='flex flex-col '>
								<label
									style={{ ...FONTS.login_input_head }}
									className='text-[#716F6F]'
								>
									Password
								</label>
								<div className='relative'>
									<input
										type={showPassword ? 'text' : 'password'}
										ref={Inputpassword}
										defaultValue='Testpass@2024'
										className='w-full mb-3 mt-2 rounded-md px-4 py-2 outline-none border border-[#716F6F] text-[#716F6F]'
									/>
									<span
										className='absolute top-5 right-3 text-gray-500 cursor-pointer'
										onClick={() => setShowPassword(!showPassword)}
									>
										{showPassword ? (
											<EyeOff className='w-5 h-5 text-[#716F6F]' />
										) : (
											<EyeIcon className='w-5 h-5 text-[#716F6F]' />
										)}
									</span>
								</div>
							</div>

							<div className='text-right mt-1'>
								<Link
									to='/reset-password'
									className='hover:underline'
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
								>
									Forgot Password?
								</Link>
							</div>

							<button
								type='submit'
								className={`w-full my-6 mt-8 py-2 rounded-md transition cursor-pointer`}
								style={{
									...FONTS.bold_heading,
									background: COLORS.primary,
									color: COLORS.white,
								}}
							>
								Sign In
							</button>
							<div className='flex items-center justify-center gap-2'>
								<BsInfoCircle />
								<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}>
									Enter the mail ID & Password given by LMS
								</p>
							</div>
						</form>
					</div>
				</section>
			</div>

			<div className='h-screen w-full '>
				<img src={image} alt='' className='object-cover w-full h-screen ' />
			</div>
		</div>
	);
};

export default LoginPage;
