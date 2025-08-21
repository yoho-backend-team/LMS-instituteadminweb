import { ChevronDownIcon } from 'lucide-react';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../components/ui/select';
import { COLORS, FONTS } from '../../../../constants/uiConstants';
import { GetImageUrl } from '../../../../utils/helper';
import { SlOptionsVertical } from 'react-icons/sl';
import CardOptions from './CardOptions';
import { useEffect, useRef, useState } from 'react';
import { updateUserStatus } from '../service';
import warning from '../../../../assets/warningimg.png';
import { Card } from '../../../../components/ui/card';
import ContentLoader from 'react-content-loader';

interface UserDetail {
	image?: any;
	first_name?: string;
	last_name?: string;
	role?: {
		identity?: string;
	};
	is_active?: boolean;
	username?: string;
	email?: string;
	designation?: string;
	phone_number?: string;
	contact_info?: {
		city?: string;
	};
	uuid: string;
}

type props = {
	Users: UserDetail[];
	loading: boolean;
};

const UsersList: React.FC<props> = ({ Users, loading }) => {
	const [cardOptionsShow, setCardOptionsShow] = useState<number | null>(null);
	const [statusValue, setStatusValue] = useState<string>();
	const [userId, setUserId] = useState<string>();
	const [alertModal, setAlertModal] = useState<boolean>(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const handleStatusValue = (value: string, userId: string) => {
		setAlertModal(true);
		setStatusValue(value);
		setUserId(userId);
	};

	const handleUpdateStatus = async () => {
		const userStatus = statusValue === 'active' ? true : false;
		const data = {
			is_active: userStatus,
			userId: userId,
		};

		await updateUserStatus(data);
		setAlertModal(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setCardOptionsShow(null);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className=' w-full grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-4'>
			{loading ? (
				<div className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-5 col-span-3'>
					{[...Array(6)].map((_, index) => (
						<ContentLoader
							speed={1}
							width='100%'
							height='100%'
							backgroundColor='#f3f3f3'
							foregroundColor='#ecebeb'
							className='w-full h-[210px] p-4 rounded-2xl border shadow-md'
							key={index}
						>
							<rect x='0' y='0' rx='6' ry='6' width='100' height='24' />
							<rect x='270' y='0' rx='6' ry='6' width='80' height='24' />

							<rect x='0' y='36' rx='10' ry='10' width='100%' height='120' />

							<rect x='0' y='170' rx='6' ry='6' width='60%' height='20' />

							<rect x='0' y='200' rx='4' ry='4' width='80' height='16' />
							<rect x='280' y='200' rx='4' ry='4' width='60' height='20' />

							<rect x='0' y='240' rx='6' ry='6' width='100' height='32' />

							<rect x='260' y='240' rx='6' ry='6' width='80' height='32' />
						</ContentLoader>
					))}
				</div>
			) : Users.length ? (
				Users?.map((card, index) => (
					<div
						key={index}
						className='shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px] p-5 grid gap-4 bg-white'
					>
						<div className='flex gap-3.5 items-center justify-between relative'>
							<div className='flex gap-4'>
								<img
									src={GetImageUrl(card?.image) ?? undefined}
									className='w-[62px] h-[62px] rounded-full object-cover items-start'
									alt='Student'
								/>
								<div className='mr-4 grid gap-2'>
									<p
										className={`text-[${COLORS.gray_dark_02}] !font-semibold`}
										style={{ ...FONTS.heading_06 }}
									>
										{card?.first_name + ' ' + card?.last_name}
									</p>
									<p
										className={`text-[${COLORS.gray_light}] w-full`}
										style={{ ...FONTS.heading_12 }}
									>
										{card?.email}
									</p>
									<p
										className={`text-[${COLORS.gray_light}]`}
										style={{ ...FONTS.heading_12 }}
									>
										{card?.phone_number}
									</p>
								</div>
							</div>

							<div className='flex items-start h-full'>
								<button
									className='bg-white'
									onClick={() =>
										setCardOptionsShow(cardOptionsShow === index ? null : index)
									}
								>
									<SlOptionsVertical className={`text-[${COLORS.primary}]`} />
								</button>
								{cardOptionsShow === index && (
									<div ref={dropdownRef} className='absolute right-0 z-10'>
										<CardOptions uuid={card?.uuid} />
									</div>
								)}
							</div>
						</div>

						<div className='flex justify-between items-center'>
							<p className={`text-[${COLORS.light_green}]`}>
								<span style={{ ...FONTS.heading_12 }}>Role : </span>
								<span className='font-bold'>{card?.role?.identity}</span>
							</p>

							<Select
								onValueChange={(value) => handleStatusValue(value, card.uuid)}
							>
								<SelectTrigger
									className={`w-[110px] h-[48px] border text-white rounded-[8px] pr-[16px] pl-[16px] bg-[${COLORS.primary}]`}
								>
									<SelectValue
										placeholder={card?.is_active ? 'Active' : 'Inactive'}
										style={{ ...FONTS.heading_08 }}
									/>
									<ChevronDownIcon className='size-4 opacity-50 text-[#FFFFFF]' />
								</SelectTrigger>

								<SelectContent className='bg-white text-black border p-2 rounded-[8px]'>
									<SelectItem
										value='active'
										className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] bg-white focus:bg-[${COLORS.primary}] p-2 my-1.5 focus:text-white rounded-[8px] cursor-pointer`}
										style={{ ...FONTS.heading_08 }}
									>
										Active
									</SelectItem>
									<SelectItem
										value='inactive'
										className={`hover:bg-[${COLORS.primary}] text-[${COLORS.primary}] bg-white focus:bg-[${COLORS.primary}] p-2 focus:text-white rounded-[8px] cursor-pointer`}
										style={{ ...FONTS.heading_08 }}
									>
										Inactive
									</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
				))
			) : (
				<Card className='col-span-3 mt-8'>
					<p className='font-lg text-gray-900 text-center'>
						No Users available
					</p>
				</Card>
			)}

			{alertModal && (
				<div className='fixed inset-0 bg-black/60 backdrop-blur-sm z-40'>
					<div className='fixed z-50 left-1/2 top-1/2 transform lg:-translate-x-1/4 lg:-translate-y-1/4 md:-translate-x-1/3 md:-translate-y-1/3  w-[402px] h-[279px] bg-white rounded-[12px] flex flex-col gap-[30px] p-4 justify-center items-center'>
						<div className='grid gap-2'>
							<img
								className='w-[100px] h-[100px] mx-auto'
								src={warning}
								alt='Warning'
							/>
							<h2
								className={`text-[${COLORS.gray_dark_02}] text-center`}
								style={{ ...FONTS.heading_04_bold }}
							>
								Confirm Action
							</h2>
							<p
								className={`text-[${COLORS.gray_light}] text-center`}
								style={{ ...FONTS.heading_07 }}
							>
								Are you sure you want to change the status?
							</p>
						</div>
						<div className='flex gap-5'>
							<button
								onClick={() => setAlertModal(false)}
								style={{ ...FONTS.heading_08_bold }}
								className={`bg-[#D7F6F5] border border-[#1BBFCA] px-4 h-[40px] rounded-[8px] flex items-center gap-2 text-[#1BBFCA]`}
							>
								Cancel
							</button>
							<button
								onClick={handleUpdateStatus}
								type='submit'
								style={{ ...FONTS.heading_08_bold }}
								className='bg-[#1BBFCA] px-4 h-[40px] rounded-[8px] flex items-center gap-2 text-white'
							>
								Yes, Status
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

export default UsersList;
