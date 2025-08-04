
import React, { useRef, useState } from 'react';
import otpimg from '../../../assets/otpimg.png'
import { GetLocalStorage, RemoveLocalStorage, StoreLocalStorage } from '../../../utils/localStorage';
import { AuthOtp } from '../../../features/Auth/service';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const OtpVerification = () => {

	const navigate = useNavigate()
	const { login } = useAuth()

	const inputLength = 6;
	const [otpInput, setOtpInput] = useState<string[]>(Array(inputLength).fill(''));
	const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
	const otpValue = JSON.stringify(GetLocalStorage('otp'))

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
		const value = e.target.value;
		if (!value || value.length > 1) return;

		const updatedOtp = [...otpInput];
		updatedOtp[index] = value;
		setOtpInput(updatedOtp);

		// Move to next input
		if (index < inputLength - 1 && value !== '') {
			inputsRef.current[index + 1]?.focus();
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {

		if (e.key === 'Backspace') {
			e.preventDefault();

			const updatedOtp = [...otpInput];
			updatedOtp[index] = '';
			setOtpInput(updatedOtp);

			if (index > 0) {
				inputsRef.current[index - 1]?.focus();
			}
		}
	};


	const handlesubmit = async () => {

		const token = GetLocalStorage('OtpToken')
		const email = GetLocalStorage('email')

		const data = {
			token,
			email,
			otp: otpInput.join('')
		}
		const response = await AuthOtp(data)
		if (response?.status == 'success' || response?.status == 'sucess') {
			RemoveLocalStorage('OtpToken')
			RemoveLocalStorage('otp')
			RemoveLocalStorage('email')
			console.log(response)
			login(response?.data?.token)

		} else {
			toast.error(response?.message)
		}
	}

	return (
		<div className='w-screen h-screen grid grid-cols-2 bg-white overflow-hidden'>
			<div className='w-full h-full flex flex-col justify-center items-center gap-10 overflow-hidden'>
				<p className='text-[#1BBFCA] text-[82px] xl:text-[100px] font-bold cursor-default tracking-[20px]'>LMS</p>
				<div className="flex flex-col justify-center items-center gap-10">
					<div className='w-full cursor-default'>
						<p className='text-[28px] xl:text-[32px] font-bold text-[#1BBFCA]'>OTP Verifications</p>
						<p className='text-[16px] xl:text-[20px] font-normal text-[#969696]'>Enter the 6 Digit OTP Sent to your Mobile Number</p>
						<span className='text-[16px] xl:text-[20px] font-normal text-[#969696]'>{otpValue ?? ''}</span>
					</div>
					<div className="w-max gap-5 flex flex-row justify-center">
						{otpInput.map((digit, index) => (
							<input
								key={index}
								type="text"
								maxLength={1}
								value={digit}
								ref={(el) => {
									if (el) {
										inputsRef.current[index] = el;
									}
								}}
								onChange={(e) => handleChange(e, index)}
								onKeyDown={(e) => handleKeyDown(e, index)}
								className="border-2 border-[#1BBFCA] md:w-12 md:h-12 lg:w-18 lg:h-18 xl:w-20 xl:h-20 text-2xl md:text-xl text-center rounded-md focus:outline-none"
								required
							/>
						))}
					</div>
					<div className="w-full flex flex-col items-center gap-5 ">
						<div
							onClick={handlesubmit}
							className='text-[#FFFFFF] w-full text-[20px] cursor-pointer font-bold  bg-[#1BBFCA] text-center p-4 rounded-md'>
							Verify
						</div>
						<p className='text-[#716F6F] text-[16px] font-medium cursor-pointer'>Resend OTP</p>
					</div>
				</div>
			</div>
			<div className='w-full h-full overflow-hidden'>
				<img src={otpimg} alt="" className='h-full w-full' />
			</div>
		</div>
	)
};

export default OtpVerification;
