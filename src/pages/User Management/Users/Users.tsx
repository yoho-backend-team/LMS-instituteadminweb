import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectLoading,
	selectUsers,
} from '../../../features/Users_Management/Users/redux/selector';
import { fetchAllUsers } from '../../../features/Users_Management/Users/redux/thunk';
import {
	getInstituteDetails,
	getSelectedBranchId,
} from '../../../apis/httpEndpoints';
import type { AppDispatch } from '../../../store/store';
import UserCard from '../../../features/Users_Management/Users/components/UserCard';

const Users = () => {
	const dispatch = useDispatch<AppDispatch>();
	const Users = useSelector(selectUsers);
	const loading = useSelector(selectLoading);
	const instituteId = getInstituteDetails();
	const branchId = getSelectedBranchId();

	const fetchUser = useCallback(async () => {
		try {
			const data = { page: 1, institute_id: instituteId, branch_id: branchId };
			dispatch(fetchAllUsers(data));
		} catch (error) {}
	}, []);

	useEffect(() => {
		fetchUser();
	}, [branchId, dispatch, instituteId]);

	return (
		<div className='grid gap-4'>
			<UserCard
				Users={Users?.data || []}
				loading={loading}
				fetchUser={fetchUser}
			/>
		</div>
	);
};

export default Users;
