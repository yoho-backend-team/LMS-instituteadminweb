import type React from 'react';
import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Fee } from './types';
import { useDispatch } from 'react-redux';
import {
	GetBranchThunks,
	GetBranchCourseThunks,
	GetBatchThunks,
	GetStudentsWithBatchThunks,
	GetAllFeesThunks,
	EditStudentthunks,
} from '../../features/Payment_Managemant/salary/fees/reducers/thunks';
import { creatFees } from '../../features/Payment_Managemant/salary/fees/services';

interface FeeDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	selectedFee: any | null;
	onSuccess: () => void;
	onAddFee: (newFee: Fee) => void;
	onUpdateFee: (updatedFee: Fee) => void;
}

export const FeeDrawer: React.FC<FeeDrawerProps> = ({
	isOpen,
	onClose,
	selectedFee,
	onSuccess,
	onAddFee,
	onUpdateFee,
}) => {
	const dispatch = useDispatch();
	const [branch, setBranch] = useState('');
	const [course, setCourse] = useState('');
	const [batch, setBatch] = useState('');
	const [studentName, setStudentName] = useState('');
	const [, setStudentEmail] = useState('');
	const [studentId, setStudentId] = useState('');
	const [paymentDate, setPaymentDate] = useState('');
	const [transactionId, setTransactionId] = useState('');
	const [paidAmount, setPaidAmount] = useState('');
	const [balance, setBalance] = useState('');
	const [dueDate, setDueDate] = useState('');
	const [branchOptions, setBranchOptions] = useState<any[]>([]);
	const [courseOptions, setCourseOptions] = useState<any[]>([]);
	const [batchOptions, setBatchOptions] = useState<any[]>([]);
	const [students, setStudents] = useState<any[]>([]);
	const [errors, setErrors] = useState<Record<string, string>>({});

	// Fetch Branches
	useEffect(() => {
		const fetchBranches = async () => {
			const branchRes = await dispatch(GetBranchThunks({}) as any);
			if (branchRes && Array.isArray(branchRes)) {
				setBranchOptions(branchRes as any);
			}
		};
		if (isOpen) fetchBranches();
	}, [dispatch, isOpen]);

	// Fetch Courses
	useEffect(() => {
		const fetchCourses = async () => {
			if (branch) {
				const course = await dispatch(
					GetBranchCourseThunks({ branch_id: branch }) as any
				);
				if (course) {
					setCourseOptions(course.data);
				}
			}
		};
		fetchCourses();
	}, [branch, dispatch]);

	// Fetch Batches
	useEffect(() => {
		const fetchBatches = async () => {
			if (branch && course) {
				const res = await dispatch(GetBatchThunks({ branch, course }) as any);
				if (res?.data) {
					setBatchOptions(res.data);
				}
			} else {
				setBatchOptions([]);
			}
		};
		fetchBatches();
	}, [branch, course, dispatch]);

	// Fetch Students
	useEffect(() => {
		const fetchStudents = async () => {
			if (branch && batch) {
				const params = {
					batch_id: batch,
					branch_id: branch,
				};
				const res = await dispatch(GetStudentsWithBatchThunks(params) as any);

				if (res?.data && Array.isArray(res.data)) {
					setStudents(res.data);
					const firstStudent = res.data[0];
					setStudentEmail(firstStudent?.email || '');
					setStudentId(firstStudent?._id || '');
				} else {
					setStudents([]);
					setStudentName('');
					setStudentEmail('');
					setStudentId('');
				}
			}
		};
		fetchStudents();
	}, [branch, batch, selectedFee]);

	// Prefill form
	useEffect(() => {
		if (isOpen) {
			if (selectedFee) {
				setTransactionId(selectedFee.payment_history[0].transaction_id || '');
				setPaidAmount(selectedFee.paid_amount || '');
				setPaymentDate(selectedFee.payment_date?.split('T')[0] || '');
				setStudentName(selectedFee.student?.full_name || '');
				setStudentEmail(selectedFee.student?.email || '');
				setBalance(selectedFee.balance?.toString() || '');
				setDueDate(
					selectedFee.duepaymentdate
						? new Date(selectedFee.duepaymentdate).toISOString().split('T')[0]
						: ''
				);
				setBranch(selectedFee.branch_id || '');
				setCourse(selectedFee.course_name || '');
				setBatch(selectedFee.batch_name || '');
				setStudentId(selectedFee.student?._id || '');
			} else {
				setBranch('');
				setCourse('');
				setBatch('');
				setStudentName('');
				setStudentEmail('');
				setStudentId('');
				setPaymentDate('');
				setTransactionId('');
				setPaidAmount('');
				setBalance('');
				setDueDate('');
			}
			setErrors({});
		}
	}, [isOpen, selectedFee]);

	// Validation Function
	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!branch) newErrors.branch = 'Branch is required';
		if (!course) newErrors.course = 'Course is required';
		if (!batch) newErrors.batch = 'Batch is required';
		if (!studentName) newErrors.studentName = 'Student is required';
		if (!paymentDate) newErrors.paymentDate = 'Payment date is required';
		if (!transactionId) newErrors.transactionId = 'Transaction ID is required';
		if (!paidAmount) newErrors.paidAmount = 'Paid amount is required';
		if (!balance) newErrors.balance = 'Balance is required';
		if (!dueDate) newErrors.dueDate = 'Due date is required';

		// Numeric validation
		if (paidAmount && !/^\d+(\.\d{1,2})?$/.test(paidAmount))
			newErrors.paidAmount = 'Paid amount must be numeric';
		if (balance && !/^\d+(\.\d{1,2})?$/.test(balance))
			newErrors.balance = 'Balance must be numeric';

		// Date validation
		if (paymentDate && dueDate) {
			const pay = new Date(paymentDate);
			const due = new Date(dueDate);
			if (pay.getTime() === due.getTime())
				newErrors.dueDate = 'Due date cannot be the same as payment date';
			else if (due < pay)
				newErrors.dueDate = 'Due date must be after payment date';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!validateForm()) return;

		if (selectedFee) {
			const updatedFee: Fee = {
				...selectedFee,
				[selectedFee.payment_history[0].transaction_id]: transactionId,
				paid_amount: paidAmount,
				payment_date: paymentDate,
				balance,
				duepaymentdate: dueDate,
				batch_name: batch,
				branch_id: branch,
				course_name: course,
			};

			await dispatch(EditStudentthunks(updatedFee) as any);
			onUpdateFee(updatedFee);
		} else {
			const newFee: any = {
				id: 1,
				transaction_id: transactionId || 'N/A',
				institute_id: '973195c0-66ed-47c2-b098-d8989d3e4529',
				student: studentId || 'N/A',
				balance: balance || '0',
				batch_name: batch || 'N/A',
				branch_id: branch || 'N/A',
				course_name: course || 'N/A',
				duepaymentdate: dueDate || 'NA',
				paid_amount: paidAmount || '0',
				payment_date: paymentDate || 'NA',
				payment_history: [
					{
						paid_amount: paidAmount || '0',
						balance: balance || '0',
						payment_date: paymentDate || 'NA',
						transaction_id: transactionId || 'N/A',
						duepaymentdate: dueDate || 'NA',
					},
				],
			};

			await creatFees(newFee);
			onAddFee(newFee);
			onSuccess();
		}

		onClose();
		dispatch(GetAllFeesThunks({}) as any);
	};

	if (!isOpen) return null;

	return (
		<div className='fixed inset-0 z-50 flex'>
			<div
				className='fixed inset-0 bg-black/30 backdrop-blur-sm'
				onClick={onClose}
			/>
			<div className='ml-auto h-full w-full md:w-[400px] bg-white shadow-xl z-50 overflow-y-auto transition-all duration-300'>
				<div className='p-6'>
					<div className='flex justify-between items-center mb-6'>
						<h2 className='text-xl font-semibold text-gray-800'>
							{selectedFee ? 'Edit Fees' : 'Add Fees'}
						</h2>
						<button
							onClick={onClose}
							className='text-gray-600 hover:text-gray-800'
						>
							<X className='w-6 h-6' />
						</button>
					</div>

					<form className='space-y-4' onSubmit={handleSubmit}>
						{/* Branch */}
						<div>
							<label className='block text-sm text-gray-700'>
								Select Branch
							</label>
							<select
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
								value={branch}
								onChange={(e) => setBranch(e.target.value)}
							>
								<option value=''>Select Branch</option>
								{branchOptions.map((b: any) => (
									<option key={b.uuid} value={b.uuid}>
										{b.branch_identity}
									</option>
								))}
							</select>
							{errors.branch && (
								<p className='text-red-500 text-sm'>{errors.branch}</p>
							)}
						</div>

						{/* Course */}
						<div>
							<label className='block text-sm text-gray-700'>
								Select Course
							</label>
							<select
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
								value={course}
								onChange={(e) => setCourse(e.target.value)}
							>
								<option value=''>Select Course</option>
								{courseOptions.map((c: any) => (
									<option key={c.uuid} value={c.uuid}>
										{c.course_name}
									</option>
								))}
							</select>
							{errors.course && (
								<p className='text-red-500 text-sm'>{errors.course}</p>
							)}
						</div>

						{/* Batch */}
						<div>
							<label className='block text-sm text-gray-700'>
								Select Batch
							</label>
							<select
								value={batch}
								onChange={(e) => setBatch(e.target.value)}
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
							>
								<option value=''>Select Batch</option>
								{batchOptions.map((b: any) => (
									<option key={b.uuid} value={b.uuid}>
										{b.batch_name}
									</option>
								))}
							</select>
							{errors.batch && (
								<p className='text-red-500 text-sm'>{errors.batch}</p>
							)}
						</div>

						{/* Student */}
						<div>
							<label className='block text-sm text-gray-700'>
								Student Name
							</label>
							<select
								value={studentName}
								onChange={(e) => {
									const selected: any = students.find(
										(s: any) => s.full_name === e.target.value
									);
									setStudentName(selected?.full_name || '');
									setStudentEmail(selected?.email || '');
									setStudentId(selected?._id || '');
								}}
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
							>
								<option value=''>Select Student</option>
								{students.map((student: any, index: number) => (
									<option key={index} value={student.full_name}>
										{student.full_name}
									</option>
								))}
							</select>
							{errors.studentName && (
								<p className='text-red-500 text-sm'>{errors.studentName}</p>
							)}
						</div>

						{/* Payment Date */}
						<div>
							<label className='block text-sm text-gray-700'>
								Payment Date
							</label>
							<input
								type='date'
								value={paymentDate}
								onChange={(e) => setPaymentDate(e.target.value)}
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
							/>
							{errors.paymentDate && (
								<p className='text-red-500 text-sm'>{errors.paymentDate}</p>
							)}
						</div>

						{/* Transaction ID */}
						<div>
							<label className='block text-sm text-gray-700'>
								Transaction ID
							</label>
							<input
								type='text'
								value={transactionId}
								onChange={(e) => setTransactionId(e.target.value)}
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
							/>
							{errors.transactionId && (
								<p className='text-red-500 text-sm'>{errors.transactionId}</p>
							)}
						</div>

						{/* Paid Amount */}
						<div>
							<label className='block text-sm text-gray-700'>Paid Amount</label>
							<input
								type='text'
								value={paidAmount}
								onChange={(e) => setPaidAmount(e.target.value)}
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
							/>
							{errors.paidAmount && (
								<p className='text-red-500 text-sm'>{errors.paidAmount}</p>
							)}
						</div>

						{/* Balance */}
						<div>
							<label className='block text-sm text-gray-700'>Balance</label>
							<input
								type='text'
								value={balance}
								onChange={(e) => setBalance(e.target.value)}
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
							/>
							{errors.balance && (
								<p className='text-red-500 text-sm'>{errors.balance}</p>
							)}
						</div>

						{/* Due Date */}
						<div>
							<label className='block text-sm text-gray-700'>
								Due Payment Date
							</label>
							<input
								type='date'
								value={dueDate}
								onChange={(e) => setDueDate(e.target.value)}
								className='w-full border border-gray-300 rounded-md px-3 py-2 mt-1'
							/>
							{errors.dueDate && (
								<p className='text-red-500 text-sm'>{errors.dueDate}</p>
							)}
						</div>

						{/* Buttons */}
						<div className='flex justify-between mt-6'>
							<button
								type='button'
								className='px-4 py-2 rounded-md border border-cyan-400 text-cyan-600 hover:bg-cyan-50'
								onClick={onClose}
							>
								Cancel
							</button>
							<button
								type='submit'
								className='px-4 py-2 rounded-md bg-cyan-500 text-white hover:bg-cyan-600'
							>
								{selectedFee ? 'Update Fee' : 'Create Fee'}
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	);
};
