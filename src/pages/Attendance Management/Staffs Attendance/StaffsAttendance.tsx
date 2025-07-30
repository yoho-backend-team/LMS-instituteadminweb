import React from 'react';
import StaffTitleBar from '../../../components/teachingstaffAttendance/StaffTitleBar';
import StaffCard from '../../../components/teachingstaffAttendance/StaffCard';

const StaffsAttendance: React.FC = () => {
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
