import type { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import UserCard from '../../../features/Users_Management/Users/components/UserCard';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectLoading,
	selectUsers,
} from '../../../features/Users_Management/Users/redux/selector';
import { useEffect } from 'react';
import { fetchAllUsers } from '../../../features/Users_Management/Users/redux/thunk';
import {
	getInstituteDetails,
	getSelectedBranchId,
} from '../../../apis/httpEndpoints';
import UsersList from '../../../features/Users_Management/Users/components/UsersList';

const Users = () => {
	const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
	const Users = useSelector(selectUsers);
	const loading = useSelector(selectLoading);
	const instituteId =
		getInstituteDetails() ?? '973195c0-66ed-47c2-b098-d8989d3e4529';
	const branchId =
		getSelectedBranchId() ?? '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4';

	useEffect(() => {
		const data = { page: 1, institute_id: instituteId, branch_id: branchId };
		dispatch(fetchAllUsers(data));
	}, [dispatch]);

	return (
		<div className='grid gap-4'>
			<UserCard Users={Users?.data} />
			<div>
				<UsersList Users={Users?.data} loading={loading} />
			</div>
		</div>
	);
};

export default Users;
