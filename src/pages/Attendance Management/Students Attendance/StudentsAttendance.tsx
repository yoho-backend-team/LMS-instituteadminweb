import { useDispatch, useSelector } from "react-redux";
import StudentHeaderBar from "../../../features/Attendance_Managemenet/Student_Attendance/components/StudentHeaderBar";
import { GetLocalStorage } from "../../../utils/localStorage";
import { selectLoading, selectStudentAttendances } from "../../../features/Attendance_Managemenet/Student_Attendance/redux/selector";
import { useEffect } from "react";
import { fetchAllStudentAttendances } from "../../../features/Attendance_Managemenet/Student_Attendance/redux/thunk";
import StudentCard from "../../../features/Attendance_Managemenet/Student_Attendance/components/StudentCard";
import { getwithIdBatches } from "../../../features/batchManagement/reducers/thunks";
import { selectBatch } from "../../../features/batchManagement/reducers/selectors";
import { getInstituteDetails, getSelectedBranchId } from "../../../apis/httpEndpoints";

const StudentsAttendance = () => {
	const branchId = getSelectedBranchId()
	const instituteId = getInstituteDetails()
	const studentAttendances = useSelector(selectStudentAttendances);
	const batches = useSelector(selectBatch)
	const dispatch = useDispatch();

	useEffect(()=>{
		const data = {branch_id: branchId, institute_id: instituteId, page: '1'}
		dispatch(fetchAllStudentAttendances(data))
		dispatch(getwithIdBatches(data))
	},[branchId, dispatch])

	console.log("Batches", batches)

	return (
		<div className="w-full">
			<StudentHeaderBar batches={batches?.data}/>
			<div className="w-full">
			<StudentCard studentAttendances={studentAttendances?.data}/>
			</div>
		</div>
	)
};

export default StudentsAttendance;
