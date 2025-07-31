/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from 'react';
import StaffTitleBar from '../../../components/teachingstaffAttendance/StaffTitleBar';
import StaffCard from '../../../components/teachingstaffAttendance/StaffCard';
import { useDispatch } from 'react-redux';
import { GetStaffAttendanceThunk } from '../../../features/teachingstaffAttendance/thunk';

const StaffsAttendance: React.FC = () => {
	const dispatch = useDispatch<any>()

	useEffect(() => {
		dispatch(GetStaffAttendanceThunk())
	}, [dispatch]);

	return (
		<div className='w-full h-full'>
			<StaffTitleBar />
			<div className='mt-10'>
				<StaffCard />
			</div>
		</div>
	)
};

export default StaffsAttendance;
