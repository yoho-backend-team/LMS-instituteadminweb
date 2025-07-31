/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import StaffTitleBar from '../../../components/teachingstaffAttendance/StaffTitleBar';
import StaffCard from '../../../components/teachingstaffAttendance/StaffCard';
import { useDispatch } from 'react-redux';
import { GetStaffAttendanceThunk } from '../../../features/teachingstaffAttendance/thunk';
import { useSelector } from 'react-redux'

export type StaffsAttendanceType = {
	absentCount: number;
	branch: string;
	email: string;
	img: string;
	presentCount: number;
	staff: string;
	staff_id: string;
	staff_name: string;
}

const StaffsAttendance: React.FC = () => {

	const staffs: StaffsAttendanceType[] = useSelector((state: any) => state.staffAttendace.data)


	const dispatch = useDispatch<any>()

	useEffect(() => {
		dispatch(GetStaffAttendanceThunk())
	}, [dispatch]);

	return (
		<div className='w-full h-full'>
			<StaffTitleBar />
			<div className='w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-6 mt-5'>
				{
					staffs.map((staff: StaffsAttendanceType) => (
						<div>
							<StaffCard key={staff.staff} data={staff} />
						</div>
					))

				}
			</div>

		</div>
	)
};

export default StaffsAttendance;
