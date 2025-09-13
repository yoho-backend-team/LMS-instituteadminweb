import { useEffect, useState } from 'react';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import bgImage from "../../../assets/IDcardManagement/staffIdBg.png";
import barCode from "../../../assets/IDcardManagement/barcode.png"
import { useDispatch, useSelector } from 'react-redux';
import { selectStaffId } from '../../../features/StaffIdCard/reducers/selectors';
import { getStaffIdcardthunks } from '../../../features/StaffIdCard/reducers/thunks';
import { GetImageUrl } from '../../../utils/helper';
import Shimmer from '../../../components/IdcardShimmer/Shimmer';
import { GetLocalStorage } from '../../../utils/localStorage';

const StaffIDCard = () => {
	const [flippedCards, setFlippedCards] = useState<Record<number, boolean>>({});
	const [isLoading, setIsLoading] = useState(true)

	const handleCardClick = (index: number) => {
		setFlippedCards(prev => ({
			...prev,
			[index]: !prev[index]
		}));
	};


	const dispatch = useDispatch<any>()

	const staffIdCard = useSelector(selectStaffId)

	 const overall_branch_id=GetLocalStorage("selectedBranchId")
		  const overall_istitute_id=GetLocalStorage("instituteId")
		 console.log(overall_branch_id,"branch id ")
		 console.log(overall_istitute_id,"institute id")

	useEffect(() => {
		(async () => {
			const paramsData = { branchid: overall_branch_id, instituteid: overall_istitute_id, page: 1 }
			const response = await dispatch(getStaffIdcardthunks(paramsData));
			console.log(response, "Staff Idcard Details")
			if (response?.status == "success") {
				setIsLoading(false)
			}
		})()
	}, [dispatch]);

	return (
		<div>
			<h1 style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}>Staff ID Card</h1>


			{isLoading ?

				<Shimmer />

				:
				<div className='mt-8 flex flex-wrap gap-8'>
					{staffIdCard?.map((data: any, index: any) => {
						return (
							<div className='mt-8 flex flex-wrap gap-8' key={index}>
								<div key={index} className="w-[370px] h-[560px] perspective-1000">
									<section
										className={`w-full h-full shadow-[0px_4px_24px_0px_#00000026] rounded-xl transition-transform duration-700 cursor-pointer relative`}
										onClick={() => handleCardClick(index)}
										style={{
											transformStyle: 'preserve-3d',
											transform: flippedCards[index] ? 'rotateY(180deg)' : 'rotateY(0deg)'
										}}
									>
										{/* Front Side */}
										<div
											className={`absolute w-full h-full rounded-xl border-b-[15px] border-[${COLORS.primary}] bg-white`}
											style={{
												backfaceVisibility: 'hidden',
											}}
										>
											<div className="bg-cover bg-center h-[220px] w-full bg-no-repeat flex justify-center items-center"
												style={{ backgroundImage: `url(${bgImage})` }}
											>
												<img src={GetImageUrl(data?.image) ?? undefined} alt={data?.name} className='w-[130px] h-[130px] rounded-full object-cover' />
											</div>

											<div className='text-center'>
												<h4 style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_02 }}>{data?.name}</h4>
												<p style={{ ...FONTS.heading_12, color: COLORS.gray_light }}>{data?.role?.identity}</p>
											</div>

											<div className='px-8 py-5 grid gap-2'>
												<p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>ID NO : <span style={{ ...FONTS.heading_13 }}>ANN-TIR-STDNT0019</span></p>
												<p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>User Name : <span style={{ ...FONTS.heading_13 }}>{data?.name}</span></p>
												<p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Email : <span style={{ ...FONTS.heading_13 }}>{data?.email}</span></p>
												<p style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Phone : <span style={{ ...FONTS.heading_13 }}>{data?.contact}</span></p>
											</div>

											<div className='p-4 mb-3'>
												<img src={barCode} alt="" className='w-[70%] h-12 m-auto' />
											</div>
										</div>

										{/* Back Side */}
										<div className={`absolute w-full h-full bg-white rounded-xl overflow-hidden border-t-[15px] border-[${COLORS.primary}]`}
											style={{
												backfaceVisibility: 'hidden',
												transform: 'rotateY(180deg)'
											}}
										>
											<div className="h-full relative flex flex-col justify-between p-6">
												<div className='py-5 grid gap-4'>
													<div className='flex'>
														<div className='w-1/3 flex justify-between'>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>User Name</span>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
														</div>
														<span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>{data?.name}</span>
													</div>

													<div className='flex'>
														<div className='w-1/3 flex justify-between'>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Email</span>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
														</div>
														<span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6 break-words'>{data?.email}</span>
													</div>

													<div className='flex'>
														<div className='w-1/3 flex justify-between'>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Role</span>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
														</div>
														<span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>{data?.role?.identity}</span>
													</div>

													<div className='flex'>
														<div className='w-1/3 flex justify-between'>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>ID NO</span>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
														</div>
														<span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>ANN-TIR-STDNT0019</span>
													</div>

													<div className='flex'>
														<div className='w-1/3 flex justify-between'>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Contact</span>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
														</div>
														<span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>{data?.contact}</span>
													</div>

													<div className='flex'>
														<div className='w-1/3 flex justify-between'>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>Address</span>
															<span style={{ ...FONTS.heading_06, color: COLORS.gray_dark_02 }}>:</span>
														</div>
														<span style={{ ...FONTS.heading_13 }} className='w-2/3 pl-6'>{data?.address?.address_line_one} , {data?.address?.address_line_one} , {data?.address?.city} , {data?.address?.state} - {data?.address?.pin_code}</span>
													</div>
												</div>

												<button className='mb-4 py-1 text-white rounded-[8px]' style={{ background: COLORS.light_green, ...FONTS.heading_07_bold }}>Download</button>
											</div>
										</div>
									</section>
								</div>
								{/* ); */}
							</div>
						)
					}
					)}
				</div>
			}



		</div>
	);
};

export default StaffIDCard;