/* eslint-disable @typescript-eslint/no-explicit-any */
import type React from 'react';
import { useEffect, useState, useRef } from 'react';
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../components/ui/select';
import { FaSlidersH } from 'react-icons/fa';
import { BsPlusLg } from 'react-icons/bs';
import location from '../../../assets/studentmanagement/location.jpeg';
import call from '../../../assets/studentmanagement/call.png';
import msg from '../../../assets/studentmanagement/msg.png';
import person from '../../../assets/studentmanagement/person.png';
import send from '../../../assets/studentmanagement/send.png';
import { RiUploadCloudFill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStudentmanagement } from '../../../features/StudentManagement/reducer/thunks';
import {
	selectLoading,
	selectStudent,
} from '../../../features/StudentManagement/reducer/selector';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { GetImageUrl } from '../../../utils/helper';
import { createstudentdata } from '../../../features/StudentManagement/services/Student';
import { uploadFile } from '../../../features/staff/services';
import ContentLoader from 'react-content-loader';
import { ArrowLeft, Phone, Mail, X } from 'lucide-react';
import { GetLocalStorage } from '../../../utils/localStorage';
import {
	GetBranchCourseThunks,
	GetBranchThunks,
} from '../../../features/Content_Management/reducers/thunks';
import {
	Branch,
	BranchCourse,
} from '../../../features/Content_Management/reducers/selectors';
import PagenationCard from '../../../components/Pagenation/PagenationCard';
import toast from 'react-hot-toast';

interface ValidationErrors {
	first_name?: string;
	last_name?: string;
	email?: string;
	dob?: string;
	gender?: string;
	qualification?: string;
	branch?: string;
	course?: string;
	address1?: string;
	city?: string;
	state?: string;
	pincode?: string;
	phone_number?: string;
	alternate_phone_number?: string;
}

