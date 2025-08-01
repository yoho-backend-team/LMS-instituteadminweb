import { Link } from 'react-router-dom';
import image from '../../../assets/Login/image.png'
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { BsInfoCircle } from 'react-icons/bs';

const ChangePassword = () => {
	return (
		<div className='h-screen w-screen grid grid-cols-2'>
			<div className="w-full h-screen grid items-center">
				<section className=' px-14 '>
					<h1 style={{...FONTS.login_heading , color:COLORS.primary}} className='tracking-[20px] text-center'>LMS</h1>
					<div className='mt-12'>
						<h1 style={{...FONTS.login_heading_02 , color:COLORS.primary}} className='mb-3'>Forgot Password?</h1>
						<p  style={{...FONTS.login_description}} className='text-[#969696]'>Enter your email and well send you instructions to reset your password</p>
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

							{/* Submit */}
							<button
								type='submit'
								className={`w-full my-6 mt-8 py-2 rounded-md transition cursor-pointer`}
								style={{ ...FONTS.bold_heading,background:COLORS.primary, color: COLORS.white }}
							>
								Send OTP
							</button>
							<Link
							to='/login'
							className='flex items-center justify-center gap-2'>
								<BsInfoCircle  />
								<p style={{...FONTS.heading_07,color:COLORS.gray_dark_02}}>
									Back to Login
								</p>
							</Link>
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

export default ChangePassword;
