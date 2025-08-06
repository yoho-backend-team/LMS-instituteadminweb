import { useDispatch, useSelector } from "react-redux";
import StudentHeaderBar from "../../../features/Attendance_Managemenet/Student_Attendance/components/StudentHeaderBar";
import { selectLoading, selectStudentAttendances } from "../../../features/Attendance_Managemenet/Student_Attendance/redux/selector";
import { useEffect } from "react";
import { fetchAllStudentAttendances } from "../../../features/Attendance_Managemenet/Student_Attendance/redux/thunk";
import StudentCard from "../../../features/Attendance_Managemenet/Student_Attendance/components/StudentCard";
import { getwithIdBatches } from "../../../features/batchManagement/reducers/thunks";
import { selectBatch } from "../../../features/batchManagement/reducers/selectors";
import { getInstituteDetails, getSelectedBranchId } from "../../../apis/httpEndpoints";
import StudentSkeleton from "../../../features/Attendance_Managemenet/Student_Attendance/components/StudentSkeleton";
import type { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

const StudentsAttendance = () => {
	const instituteId = getInstituteDetails() ?? '973195c0-66ed-47c2-b098-d8989d3e4529';
    const branchId = getSelectedBranchId() ?? '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4';
	const studentAttendances = useSelector(selectStudentAttendances);
	const batches = useSelector(selectBatch)
	const dispatch:ThunkDispatch<any,any, AnyAction> = useDispatch();
	const loading = useSelector(selectLoading)

	useEffect(()=>{
		const data = {branch_id: branchId, institute_id: instituteId, page: '1'}
		dispatch(fetchAllStudentAttendances(data))
		dispatch(getwithIdBatches(data))
	},[branchId, dispatch])

	return (
		<div className="w-full">
			<StudentHeaderBar batches={batches?.data}/>
			<div className="w-full">
			{loading ? (<StudentSkeleton/>) : (<StudentCard studentAttendances={studentAttendances?.data}/>)}
			</div>
		</div>
	)
};

export default StudentsAttendance;