const Students = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [showAddStudent, setShowAddStudent] = useState(false);
	const [courseFilter] = useState<string | undefined>(undefined);
	const [batchFilter] = useState<string | undefined>(undefined);
	const [statusFilter] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();
	const fileInputRef = useRef<HTMLInputElement>(null);
	const loading = useSelector(selectLoading);
	const [branch, setBranch] = useState<string | undefined>(undefined);
	const branches = useSelector(Branch);
	const courses = useSelector(BranchCourse);
	const [pages, setpages] = useState(1);
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
		{}
	);

	// New states for modals
	const [showCallModal, setShowCallModal] = useState(false);
	const [showContactModal, setShowContactModal] = useState(false);
	const [showVideoModal, setShowVideoModal] = useState(false);
	const [selectedStudent, setSelectedStudent] = useState<any>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	const [newStudentForm, setNewStudentForm] = useState({
		first_name: '',
		last_name: '',
		email: '',
		dob: '',
		gender: '',
		qualification: '',
		branch: '',
		course: '',
		address1: '',
		address2: '',
		city: '',
		state: '',
		pincode: '',
		phone_number: '',
		alternate_phone_number: '',
		image: null as File | string | null,
	});

	const [isUploading, setIsUploading] = useState(false);

	const handleFileUpload = async (file: File) => {
		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			toast.error('Only JPEG and PNG files are allowed');
			return;
		}

		if (file.size > 2 * 1024 * 1024) {
			toast.error('File size must be less than 2MB');
			return;
		}

		try {
			setIsUploading(true);

			const formData = new FormData();
			formData.append('file', file);

			const response = await uploadFile(formData);
			const uploadedPath = response?.data?.file;

			if (!uploadedPath) {
				throw new Error('Upload failed: No file path returned');
			}

			setNewStudentForm((prev) => ({
				...prev,
				image: file,
			}));

			toast.success('Profile picture uploaded successfully');
		} catch (error) {
			console.error('Error uploading file:', error);
			toast.error('Failed to upload profile picture');
		} finally {
			setIsUploading(false);
		}
	};

	const toggleFilters = () => setShowFilters(!showFilters);
	const toggleAddStudent = () => {
		setShowAddStudent(!showAddStudent);
		setValidationErrors({});
	};

	const validateField = (
		name: keyof ValidationErrors,
		value: string
	): string => {
		switch (name) {
			case 'first_name':
				if (!value.trim()) return 'First name is required';
				if (value.trim().length < 2)
					return 'First name must be at least 2 characters long';
				return '';

			case 'last_name':
				if (!value.trim()) return 'Last name is required';
				if (value.trim().length < 1) return 'Last name is required';
				return '';

			case 'email':
				if (!value.trim()) return 'Email is required';
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value))
					return 'Please enter a valid email address';
				return '';

			case 'dob':
				if (!value) return 'Date of birth is required';

				const dob = new Date(value);
				const today = new Date();

				// Minimum age: 5 years
				const minAge = new Date(
					today.getFullYear() - 5,
					today.getMonth(),
					today.getDate()
				);
				if (dob > minAge) return 'Student must be at least 5 years old';

				// Maximum age: 110 years
				const maxAge = new Date(
					today.getFullYear() - 110,
					today.getMonth(),
					today.getDate()
				);
				if (dob < maxAge) return 'Student age cannot exceed 110 years';

				return '';

			case 'gender':
				if (!value) return 'Gender is required';
				return '';

			case 'qualification':
				if (!value.trim()) return 'Qualification is required';
				return '';

			case 'branch':
				if (!value) return 'Branch is required';
				return '';

			case 'course':
				if (!value) return 'Course is required';
				return '';

			case 'address1':
				if (!value.trim()) return 'Address line 1 is required';
				return '';

			case 'city':
				if (!value.trim()) return 'City is required';
				return '';

			case 'state':
				if (!value.trim()) return 'State is required';
				return '';

			case 'pincode':
				if (!value.trim()) return 'PIN code is required';
				const pinRegex = /^[0-9]{6}$/;
				if (!pinRegex.test(value))
					return 'Please enter a valid 6-digit PIN code';
				return '';

			case 'phone_number':
				if (!value.trim()) return 'Phone number is required';
				const phoneRegex = /^[6-9]\d{9}$/; // starts with 6–9 and has exactly 10 digits
				if (!phoneRegex.test(value.replace(/\D/g, '')))
					return 'Please enter a valid 10-digit phone number starting with 6–9';
				return '';

			case 'alternate_phone_number':
				if (value && !/^[6-9]\d{9}$/.test(value.replace(/\D/g, ''))) {
					return 'Please enter a valid 10-digit phone number starting with 6–9';
				}
				return '';

			default:
				return '';
		}
	};

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		const { id, value } = e.target;
		setNewStudentForm((prev) => ({ ...prev, [id]: value }));

		// Clear validation error when user starts typing
		if (validationErrors[id as keyof ValidationErrors]) {
			setValidationErrors((prev) => ({
				...prev,
				[id]: undefined,
			}));
		}
	};

	const handleSelectChange = (
		field: keyof typeof newStudentForm,
		value: string
	) => {
		setNewStudentForm((prev) => ({ ...prev, [field]: value }));

		// Clear validation error when user selects an option
		if (validationErrors[field as keyof ValidationErrors]) {
			setValidationErrors((prev) => ({
				...prev,
				[field]: undefined,
			}));
		}
	};

	const validateForm = (): boolean => {
		const errors: ValidationErrors = {};

		// Validate all required fields
		const fieldsToValidate: (keyof ValidationErrors)[] = [
			'first_name',
			'last_name',
			'email',
			'dob',
			'gender',
			'qualification',
			'branch',
			'course',
			'address1',
			'city',
			'state',
			'pincode',
			'phone_number',
		];

		fieldsToValidate.forEach((field) => {
			const error = validateField(
				field,
				newStudentForm[field as keyof typeof newStudentForm] as string
			);
			if (error) {
				errors[field] = error;
			}
		});

		// Validate optional fields only if they have values
		if (newStudentForm.alternate_phone_number) {
			const altPhoneError = validateField(
				'alternate_phone_number',
				newStudentForm.alternate_phone_number
			);
			if (altPhoneError) errors.alternate_phone_number = altPhoneError;
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	// Handle call icon click
	const handleCallClick = (student: any, e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedStudent(student);
		setShowCallModal(true);
	};

	// Handle message icon click - Opens default email client

	// Handle contact icon click
	const handleContactClick = (student: any, e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedStudent(student);
		setShowContactModal(true);
	};

	// Handle video icon click
	const handleVideoClick = (student: any, e: React.MouseEvent) => {
		e.stopPropagation();
		setSelectedStudent(student);
		setShowVideoModal(true);
	};

	// Handle actual phone call
	const handleMakeCall = (phoneNumber: string) => {
		window.location.href = `tel:${phoneNumber}`;
	};

	const handleAddNewStudent = async () => {
		if (!validateForm()) {
			toast.error('Please fix the validation errors before submitting.');
			return;
		}

		// Rest of your existing handleAddNewStudent code...
		if (
			!newStudentForm.first_name ||
			!newStudentForm.last_name ||
			!newStudentForm.email
		) {
			toast.error('First name, last name and email are required');
			return;
		}

		try {
			let imageUrl =
				typeof newStudentForm.image === 'string' ? newStudentForm.image : null;
			if (newStudentForm.image instanceof File) {
				setIsUploading(true);
				const formData = new FormData();
				formData.append('file', newStudentForm.image);
				const response = await uploadFile(formData);
				imageUrl = response?.data?.file;
				if (!imageUrl) {
					throw new Error('Image upload failed');
				}
			}

			const payload = {
				first_name: newStudentForm.first_name,
				last_name: newStudentForm.last_name,
				email: newStudentForm.email,
				dob: newStudentForm.dob,
				gender: newStudentForm.gender,
				qualification: newStudentForm.qualification,
				course: newStudentForm.course,
				contact_info: {
					address1: newStudentForm.address1,
					address2: newStudentForm.address2,
					city: newStudentForm.city,
					state: newStudentForm.state,
					pincode: newStudentForm.pincode,
					phone_number: newStudentForm.phone_number,
					alternate_phone_number: newStudentForm.alternate_phone_number,
				},
				image: imageUrl,
				branch_id: GetLocalStorage('selectedBranchId'),
				institute_id: GetLocalStorage('instituteId'),
				type: 'payment',
			};

			await dispatch(createstudentdata(payload)).unwrap();
			setNewStudentForm({
				first_name: '',
				last_name: '',
				email: '',
				dob: '',
				gender: '',
				qualification: '',
				branch: '',
				course: '',
				address1: '',
				address2: '',
				city: '',
				state: '',
				pincode: '',
				phone_number: '',
				alternate_phone_number: '',
				image: null,
			});
			setValidationErrors({});
			setShowAddStudent(false);
			toast.success('Student added successfully');

			dispatch(
				getStudentmanagement({
					branch_id: GetLocalStorage('selectedBranchId'),
					page: 1,
				})
			);
		} catch (error) {
			console.error('Error adding student:', error);
			toast.error('Failed to add student');
		} finally {
			setIsUploading(false);
		}
	};

	const studentData = useSelector(selectStudent);
	const dispatch = useDispatch<any>();

	useEffect(() => {
		(() => {
			dispatch(
				getStudentmanagement({
					branch_id: GetLocalStorage('selectedBranchId'),
					page: pages,
				})
			);
		})();
	}, [dispatch, pages]);

	useEffect(() => {
		dispatch(GetBranchThunks({}));
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetBranchCourseThunks(branch || ''));
	}, [branch, dispatch]);

	const formatStudentData = (data: any) => {
		if (!data || !data.data) return [];

		return data.data.map((student: any) => ({
			id: student._id,
			name: `${student.first_name || ''} ${student.last_name || ''}`.trim(),
			firstName: student.first_name,
			lastName: student.last_name,
			email: student.email,
			location: student.contact_info
				? `${student.contact_info.address1 || ''}, ${
						student.contact_info.city || student.contact_info.state || ''
				  }`.trim()
				: 'Location not specified',
			image: student.image,
			phone: student.contact_info?.phone_number,
			altPhone: student.contact_info?.alternate_phone_number,
			dob: student.dob,
			gender: student.gender,
			qualification: student.qualification,
			course: student.course,
			address1: student.contact_info?.address1,
			address2: student.contact_info?.address2,
			city: student.contact_info?.city,
			state: student.contact_info?.state,
			pincode: student.contact_info?.pincode,
			joinedDate: student.created_at,
			status: student.status || 'Active',
			uuid: student?.uuid,
		}));
	};

	const formattedStudents = formatStudentData(studentData);

	const handleStudentClick = (student: any) => {
		navigate(`/students/Profile`, {
			state: {
				studentData: student,
			},
		});
	};

	// Sample video URL - replace with actual student video URL from your data
	const sampleVideoUrl =
		'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4';

	if (showAddStudent) {
		return (
			<div className='p-6'>
				<div className='flex items-center justify-between mb-8'>
					<Button
						onClick={toggleAddStudent}
						className='flex items-center gap-2 text-[#1BBFCA] hover:bg-[#1BBFCA]/80 hover:text-white transition-colors duration-300'
					>
						<ArrowLeft size={50} style={{ width: '40px', height: '40px' }} />
					</Button>
				</div>
				<Card className='mb-6 shadow-md mt-4'>
					<CardHeader>
						<h1 className='text-[20px] text-[#1BBFCA] font-bold'>
							Add New Student
						</h1>
						<hr></hr>
						<CardTitle className='text-[20px] font-semibold'>
							Upload Profile Picture
						</CardTitle>
						<p className='text-[14px] text-gray-500'>
							Allowed PNG or JPEG. Max size of 2MB.
						</p>
					</CardHeader>
					<CardContent>
						<div
							className='border-2 border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-[#1BBFCA] transition-colors relative'
							onDragOver={(e) => {
								e.preventDefault();
								e.currentTarget.classList.add(
									'border-[#1BBFCA]',
									'bg-[#1BBFCA]/10'
								);
							}}
							onDragLeave={(e) => {
								e.preventDefault();
								e.currentTarget.classList.remove(
									'border-[#1BBFCA]',
									'bg-[#1BBFCA]/10'
								);
							}}
							onDrop={(e) => {
								e.preventDefault();
								e.currentTarget.classList.remove(
									'border-[#1BBFCA]',
									'bg-[#1BBFCA]/10'
								);
								if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
									handleFileUpload(e.dataTransfer.files[0]);
								}
							}}
							onClick={() => document.getElementById('file-upload')?.click()}
						>
							<input
								id='file-upload'
								type='file'
								accept='image/png, image/jpeg'
								className='hidden'
								ref={fileInputRef}
								onChange={(e) => {
									const file = e.target.files?.[0];
									if (!file) return;

									// Allowed MIME types
									const allowedTypes = ['image/jpeg', 'image/png'];

									if (!allowedTypes.includes(file.type)) {
										// Show error (toast, alert, or set state)
										toast.error(
											'Invalid file type. Please upload a JPG or PNG image.'
										);
										e.target.value = '';
										return;
									}

									handleFileUpload(file);
								}}
							/>
							{newStudentForm.image ? (
								<div className='flex flex-col items-center'>
									<img
										src={
											typeof newStudentForm.image === 'string'
												? newStudentForm.image
												: URL.createObjectURL(newStudentForm.image)
										}
										alt='Preview'
										className='h-32 w-32 rounded-full object-cover mb-4'
									/>
									<p className='text-[14px] text-gray-700'>
										{typeof newStudentForm.image === 'string'
											? 'Image uploaded'
											: newStudentForm.image.name}
									</p>
									<Button
										variant='ghost'
										className='mt-2 text-red-500 hover:text-red-700'
										onClick={(e: any) => {
											e.stopPropagation();
											setNewStudentForm((prev) => ({ ...prev, image: null }));
										}}
									>
										Remove
									</Button>
								</div>
							) : (
								<>
									<RiUploadCloudFill className='mx-auto text-[#1BBFCA] text-3xl mb-2' />
									<p className='text-[14px] text-gray-500'>
										Drop files here or click to upload
									</p>
									{isUploading && (
										<p className='text-[14px] text-gray-500 mt-2'>
											Uploading...
										</p>
									)}
								</>
							)}
						</div>
					</CardContent>
				</Card>

				<Card className='mb-6 shadow-md'>
					<CardHeader>
						<CardTitle className='text-[20px] font-semibold'>
							Student Details
						</CardTitle>
						<p className='text-[14px] text-gray-500'>Add User Details Here</p>
					</CardHeader>
					<CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						<div className='space-y-2'>
							<label htmlFor='first_name' className='text-[16px] font-medium'>
								First Name *
							</label>
							<Input
								id='first_name'
								value={newStudentForm.first_name}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.first_name
										? 'border-red-500'
										: 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.first_name && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.first_name}
								</p>
							)}
						</div>
						<div className='space-y-2'>
							<label htmlFor='last_name' className='text-[16px] font-medium'>
								Last Name
							</label>
							<Input
								id='last_name'
								value={newStudentForm.last_name}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='email' className='text-[16px] font-medium'>
								Email
							</label>
							<Input
								id='email'
								type='email'
								value={newStudentForm.email}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='dob' className='text-[16px] font-medium'>
								Date of Birth
							</label>
							<Input
								id='dob'
								type='date'
								value={newStudentForm.dob}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='gender' className='text-[16px] font-medium'>
								Gender
							</label>
							<Select
								value={newStudentForm.gender}
								onValueChange={(value) =>
									setNewStudentForm((prev) => ({ ...prev, gender: value }))
								}
							>
								<SelectTrigger className='w-full h-10 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150'>
									<SelectValue placeholder='Select gender' />
								</SelectTrigger>
								<SelectContent className='border-gray-300 shadow-md bg-white'>
									<SelectItem value='Male'>Male</SelectItem>
									<SelectItem value='Female'>Female</SelectItem>
									<SelectItem value='Other'>Other</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<label
								htmlFor='qualification'
								className='text-[16px] font-medium'
							>
								Qualification
							</label>
							<Input
								id='qualification'
								value={newStudentForm.qualification}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>

						<div className='flex flex-col gap-2'>
							<label htmlFor='branch'>Branch</label>
							<select
								id='branch'
								className='border p-2 rounded h-10'
								value={newStudentForm.branch}
								onChange={(e) => {
									handleInputChange(e);
									setBranch(e.target.value);
								}}
							>
								<option value=''>Select Branch</option>
								{Array.isArray(branches) &&
									branches.map((b: any) => (
										<option key={b.id} value={b.uuid}>
											{b.branch_identity}
										</option>
									))}
							</select>
						</div>

						<div className='flex flex-col gap-2'>
							<label htmlFor='course'>Select Course</label>
							<select
								id='course'
								className='border p-2 rounded h-10'
								value={newStudentForm.course}
								onChange={handleInputChange}
								disabled={!branch}
							>
								<option value=''>Select Course</option>
								{Array.isArray(courses) &&
									courses.map((c: any) => (
										<option key={c.uuid} value={c.uuid}>
											{c.course_name}
										</option>
									))}
							</select>
						</div>
					</CardContent>
				</Card>

				<Card className='mb-6 shadow-md'>
					<CardHeader>
						<CardTitle className='text-[20px] font-semibold'>
							Contact Info
						</CardTitle>
					</CardHeader>
					<CardContent className='grid grid-cols-1 md:grid-cols-3 gap-4'>
						{/* First Name Field */}
						<div className='space-y-2'>
							<label htmlFor='first_name' className='text-[16px] font-medium'>
								First Name *
							</label>
							<Input
								id='first_name'
								value={newStudentForm.first_name}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.first_name
										? 'border-red-500'
										: 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.first_name && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.first_name}
								</p>
							)}
						</div>
						{/* Last Name Field */}
						<div className='space-y-2'>
							<label htmlFor='last_name' className='text-[16px] font-medium'>
								Last Name *
							</label>
							<Input
								id='last_name'
								value={newStudentForm.last_name}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.last_name
										? 'border-red-500'
										: 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.last_name && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.last_name}
								</p>
							)}
						</div>
						{/* Email Field */}
						<div className='space-y-2'>
							<label htmlFor='email' className='text-[16px] font-medium'>
								Email *
							</label>
							<Input
								id='email'
								type='email'
								value={newStudentForm.email}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.email ? 'border-red-500' : 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.email && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.email}
								</p>
							)}
						</div>
						{/* Date of Birth Field */}
						<div className='space-y-2'>
							<label htmlFor='dob' className='text-[16px] font-medium'>
								Date of Birth *
							</label>
							<Input
								id='dob'
								type='date'
								value={newStudentForm.dob}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.dob ? 'border-red-500' : 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.dob && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.dob}
								</p>
							)}
						</div>
						{/* Gender Field */}
						<div className='space-y-2'>
							<label htmlFor='gender' className='text-[16px] font-medium'>
								Gender *
							</label>
							<Select
								value={newStudentForm.gender}
								onValueChange={(value) => handleSelectChange('gender', value)}
							>
								<SelectTrigger
									className={`w-full h-10 border ${
										validationErrors.gender
											? 'border-red-500'
											: 'border-gray-300'
									} hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150`}
								>
									<SelectValue placeholder='Select gender' />
								</SelectTrigger>
								<SelectContent className='border-gray-300 shadow-md bg-white'>
									<SelectItem value='Male'>Male</SelectItem>
									<SelectItem value='Female'>Female</SelectItem>
									<SelectItem value='Other'>Other</SelectItem>
								</SelectContent>
							</Select>
							{validationErrors.gender && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.gender}
								</p>
							)}
						</div>
						{/* Qualification Field */}
						<div className='space-y-2'>
							<label
								htmlFor='qualification'
								className='text-[16px] font-medium'
							>
								Qualification *
							</label>
							<Input
								id='qualification'
								value={newStudentForm.qualification}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.qualification
										? 'border-red-500'
										: 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.qualification && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.qualification}
								</p>
							)}
						</div>
						{/* Branch Field */}
						<div className='flex flex-col gap-2'>
							<label htmlFor='branch'>Branch *</label>
							<select
								id='branch'
								className={`border p-2 rounded h-10 ${
									validationErrors.branch ? 'border-red-500' : 'border-gray-300'
								}`}
								value={newStudentForm.branch}
								onChange={(e) => {
									handleInputChange(e);
									setBranch(e.target.value);
								}}
							>
								<option value=''>Select Branch</option>
								{Array.isArray(branches) &&
									branches.map((b: any) => (
										<option key={b.id} value={b.uuid}>
											{b.branch_identity}
										</option>
									))}
							</select>
							{validationErrors.branch && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.branch}
								</p>
							)}
						</div>
						{/* Course Field */}
						<div className='flex flex-col gap-2'>
							<label htmlFor='course'>Select Course *</label>
							<select
								id='course'
								className={`border p-2 rounded h-10 ${
									validationErrors.course ? 'border-red-500' : 'border-gray-300'
								}`}
								value={newStudentForm.course}
								onChange={handleInputChange}
								disabled={!branch}
							>
								<option value=''>Select Course</option>
								{Array.isArray(courses) &&
									courses.map((c: any) => (
										<option key={c.uuid} value={c.uuid}>
											{c.course_name}
										</option>
									))}
							</select>
							{validationErrors.course && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.course}
								</p>
							)}
						</div>
						{/* Address Line 1 Field */}
						<div className='space-y-2'>
							<label htmlFor='address1' className='text-[16px] font-medium'>
								Address Line 1 *
							</label>
							<Input
								id='address1'
								value={newStudentForm.address1}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.address1
										? 'border-red-500'
										: 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.address1 && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.address1}
								</p>
							)}
						</div>
						{/* City Field */}
						<div className='space-y-2'>
							<label htmlFor='city' className='text-[16px] font-medium'>
								City *
							</label>
							<Input
								id='city'
								value={newStudentForm.city}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.city ? 'border-red-500' : 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.city && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.city}
								</p>
							)}
						</div>
						{/* State Field */}
						<div className='space-y-2'>
							<label htmlFor='state' className='text-[16px] font-medium'>
								State *
							</label>
							<Input
								id='state'
								value={newStudentForm.state}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.state ? 'border-red-500' : 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.state && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.state}
								</p>
							)}
						</div>
						{/* Pin Code Field */}
						<div className='space-y-2'>
							<label htmlFor='pincode' className='text-[16px] font-medium'>
								Pin Code *
							</label>
							<Input
								id='pincode'
								value={newStudentForm.pincode}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.pincode
										? 'border-red-500'
										: 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.pincode && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.pincode}
								</p>
							)}
						</div>
						{/* Phone Number Field */}
						<div className='space-y-2'>
							<label htmlFor='phone_number' className='text-[16px] font-medium'>
								Phone Number *
							</label>
							<Input
								id='phone_number'
								value={newStudentForm.phone_number}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.phone_number
										? 'border-red-500'
										: 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.phone_number && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.phone_number}
								</p>
							)}
						</div>
						{/* Alternate Phone Number Field */}
						<div className='space-y-2'>
							<label
								htmlFor='alternate_phone_number'
								className='text-[16px] font-medium'
							>
								Alt Phone Number
							</label>
							<Input
								id='alternate_phone_number'
								value={newStudentForm.alternate_phone_number}
								onChange={handleInputChange}
								className={`w-full h-10 border ${
									validationErrors.alternate_phone_number
										? 'border-red-500'
										: 'border-gray-300'
								} placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]`}
							/>
							{validationErrors.alternate_phone_number && (
								<p className='text-red-500 text-xs mt-1'>
									{validationErrors.alternate_phone_number}
								</p>
							)}
						</div>
					</CardContent>
					<CardFooter className='flex justify-end mt-4 space-x-3'>
						<Button
							onClick={toggleAddStudent}
							className='bg-[#1BBFCA]/10 text-[#1BBFCA] hover:bg-[#1BBFCA]/10 pr-16px pl-16px'
							disabled={isUploading}
						>
							Cancel
						</Button>
						<Button
							onClick={handleAddNewStudent}
							className='bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]/90 pr-16px pl-16px'
							disabled={isUploading}
						>
							{isUploading ? 'Saving...' : 'Add Student'}
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	const filteredStudents = formattedStudents.filter((student: any) => {
		const matchesName = student.name
			.toLowerCase()
			.includes(searchInput.toLowerCase());

		const matchesCourse = courseFilter ? student.course === courseFilter : true;

		const matchesBatch = batchFilter ? student.batch === batchFilter : true;

		const matchesStatus = statusFilter
			? student.status?.toLowerCase() === statusFilter.toLowerCase()
			: true;

		return matchesName && matchesCourse && matchesBatch && matchesStatus;
	});

	return (
		<div className='p-6 w-full'>
			{/* Call Modal */}
			{showCallModal && selectedStudent && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-96'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-lg font-semibold'>Call Student</h3>
							<button
								onClick={() => setShowCallModal(false)}
								className='text-gray-500 hover:text-gray-700'
							>
								<X size={20} />
							</button>
						</div>
						<div className='text-center mb-6'>
							<p className='text-gray-600 mb-2'>Calling:</p>
							<p className='text-xl font-semibold'>{selectedStudent.name}</p>
							<p className='text-gray-500'>
								{selectedStudent.phone || 'No phone number available'}
							</p>
						</div>
						<div className='flex justify-center space-x-4'>
							<Button
								onClick={() => {
									if (selectedStudent.phone) {
										handleMakeCall(selectedStudent.phone);
									} else {
										toast.error('No phone number available for this student');
									}
								}}
								className='bg-green-500 hover:bg-green-600 text-white'
							>
								<Phone className='mr-2' size={16} />
								Call Now
							</Button>
							<Button onClick={() => setShowCallModal(false)} variant='outline'>
								Cancel
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Contact Modal */}
			{showContactModal && selectedStudent && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-96'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-lg font-semibold'>Contact Options</h3>
							<button
								onClick={() => setShowContactModal(false)}
								className='text-gray-500 hover:text-gray-700'
							>
								<X size={20} />
							</button>
						</div>
						<div className='space-y-3'>
							<Button
								onClick={() => {
									if (selectedStudent.phone) {
										handleMakeCall(selectedStudent.phone);
										setShowContactModal(false);
									} else {
										toast.error('No phone number available');
									}
								}}
								className='w-full justify-start'
								variant='outline'
							>
								<Phone className='mr-3' size={16} />
								Call Primary: {selectedStudent.phone || 'Not available'}
							</Button>
							{selectedStudent.altPhone && (
								<Button
									onClick={() => {
										handleMakeCall(selectedStudent.altPhone);
										setShowContactModal(false);
									}}
									className='w-full justify-start'
									variant='outline'
								>
									<Phone className='mr-3' size={16} />
									Call Alternate: {selectedStudent.altPhone}
								</Button>
							)}
							<Button
								onClick={() => {
									const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${selectedStudent.email}&su=Hello&body=Your message here`;
									window.open(gmailUrl, '_blank'); // opens Gmail compose in a new tab
									setShowContactModal(false);
								}}
								className='w-full justify-start'
								variant='outline'
							>
								<Mail className='mr-3' size={16} />
								Send Email: {selectedStudent.email}
							</Button>
						</div>
					</div>
				</div>
			)}

			{/* Video Modal */}
			{showVideoModal && selectedStudent && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
					<div className='bg-white rounded-lg p-6 w-3/4 max-w-4xl'>
						<div className='flex justify-between items-center mb-4'>
							<h3 className='text-lg font-semibold'>
								Student Video - {selectedStudent.name}
							</h3>
							<button
								onClick={() => {
									setShowVideoModal(false);
									if (videoRef.current) {
										videoRef.current.pause();
									}
								}}
								className='text-gray-500 hover:text-gray-700'
							>
								<X size={20} />
							</button>
						</div>
						<div className='bg-black rounded-lg overflow-hidden'>
							<video
								ref={videoRef}
								controls
								autoPlay
								className='w-full h-auto max-h-96'
								onEnded={() => console.log('Video ended')}
								onError={() => toast.error('Error playing video')}
							>
								<source src={sampleVideoUrl} type='video/mp4' />
								Your browser does not support the video tag.
							</video>
						</div>
						<div className='mt-4 text-center'>
							<p className='text-gray-600'>
								Playing student-related video for {selectedStudent.name}
							</p>
						</div>
					</div>
				</div>
			)}

			<div className='flex justify-between items-center mb-4'>
				<h4 className='text-[24px] font-semibold'>Student</h4>
			</div>

			<div className='flex flex-col sm:flex-row justify-between items-center mb-4 gap-3'>
				<Button
					variant='outline'
					onClick={toggleFilters}
					className='
      w-full sm:w-auto 
      max-w-xs sm:max-w-[180px] 
      px-4 sm:px-6 
      py-2 sm:py-3 
      text-sm sm:text-base md:text-lg 
      bg-[#1BBFCA] text-white 
      hover:bg-[#1BBFCA]/90 
      flex items-center justify-center gap-2
    '
				>
					<FaSlidersH className='text-base sm:text-lg md:text-xl' />
					{showFilters ? 'Hide Filter' : 'Show Filter'}
				</Button>

				<Button
					onClick={toggleAddStudent}
					className='
      w-full sm:w-auto 
      max-w-xs sm:max-w-[220px] 
      px-4 sm:px-6 
      py-2 sm:py-3 
      text-sm sm:text-base md:text-lg 
      bg-[#1BBFCA] text-white 
      hover:bg-[#1BBFCA]/90 
      flex items-center justify-center gap-2
    '
				>
					<BsPlusLg className='text-base sm:text-lg md:text-xl' />
					Add New Student
				</Button>
			</div>

			{showFilters && (
				<div className='bg-white p-6 rounded-lg shadow-lg mb-6 space-y-6 border border-gray-200'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-2'>
							<div className='text-sm font-medium text-transparent select-none'>
								<label className='text-[16px] font-medium text-gray-700'>
									Filter by name
								</label>
							</div>
							<Input
								type='text'
								placeholder='Search Student'
								value={searchInput}
								onChange={(e) => setSearchInput(e.target.value)}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
					</div>
				</div>
			)}

			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-4'>
				{loading ? (
					[...Array(6)].map((_, index) => (
						<ContentLoader
							key={index}
							speed={1}
							width='100%'
							height='100%'
							backgroundColor='#f3f3f3'
							foregroundColor='#ecebeb'
							className='w-full h-[310px] p-4 rounded-2xl border shadow-md'
						>
							<rect x='0' y='0' rx='6' ry='6' width='100' height='24' />
							<rect x='270' y='0' rx='6' ry='6' width='80' height='24' />

							<rect x='0' y='36' rx='10' ry='10' width='100%' height='120' />

							<rect x='0' y='170' rx='6' ry='6' width='60%' height='20' />

							<rect x='0' y='200' rx='4' ry='4' width='80' height='16' />
							<rect x='280' y='200' rx='4' ry='4' width='60' height='20' />

							<rect x='0' y='240' rx='6' ry='6' width='100' height='32' />

							<rect x='260' y='240' rx='6' ry='6' width='80' height='32' />
						</ContentLoader>
					))
				) : filteredStudents.length ? (
					filteredStudents?.map((student: any, index: number) => (
						<Card
							key={index}
							className='w-full shadow-md cursor-pointer hover:shadow-lg transition-shadow'
							onClick={() => handleStudentClick(student)}
						>
							<CardContent className='p-5'>
								<div className='flex justify-center mb-10'>
									<Avatar className='h-25 w-25 rounded-lg'>
										<AvatarImage
											src={GetImageUrl(student?.image) ?? undefined}
											alt={student?.name || 'Student'}
											className='rounded-lg object-cover'
										/>
									</Avatar>
								</div>

								<h5 className='text-[20px] font-semibold text-center'>
									{student.name}
								</h5>
								<p className='text-[16px] text-gray-500 text-center'>
									{student.email}
								</p>

								<div className='flex items-center mt-2 justify-center text-[16px] text-gray-700 gap-[8px]'>
									<img className='w-5 h-5' src={location} alt='Location' />
									<span>{student.location}</span>
								</div>
							</CardContent>

							<CardFooter className='grid grid-cols-4 sm:grid-cols-4 md:gap-[25px] lg:gap-[30px] xl:gap-[30px] sm:gap-[20px] items-center px-4 pb-4'>
								<button
									onClick={(e) => handleCallClick(student, e)}
									className='flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors'
								>
									<img className='w-6 h-6' src={call} alt='Call' />
								</button>
								<button
									onClick={() => {
										const gmailUrl = `https://mail.google.com/mail/?view=cm&to=${student.email}&su=Hello&body=Your message here`;
										window.open(gmailUrl, '_blank');
									}}
									className='flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors'
								>
									<img className='w-6 h-6' src={msg} alt='Message' />
								</button>

								<button
									onClick={(e) => handleContactClick(student, e)}
									className='flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors'
								>
									<img className='w-6 h-6' src={person} alt='Profile' />
								</button>
								<button
									onClick={(e) => handleVideoClick(student, e)}
									className='flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-full transition-colors'
								>
									<img className='w-6 h-6' src={send} alt='Send' />
								</button>
							</CardFooter>
						</Card>
					))
				) : (
					<Card className='col-span-full shadow-md cursor-pointer hover:shadow-lg transition-shadow mt-12'>
						<p className='text-[20px] font-medium text-center'>
							No Students available
						</p>
					</Card>
				)}
			</div>

			<PagenationCard
				page={pages}
				perpage={studentData?.pagination?.perPage}
				totalpage={studentData?.pagination?.totalPages}
				setpage={setpages}
			/>
		</div>
	);
};

export default Students;
