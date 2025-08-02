import { useDispatch, useSelector } from "react-redux";
import StudentHeaderBar from "../../../features/Attendance_Managemenet/Student_Attendance/components/StudentHeaderBar";
import { GetLocalStorage } from "../../../utils/localStorage";
import { selectLoading, selectStudentAttendances } from "../../../features/Attendance_Managemenet/Student_Attendance/redux/selector";
import { useEffect } from "react";
import { fetchAllStudentAttendances } from "../../../features/Attendance_Managemenet/Student_Attendance/redux/thunk";
import StudentCard from "../../../features/Attendance_Managemenet/Student_Attendance/components/StudentCard";

const StudentsAttendance = () => {
	const branchId = GetLocalStorage('branchId');
	const instituteId = GetLocalStorage('instituteId')
	const studentAttendances = useSelector(selectStudentAttendances);
	const loading = useSelector(selectLoading)
	const dispatch = useDispatch();

	useEffect(()=>{
		const data = {branch_id: branchId, institute_id: instituteId, page: '1'}
		dispatch(fetchAllStudentAttendances(data))
	},[branchId, dispatch])

		console.log("data", studentAttendances)
	return (
		<div className="w-full">
			<StudentHeaderBar/>
			<div className="w-full">
			<StudentCard studentAttendances={studentAttendances?.data}/>
			</div>
		</div>
	)
};

export default StudentsAttendance;
