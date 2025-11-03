import { useEffect, useState, useMemo } from 'react';
import StaffAddBar from '../../../components/teachingstaffAttendance/StaffAddBar';
import StaffFormModal from '../../../components/teachingstaffAttendance/StaffFormModal';
import { useDispatch, useSelector } from 'react-redux';
import type { StaffsAttendanceType } from './StaffsAttendance';
import { useNavigate, useParams } from 'react-router-dom';
import {
	GetAttendanceByIdThunk,
	GetStaffAttendanceRerender,
} from '../../../features/teachingstaffAttendance/thunk';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

const months = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const AddAttendance = () => {
	const { id } = useParams();
	const dispatch = useDispatch<any>();
	const navigate = useNavigate();

	const staff: StaffsAttendanceType = useSelector(
		(state: any) => state.staffAttendace.selectStaff
	);

	const staffAttendace = useSelector(
		(state: any) => state.staffAttendace.attendance
	);

	useEffect(() => {
		if (!staff.staff) dispatch(GetStaffAttendanceRerender(id ?? ''));
		dispatch(GetAttendanceByIdThunk(id ?? ''));
	}, [dispatch, id, staff.staff]);

	const today = new Date();
	const [currentMonth, setCurrentMonth] = useState(today.getMonth());
	const [currentYear, setCurrentYear] = useState(today.getFullYear());
	const [filterMode, setFilterMode] = useState<
		'month' | 'week' | 'day' | 'list'
	>('month');
	const [statusFilter, setStatusFilter] = useState<
		'all' | 'present' | 'absent'
	>('all');
	const [openModal, setopenModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState<number | null>(
		today.getDate()
	);

	// --- Generate Calendar Data ---
	const getDaysInMonth = (year: number, month: number) => {
		const firstDay = new Date(year, month, 1).getDay();
		const totalDays = new Date(year, month + 1, 0).getDate();

		const data: { date: number | null; status: any }[] = [];
		let dayCount = 1;

		for (let i = 0; i < 42; i++) {
			if (i < firstDay || dayCount > totalDays) {
				data.push({ date: null, status: null });
			} else {
				const match = staffAttendace?.find((item: any) => {
					const d = new Date(item.date);
					return (
						d.getDate() === dayCount &&
						d.getMonth() === month &&
						d.getFullYear() === year
					);
				});
				data.push({ date: dayCount, status: match ? match.status : null });
				dayCount++;
			}
		}
		return data;
	};

	const calendarData = useMemo(
		() => getDaysInMonth(currentYear, currentMonth),
		[currentMonth, currentYear, staffAttendace]
	);

	const nextMonth = () => {
		setCurrentMonth((prev) => {
			if (prev === 11) {
				setCurrentYear((y) => y + 1);
				return 0;
			}
			return prev + 1;
		});
	};

	const prevMonth = () => {
		setCurrentMonth((prev) => {
			if (prev === 0) {
				setCurrentYear((y) => y - 1);
				return 11;
			}
			return prev - 1;
		});
	};

	// --- Filter Calendar Data ---
	const filteredCalendar = useMemo(() => {
		let filtered = [...calendarData];

		if (filterMode === 'day') {
			filtered = filtered.filter((d) => d.date === selectedDate);
		} else if (filterMode === 'week') {
			const baseDate = selectedDate
				? new Date(currentYear, currentMonth, selectedDate)
				: new Date();
			const startOfWeek = new Date(baseDate);
			startOfWeek.setDate(baseDate.getDate() - baseDate.getDay());
			const endOfWeek = new Date(startOfWeek);
			endOfWeek.setDate(startOfWeek.getDate() + 6);

			filtered = calendarData.filter((d) => {
				if (!d.date) return false;
				const dayDate = new Date(currentYear, currentMonth, d.date);
				return dayDate >= startOfWeek && dayDate <= endOfWeek;
			});
		} else if (filterMode === 'list') {
			filtered = calendarData.filter((d) => d.date !== null);
		}

		return filtered;
	}, [calendarData, filterMode, selectedDate, currentMonth, currentYear]);

	return (
		<div className='w-full'>
			{/* Back Button */}
			<div
				onClick={() => navigate(-1)}
				className='text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white w-fit mb-4 cursor-pointer rounded-full p-1'
			>
				<ArrowLeft size={32} />
			</div>

			{/* Header + Filters */}
			<StaffAddBar
				data={staff}
				setOpen={setopenModal}
				setMonth={setCurrentMonth}
				setYear={setCurrentYear}
				setStatusFilter={setStatusFilter}
				statusFilter={statusFilter}
			/>
			<StaffFormModal data={staff} setOpen={setopenModal} isOpen={openModal} />

			{/* Month Header */}
			<div className='flex items-center justify-between mt-3 mb-2'>
				<button onClick={prevMonth}>
					<ChevronLeft size={28} className='text-[#1BBFCA]' />
				</button>
				<h2 className='text-center text-[#716F6F] font-semibold text-[22px]'>
					{months[currentMonth]} {currentYear}
				</h2>
				<button onClick={nextMonth}>
					<ChevronRight size={28} className='text-[#1BBFCA]' />
				</button>
			</div>

			{/* View Filters */}
			<div className='grid grid-cols-4 gap-3 mb-3'>
				{['month', 'week', 'day', 'list'].map((mode) => (
					<div
						key={mode}
						onClick={() => setFilterMode(mode as any)}
						className={`cursor-pointer border text-center py-2 rounded-md font-semibold capitalize ${
							filterMode === mode
								? 'border-[#1BBFCA] bg-[#1BBFCA1A] text-[#1BBFCA]'
								: 'border-[#716F6F] bg-[#716F6F1A] text-[#716F6F]'
						}`}
					>
						{mode}
					</div>
				))}
			</div>

			{/* Calendar Header (days) */}
			{filterMode !== 'list' && (
				<div className='overflow-x-auto'>
					<div className='min-w-[700px] grid grid-cols-7 gap-5'>
						{days.map((day, i) => (
							<div
								key={i}
								className='border border-[#BDC2C7BF] flex justify-center items-center rounded-md font-semibold text-lg text-[#716F6F]'
							>
								{day}
							</div>
						))}
					</div>
				</div>
			)}

			{/* Calendar or List View */}
			<div
				className={`overflow-x-auto ${
					filterMode === 'list' ? '' : 'mt-5'
				} min-w-[700px] grid ${
					filterMode === 'list' ? 'grid-cols-1' : 'grid-cols-7'
				} gap-5`}
			>
				{filteredCalendar.map((item, index) => {
					if (item.date === null)
						return (
							<div
								key={index}
								className='border border-gray-100 bg-gray-50 rounded-md h-[70px]'
							/>
						);

					const isPresent = item.status === 'present';
					const isAbsent = item.status === 'absent';
					const highlight =
						statusFilter === 'present'
							? isPresent
							: statusFilter === 'absent'
							? isAbsent
							: false;

					return (
						<div
							key={index}
							onClick={() => setSelectedDate(item.date ?? null)}
							className={`h-[70px] border flex flex-col justify-center items-center rounded-md font-semibold text-lg text-[#716F6F] cursor-pointer transition-all duration-200 ${
								item.date === selectedDate
									? 'bg-[#1BBFCA1A] border-[#1BBFCA]'
									: ''
							} ${highlight ? 'bg-opacity-30 border-[#1BBFCA]' : ''} ${
								isPresent ? 'bg-green-100' : isAbsent ? 'bg-red-100' : ''
							}`}
						>
							{item.date}
							{item.status && (
								<span
									className={`text-sm ${
										isPresent
											? 'text-green-600'
											: isAbsent
											? 'text-red-600'
											: ''
									}`}
								>
									{item.status}
								</span>
							)}
						</div>
					);
				})}
			</div>

			{/* Day View Details */}
			{filterMode === 'day' && selectedDate && (
				<div className='mt-6 border-t border-gray-300 pt-4'>
					<h3 className='font-semibold text-lg text-[#1BBFCA] mb-2'>
						Attendance Details — {selectedDate} {months[currentMonth]}{' '}
						{currentYear}
					</h3>
					{(() => {
						const record = staffAttendace.find((item: any) => {
							const d = new Date(item.date);
							return (
								d.getDate() === selectedDate &&
								d.getMonth() === currentMonth &&
								d.getFullYear() === currentYear
							);
						});
						if (!record)
							return (
								<p className='text-gray-500 italic'>Yet to mark attendance.</p>
							);
						return (
							<div className='border rounded-lg p-3 flex justify-between items-center'>
								<span>{new Date(record.date).toDateString()}</span>
								<span
									className={`font-semibold ${
										record.status === 'present'
											? 'text-green-600'
											: 'text-red-600'
									}`}
								>
									{record.status}
								</span>
							</div>
						);
					})()}
				</div>
			)}
		</div>
	);
};

export default AddAttendance;
