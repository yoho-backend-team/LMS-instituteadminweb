/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import StaffTitleBar from '../../../components/teachingstaffAttendance/StaffTitleBar';
import StaffCard from '../../../components/teachingstaffAttendance/StaffCard';
import { useDispatch } from 'react-redux';
import { GetStaffAttendanceThunk } from '../../../features/teachingstaffAttendance/thunk';
import { useSelector } from 'react-redux';
import ContentLoader from 'react-content-loader'

export type StaffsAttendanceType = {
	absentCount: number;
	branch: string;
	email: string;
	img: string;
	presentCount: number;
	staff: string;
	staff_id: string;
	staff_name: string;
};

const StaffsAttendance: React.FC = () => {
	const staffs: StaffsAttendanceType[] = useSelector(
		(state: any) => state.staffAttendace.data
	);

	const [isLoad, setisLoad] = useState(true);

	const dispatch = useDispatch<any>();

	useEffect(() => {
		(async () => {
			const response = await dispatch(GetStaffAttendanceThunk());
			if (response?.status == 'success') {
				setisLoad(false)
			}
		})()
	}, [dispatch]);

	return (
		<div className='w-full h-full'>
			<StaffTitleBar />
			{
				isLoad &&
				<div className='w-full h-full  grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-6 mt-5'>
					{

						Array(6).fill(null).map((_, index) => (
							<ContentLoader
								speed={1}
								width="100%"
								height={310}
								viewBox="0 0 400 310"
								backgroundColor="#f3f3f3"
								foregroundColor="#ecebeb"
								className="w-full h-[310px] rounded-lg"
								key={index}
							>
								<circle cx="40" cy="40" r="30" />

								<rect x="80" y="20" rx="4" ry="4" width="200" height="15" />
								<rect x="80" y="45" rx="3" ry="3" width="150" height="12" />

								<rect x="0" y="90" rx="12" ry="12" width="180" height="90" />
								<rect x="200" y="90" rx="12" ry="12" width="180" height="90" />

								<rect x="0" y="210" rx="8" ry="8" width="100%" height="48" />
							</ContentLoader>
						))

					}

				</div>
			}

			<div className='w-full grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 gap-6 mt-5'>
				{staffs?.map((staff: StaffsAttendanceType) => (
					<div>
						<StaffCard key={staff.staff} data={staff} />
					</div>
				))}
			</div>
		</div>
	);
};

export default StaffsAttendance;
