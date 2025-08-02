import { EyeIcon, EyeOff } from 'lucide-react';
import image from '../../../assets/Login/image.png'
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { Link } from 'react-router-dom';
import { BsInfoCircle } from 'react-icons/bs';
import { useState } from 'react';

const LoginPage = () => {
		const [showPassword, setShowPassword] = useState(false);

	return (
		<div className='h-screen w-screen grid grid-cols-2'>
			<div className="w-full h-screen grid items-center">
				<section className=' px-14 '>
					<h1 style={{...FONTS.login_heading , color:COLORS.primary}} className='tracking-[20px] text-center'>LMS</h1>
					<div className='mt-12'>
						<h1 style={{...FONTS.login_heading_02 , color:COLORS.primary}}>Hi, Welcome Back</h1>
						<p  style={{...FONTS.login_description}} className='text-[#969696]'>Enter your Credentials to continue</p>
					</div>

					<div>
						<form className='w-full my-4'>
							{/* Email */}
							<div className='w-full'>
								<label style={{ ...FONTS.login_input_head }} className='text-[#716F6F]'>Email Or Username</label>
								<input
									type='email'
									className='w-full mb-3 mt-2 rounded-md px-4 py-2 outline-none border border-[#716F6F] text-[#716F6F]'
								/>
							</div>

							{/* Password */}
							<div className='flex flex-col '>
								<label style={{ ...FONTS.login_input_head }} className='text-[#716F6F]'>Password</label>
								<div className='relative'>
									<input
										type={showPassword ? 'text' : 'password'}
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
									style={{...FONTS.heading_08 , color:COLORS.gray_dark_02}}
								>
									Forgot Password?
								</Link>
							</div>

							{/* Submit */}
							<button
								type='submit'
								className={`w-full my-6 mt-8 py-2 rounded-md transition cursor-pointer`}
								style={{ ...FONTS.bold_heading,background:COLORS.primary, color: COLORS.white }}
							>
								Sign In
							</button>
							<div className='flex items-center justify-center gap-2'>
								<BsInfoCircle  />
								<p style={{...FONTS.heading_07,color:COLORS.gray_dark_02}}>
									Enter the mail ID & Password given by LMS
								</p>
							</div>
						</form>

					</div>
				</section>
			</div>

			<div className="h-screen w-full ">
				<img src={image} alt="" className='object-cover w-full h-screen '/>
			</div>
		</div>
	);
};

export default LoginPage;
