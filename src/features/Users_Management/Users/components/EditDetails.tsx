/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownIcon } from 'lucide-react';
import { Input } from '../../../../components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../components/ui/select';
import { COLORS, FONTS } from '../../../../constants/uiConstants';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { GetImageUrl } from '../../../../utils/helper';
import { GetAllGroupCard } from '../../Group/reducers/service';
import {
	getInstituteDetails,
	getSelectedBranchId,
} from '../../../../apis/httpEndpoints';
import { updateUser } from '../service';
import toast from 'react-hot-toast';

interface Group {
	_id: string;
	identity: string;
	[key: string]: any;
}

interface UserDetail {
	first_name?: string;
	last_name?: string;
	email?: string;
	username?: string;
	designation?: string;
	role?: {
		identity?: string;
		[key: string]: any;
	};
	phone_number?: string;
	image?: string;
	uuid?: string;
	[key: string]: any;
}

interface EditDetailsProps {
	setShowEditModal: (show: boolean) => void;
	userDetail: UserDetail | undefined;
}

const EditDetails: React.FC<EditDetailsProps> = ({
	setShowEditModal,
	userDetail,
}) => {
	const [groups, setGroups] = useState<Group[]>([]);

	useEffect(() => {
		fetchGroups();
	}, []);

	const fetchGroups = async () => {
		try {
			const instituteId =
				getInstituteDetails() ?? '973195c0-66ed-47c2-b098-d8989d3e4529';
			const branchId =
				getSelectedBranchId() ?? '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4';
			const response = await GetAllGroupCard({
				branch_id: branchId,
				institute_id: instituteId,
			});
			setGroups(response?.data || []);
		} catch (error) {
			console.error('Error fetching groups:', error);
		}
	};

	type initialValues = {
		first_name: string | undefined;
		last_name: string | undefined;
		email: string | undefined;
		username: string | undefined;
		designation: string | undefined;
		role: string | undefined;
		phone_number: string | undefined;
		image: string | undefined;
		userId: string | undefined;
	};

	const { register, setValue, handleSubmit, reset } = useForm<initialValues>();

	useEffect(() => {
		if (userDetail) {
			reset({
				first_name: userDetail?.first_name || '',
				last_name: userDetail?.last_name || '',
				email: userDetail?.email || '',
				username: userDetail?.username || '',
				phone_number: userDetail?.phone_number || '',
				role: userDetail?.role?._id || '',
				designation: userDetail?.designation || '',
				image: userDetail?.image || '',
				userId: userDetail?.uuid || '',
			});
		}
	}, [userDetail, reset]);

	const onSubmit = async (data: initialValues) => {
		try {
			const res = await updateUser(data);
			if (res) {
				setShowEditModal(false);
				toast.success('User details updated successfully');
			}
		} catch (error) {
			console.error('Error updating user:', error);
			toast.error('Failed to update user details');
		}
	};

	return (
		<div className='w-full sm:w-[95%] md:w-[700px] lg:w-[750px] xl:w-[782px] bg-white rounded-lg border p-4 sm:p-5 md:p-6 max-h-screen overflow-y-auto'>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div
					className={`border bg-[${COLORS.primary}] h-[44px] sm:h-[46px] md:h-[48px] rounded-xl text-white flex items-center justify-center px-3`}
				>
					<h1
						className='text-base sm:text-lg md:text-xl'
						style={{ ...FONTS.heading_05_bold }}
					>
						Edit user Information
					</h1>
				</div>

				<div className='p-5 sm:p-6 md:p-8 lg:p-9 grid justify-center'>
					<img
						src={GetImageUrl(userDetail?.image ?? '') ?? undefined}
						className={`w-[80px] h-[80px] sm:w-[90px] sm:h-[90px] md:w-[100px] md:h-[100px] border rounded-full mx-auto object-cover`}
						alt='Preview'
					/>
					<input
						{...register('image')}
						type='file'
						accept='image/*'
						className='p-2 mx-auto text-sm sm:text-base mt-2'
					/>
				</div>

				<div className='grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-4 md:gap-5'>
					<div className='grid gap-1 sm:gap-1.5'>
						<label
							className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base`}
							style={{ ...FONTS.heading_08_bold }}
						>
							First Name
						</label>
						<Input
							{...register('first_name')}
							placeholder={userDetail?.first_name || ''}
							className={`w-full h-[42px] sm:h-[44px] md:h-[45px] border border-[#716F6F] rounded-[8px] px-3 sm:px-4 text-sm sm:text-base hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
						/>
					</div>

					<div className='grid gap-1 sm:gap-1.5'>
						<label
							className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base`}
							style={{ ...FONTS.heading_08_bold }}
						>
							Last Name
						</label>
						<Input
							{...register('last_name')}
							placeholder={userDetail?.last_name || ''}
							className={`w-full h-[42px] sm:h-[44px] md:h-[45px] border border-[#716F6F] rounded-[8px] px-3 sm:px-4 text-sm sm:text-base hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
						/>
					</div>

					<div className='grid gap-1 sm:gap-1.5'>
						<label
							className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base`}
							style={{ ...FONTS.heading_08_bold }}
						>
							Username
						</label>
						<Input
							readOnly
							{...register('username')}
							placeholder={userDetail?.username || ''}
							className={`w-full h-[42px] sm:h-[44px] md:h-[45px] border border-[#716F6F] rounded-[8px] px-3 sm:px-4 text-sm sm:text-base bg-gray-100 cursor-not-allowed`}
						/>
					</div>

					<div className='grid gap-1 sm:gap-1.5'>
						<label
							className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base`}
							style={{ ...FONTS.heading_08_bold }}
						>
							Email
						</label>
						<Input
							{...register('email')}
							placeholder={userDetail?.email || ''}
							className={`w-full h-[42px] sm:h-[44px] md:h-[45px] border border-[#716F6F] rounded-[8px] px-3 sm:px-4 text-sm sm:text-base hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
						/>
					</div>

					<div className='grid gap-1 sm:gap-1.5'>
						<label
							className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base`}
							style={{ ...FONTS.heading_08_bold }}
						>
							Contact
						</label>
						<Input
							{...register('phone_number')}
							placeholder={userDetail?.phone_number || ''}
							className={`w-full h-[42px] sm:h-[44px] md:h-[45px] border border-[#716F6F] rounded-[8px] px-3 sm:px-4 text-sm sm:text-base hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
						/>
					</div>

					<div className='grid gap-1 sm:gap-1.5'>
						<label
							className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base`}
							style={{ ...FONTS.heading_08_bold }}
						>
							Designation
						</label>
						<Input
							{...register('designation')}
							placeholder={userDetail?.designation || ''}
							className={`w-full h-[42px] sm:h-[44px] md:h-[45px] border border-[#716F6F] rounded-[8px] px-3 sm:px-4 text-sm sm:text-base hover:border-[${COLORS.primary}] focus:border-[${COLORS.primary}] focus:outline-none`}
						/>
					</div>

					<div className='grid gap-1 sm:gap-1.5 sm:col-span-2'>
						<label
							className={`text-[${COLORS.gray_dark_02}] text-sm sm:text-base`}
							style={{ ...FONTS.heading_08_bold }}
						>
							Role
						</label>
						<Select
							onValueChange={(value) => setValue('role', value)}
							defaultValue={userDetail?.role?.identity || ''}
						>
							<SelectTrigger
								className={`w-full h-[42px] sm:h-[44px] md:h-[45px] border rounded-[8px] border-[#716F6F] px-3 sm:px-4 text-[${COLORS.gray_dark_02}] text-sm sm:text-base`}
							>
								<SelectValue
									placeholder={userDetail?.role?.identity || 'Select role'}
								/>
								<ChevronDownIcon className='size-4 opacity-50 text-[#716F6F]' />
							</SelectTrigger>
							<SelectContent className='bg-white'>
								{groups.map((group) => (
									<SelectItem
										key={group._id}
										value={group._id}
										className={`hover:bg-[${COLORS.primary}] p-2 my-1.5 rounded-[8px] cursor-pointer text-sm sm:text-base`}
										style={{ ...FONTS.heading_08 }}
									>
										{group.identity}
									</SelectItem>
								))}
							</SelectContent>
						</Select>
					</div>
				</div>

				<div className='flex flex-col sm:flex-row justify-center sm:justify-end gap-3 sm:gap-2 mt-5 sm:mt-6'>
					<button
						type='button'
						onClick={() => setShowEditModal(false)}
						style={{ ...FONTS.heading_08_bold }}
						className={`bg-[#D7F6F5] border border-[#1BBFCA] px-4 sm:px-5 md:px-6 h-[40px] sm:h-[42px] md:h-[44px] rounded-[8px] flex items-center justify-center gap-2 text-[#1BBFCA] text-sm sm:text-base w-full sm:w-auto order-2 sm:order-1`}
					>
						Cancel
					</button>
					<button
						type='submit'
						style={{ ...FONTS.heading_08_bold }}
						className='bg-[#1BBFCA] px-4 sm:px-5 md:px-6 h-[40px] sm:h-[42px] md:h-[44px] rounded-[8px] flex items-center justify-center gap-2 text-white text-sm sm:text-base w-full sm:w-auto order-1 sm:order-2'
					>
						Save Changes
					</button>
				</div>
			</form>
		</div>
	);
};

export default EditDetails;
