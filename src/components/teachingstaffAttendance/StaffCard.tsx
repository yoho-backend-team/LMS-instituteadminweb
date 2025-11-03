/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GetImageUrl } from '../../utils/helper';
import type { StaffsAttendanceType } from '../../pages/Attendance Management/Staffs Attendance/StaffsAttendance';
import { useDispatch } from 'react-redux';
import { SelectStaffAttendanceThunk } from '../../features/teachingstaffAttendance/thunk';

interface propsType {
	data: StaffsAttendanceType;
}

const StaffCard: React.FC<propsType> = ({ data }) => {
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();

	const handelView = (data: StaffsAttendanceType) => {
		dispatch(SelectStaffAttendanceThunk(data));
		navigate(`/staffs-attendance/view/${data.staff}`);
	};

	return (
		<div className='flex flex-col justify-between w-full h-[310px] rounded-lg p-6 gap-2 shadow-[0px_4px_24px_0px_#00000026]'>
			<div className='flex flex-row items-center w-full h-[62px] gap-5'>
				<img
					src={GetImageUrl(data.img) ?? undefined}
					alt={data.staff_name}
					className='w-16 h-16 rounded-[50%]'
				/>
				<div className='flex flex-col'>
					<p className='text-[#716F6F] font-semibold text-[20px]'>
						{data.staff_name}
					</p>
					<p className='text-[#716F6F] font-light text-[16px]'>{data.email}</p>
				</div>
			</div>
			{/* <div className="text-center text-[#716F6F] text-[24px] font-semibold">
                ID:46
            </div> */}
			<div className='flex flex-row justify-between'>
				<div className='flex flex-col justify-center p-2 gap-1 text-center border-2 border-solid [border-image-source:linear-gradient(121.71deg,_#3ABE65_0%,_#FFFFFF_51.75%,_#3ABE65_99.66%)] [border-image-slice:1]  [border-radius:12px]'>
					<p className='text-[#3ABE65] font-semibold text-[24px]'>
						{data.presentCount}
					</p>
					<p className='text-[#3ABE65] font-semibold text-[18px]'>Present</p>
				</div>
				<div className='flex flex-col justify-center p-2 gap-1 text-center border-2 border-solid [border-image-source:linear-gradient(121.71deg,_#1BBFCA_0%,_#FFFFFF_51.75%,_#1BBFCA_99.66%)] [border-image-slice:1]  [border-radius:12px]'>
					<p className='text-[#1BBFCA] font-semibold text-[24px]'>
						{data.absentCount}
					</p>
					<p className='text-[#1BBFCA] font-semibold text-[18px]'>Absent</p>
				</div>
			</div>
			<div
				onClick={() => handelView(data)}
				className='w-full bg-[#3ABE65] text-white p-4 text-[16px] font-medium text-center rounded-md cursor-pointer'
			>
				View Attendance
			</div>
		</div>
	);
};

export default StaffCard;
