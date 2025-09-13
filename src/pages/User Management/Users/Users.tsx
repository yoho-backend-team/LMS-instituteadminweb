import UserCard from "../../../features/Users_Management/Users/components/UserCard";
import { useDispatch, useSelector } from "react-redux";
import {
  selectLoading,
  selectUsers,
} from "../../../features/Users_Management/Users/redux/selector";
import { useEffect } from "react";
import { fetchAllUsers } from "../../../features/Users_Management/Users/redux/thunk";
import {
  getInstituteDetails,
  getSelectedBranchId,
} from "../../../apis/httpEndpoints";
import UsersList from "../../../features/Users_Management/Users/components/UsersList";
import type { AppDispatch } from "../../../store/store";

const Users = () => {
  const dispatch = useDispatch<AppDispatch>();
  const Users = useSelector(selectUsers);
  const loading = useSelector(selectLoading);
  const instituteId =
    getInstituteDetails();
  const branchId =
    getSelectedBranchId();

  useEffect(() => {
    const data = { page: 1, institute_id: instituteId, branch_id: branchId };
    dispatch(fetchAllUsers(data));
  }, [branchId, dispatch, instituteId]);

  return (
    <div className="grid gap-4">
      <UserCard Users={Users?.data} />
      <div>
        <UsersList Users={Users?.data} loading={loading} />
      </div>
    </div>
  );
};

export default Users;
