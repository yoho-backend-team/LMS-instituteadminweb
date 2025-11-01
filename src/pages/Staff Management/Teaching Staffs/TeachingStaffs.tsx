/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useRef, useState } from 'react';
import { Plus, Filter, Mail } from 'lucide-react';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../components/ui/select';
import { Avatar, AvatarImage } from '../../../components/ui/avatar';
import { Button } from '../../../components/ui/button';
import { Card } from '../../../components/ui/card';
import { useNavigate } from 'react-router-dom';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectLoading,
	selectStaff,
} from '../../../features/staff/reducers/selector';
import { getStaffDetailsData } from '../../../features/staff/reducers/thunks';
import { GetImageUrl } from '../../../utils/helper';
import {
	createStaff,
	updateStaff,
	uploadFile,
} from '../../../features/staff/services';
import ContentLoader from 'react-content-loader';
import toast from 'react-hot-toast';
import { GetAllCoursesThunk } from '../../../features/Courses_mangement/Reducers/CourseThunks';
import { selectCoursesData } from '../../../features/Courses_mangement/Reducers/Selectors';
import { GetLocalStorage } from '../../../utils/localStorage';

const theme = {
	primary: {
		bg: 'bg-[#1bbfca]',
		text: 'text-white',
		border: 'border-[#1bbfca]',
		hover: {
			bg: 'hover:bg-[#1aa9b4]',
			border: 'hover:border-[#1aa9b4]',
		},
	},
};

interface Staff {
	id: number;
	name: string;
	email: string;
	status: 'Active' | 'Inactive';
	avatar: string;
	dateOfBirth?: string;
	gender?: string;
	course?: string;
	designation?: string;
	qualification?: string;
	state?: string;
	city?: string;
	pinCode?: string;
	addressLine1?: string;
	addressLine2?: string;
	phoneNumber?: string;
	altPhoneNumber?: string;
	bank_name?: string;
	bank_branch?: string;
	bank_account_number?: string;
	bank_IFSC?: string;
	monthly_Basic?: string;
	HRA?: string;
	Conveyance?: string;
	Travel_allowance?: string;
	Home_allowance?: string;
}

interface ValidationErrors {
	name?: string;
	email?: string;
	dateOfBirth?: string;
	gender?: string;
	course?: string;
	designation?: string;
	qualification?: string;
	phoneNumber?: string;
	altPhoneNumber?: string;
	addressLine1?: string;
	addressLine2?: string;
	city?: string;
	state?: string;
	pinCode?: string;
	bank_name?: string;
	bank_branch?: string;
	bank_account_number?: string;
	bank_IFSC?: string;
	monthly_Basic?: string;
	HRA?: string;
	Conveyance?: string;
	Travel_allowance?: string;
	Home_allowance?: string;
}

const TeachingStaffs: React.FC = () => {
	const [showFilter, setShowFilter] = useState(false);
	const [statusFilter, setStatusFilter] = useState<string>('all');
	const [courseFilter, setCourseFilter] = useState<string>('all');
	const [showAddStaff, setShowAddStaff] = useState(false);
	const [newStaff, setNewStaff] = useState<Omit<Staff, 'id' | 'avatar'>>({
		name: '',
		email: '',
		status: 'Active',
		dateOfBirth: '',
		gender: '',
		course: '',
		designation: '',
		qualification: '',
		state: '',
		city: '',
		pinCode: '',
		addressLine1: '',
		addressLine2: '',
		phoneNumber: '',
		altPhoneNumber: '',
		bank_name: '',
		bank_branch: '',
		bank_account_number: '',
		bank_IFSC: '',
		monthly_Basic: '',
		HRA: '',
		Conveyance: '',
		Travel_allowance: '',
		Home_allowance: '',
	});
	const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
		{}
	);
	const [, setIsLoading] = useState(false);
	const [preview, setPreview] = useState<string | null>(null);
	const [fileUrl, setFileUrl] = useState<string | null>(null);
	const fileInputRef = useRef<HTMLInputElement | null>(null);
	const navigate = useNavigate();
	const dispatch = useDispatch<any>();
	const classData = useSelector(selectStaff)?.data || [];

	useEffect(() => {
		if (preview) {
			return () => {
				URL.revokeObjectURL(preview);
			};
		}
	}, [preview]);

	// Validation functions
	const validateField = (
		name: keyof ValidationErrors,
		value: string
	): string => {
		switch (name) {
			case 'name':
				if (!value.trim()) return 'Full name is required';
				if (value.trim().length < 2)
					return 'Name must be at least 2 characters long';
				return '';

			case 'email':
				if (!value.trim()) return 'Email is required';
				const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
				if (!emailRegex.test(value))
					return 'Please enter a valid email address';
				return '';

			case 'phoneNumber':
				if (!value.trim()) return 'Phone number is required';
				const phoneRegex = /^[6-9]\d{9}$/; // starts with 6–9, total 10 digits
				if (!phoneRegex.test(value.replace(/\D/g, '')))
					return 'Please enter a valid 10-digit phone number starting with 6–9';
				return '';

			case 'altPhoneNumber':
				if (value && !/^[6-9]\d{9}$/.test(value.replace(/\D/g, ''))) {
					return 'Please enter a valid 10-digit phone number starting with 6–9';
				}
				return '';

			case 'dateOfBirth':
				if (!value) return 'Date of birth is required';
				const dob = new Date(value);
				const today = new Date();
				const minAge = new Date(
					today.getFullYear() - 18,
					today.getMonth(),
					today.getDate()
				);
				if (dob > minAge) return 'Staff must be at least 18 years old';
				return '';

			case 'gender':
				if (!value) return 'Gender is required';
				return '';

			case 'course':
				if (!value) return 'Course is required';
				return '';

			case 'designation':
				if (!value.trim()) return 'Designation is required';
				return '';

			case 'qualification':
				if (!value.trim()) return 'Qualification is required';
				return '';

			case 'addressLine1':
				if (!value.trim()) return 'Address line 1 is required';
				return '';

			case 'addressLine2':
				if (!value.trim()) return 'Address line 2 is required';
				return '';

			case 'city':
				if (!value.trim()) return 'City is required';
				return '';

			case 'state':
				if (!value.trim()) return 'State is required';
				return '';

			case 'bank_name':
				if (!value.trim()) return 'Bank is required';
				return '';

			case 'bank_branch':
				if (!value.trim()) return 'Branch is required';
				return '';

			case 'pinCode':
				if (!value.trim()) return 'PIN code is required';
				const pinRegex = /^[0-9]{6}$/;
				if (!pinRegex.test(value))
					return 'Please enter a valid 6-digit PIN code';
				return '';

			case 'bank_account_number':
				if (!value.trim()) return 'Bank account number is required';
				if (!/^[0-9]{9,18}$/.test(value))
					return 'Please enter a valid bank account number (9-18 digits)';
				return '';

			case 'bank_IFSC':
				if (!value.trim()) return 'Bank IFSC code is required';
				const ifscRegex = /^[A-Z]{4}0[A-Z0-9]{6}$/;
				if (!ifscRegex.test(value.toUpperCase()))
					return 'Please enter a valid IFSC code';
				return '';

			case 'monthly_Basic':
				if (!value.trim()) return 'Monthly basic salary is required';
				if (!/^\d+$/.test(value)) return 'Please enter a valid number';
				return '';

			case 'HRA':
				if (!value.trim()) return 'Monthly basic salary is required';
				if (!/^\d+$/.test(value)) return 'Please enter a valid number';
				return '';

			case 'Conveyance':
				if (!value.trim()) return 'Monthly basic salary is required';
				if (!/^\d+$/.test(value)) return 'Please enter a valid number';
				return '';

			case 'Travel_allowance':
				if (!value.trim()) return 'Monthly basic salary is required';
				if (!/^\d+$/.test(value)) return 'Please enter a valid number';
				return '';

			case 'Home_allowance':
				if (!value.trim()) return 'Monthly basic salary is required';
				if (!/^\d+$/.test(value)) return 'Please enter a valid number';
				return '';

			default:
				return '';
		}
	};

	const handleInputChange = (
		field: keyof Omit<Staff, 'id' | 'avatar' | 'status'>,
		value: string
	) => {
		setNewStaff((prev) => ({ ...prev, [field]: value }));

		// Clear validation error when user starts typing
		if (validationErrors[field as keyof ValidationErrors]) {
			setValidationErrors((prev) => ({
				...prev,
				[field]: undefined,
			}));
		}
	};

	const handleSelectChange = (
		field: keyof Omit<Staff, 'id' | 'avatar' | 'status'>,
		value: string
	) => {
		setNewStaff((prev) => ({ ...prev, [field]: value }));

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
			'name',
			'email',
			'dateOfBirth',
			'gender',
			'course',
			'designation',
			'qualification',
			'phoneNumber',
			'addressLine1',
			'city',
			'state',
			'pinCode',
			'bank_account_number',
			'bank_IFSC',
			'monthly_Basic',
			'bank_name',
			'bank_branch',
			'Conveyance',
			'HRA',
			'Home_allowance',
			'Travel_allowance',
			'altPhoneNumber',
			'addressLine2',
		];

		fieldsToValidate.forEach((field) => {
			const error = validateField(
				field,
				newStaff[
					field as keyof Omit<Staff, 'id' | 'avatar' | 'status'>
				] as string
			);
			if (error) {
				errors[field] = error;
			}
		});

		// Validate optional fields only if they have values
		if (newStaff.altPhoneNumber) {
			const altPhoneError = validateField(
				'altPhoneNumber',
				newStaff.altPhoneNumber
			);
			if (altPhoneError) errors.altPhoneNumber = altPhoneError;
		}

		setValidationErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
		if (!allowedTypes.includes(file.type)) {
			toast.error('Only image files (JPG, PNG) are allowed.');
			return;
		}

		// Validate file size (800KB)
		if (file.size > 800 * 1024) {
			toast.error('File size must be less than 800KB.');
			return;
		}

		try {
			setIsLoading(true);
			const imageUrl = URL.createObjectURL(file);
			setPreview(imageUrl);

			const formData = new FormData();
			formData.append('file', file);
			const response = await uploadFile(formData);
			const uploadedPath = response?.data?.file;

			if (!uploadedPath) {
				throw new Error('Upload failed: No file path returned from server.');
			}
			setFileUrl(uploadedPath);
			toast.success('Profile picture uploaded successfully.');
		} catch (error: any) {
			toast.error(error?.message || 'Failed to upload file');
		} finally {
			setIsLoading(false);
		}
	};

	const handleAddStaff = async () => {
		if (!validateForm()) {
			toast.error('Please fix the validation errors before submitting.');
			return;
		}

		if (newStaff.name && newStaff.email) {
			const payload = {
				branch_id: GetLocalStorage('selectedBranchId'),
				contact_info: {
					state: newStaff.state,
					city: newStaff.city,
					pincode: newStaff.pinCode,
					address1: newStaff.addressLine1,
					address2: newStaff.addressLine2,
					phone_number: newStaff.phoneNumber,
					alternate_phone_number: newStaff.altPhoneNumber,
				},
				course: newStaff.course,
				designation: newStaff.designation,
				dob: newStaff.dateOfBirth,
				email: newStaff.email,
				full_name: newStaff.name,
				gender: newStaff.gender,
				image: fileUrl ?? 'staticfiles/lms/default-image.png',
				institute_id: GetLocalStorage('instituteId'),
				qualification: newStaff.qualification,
				staffId: '',
				user_details: 'InstituteTeachingStaff',
				bank_name: newStaff.bank_name,
				bank_branch: newStaff.bank_branch,
				bank_account_number: newStaff.bank_account_number,
				bank_IFSC: newStaff.bank_IFSC,
				monthly_Basic: newStaff.monthly_Basic,
				HRA: newStaff.HRA,
				Conveyance: newStaff.Conveyance,
				Travel_allowance: newStaff.Travel_allowance,
				Home_allowance: newStaff.Home_allowance,
			};

			try {
				const response = await createStaff(payload);
				setNewStaff({
					name: '',
					email: '',
					status: 'Active',
					dateOfBirth: '',
					gender: '',
					course: '',
					designation: '',
					qualification: '',
					state: '',
					city: '',
					pinCode: '',
					addressLine1: '',
					addressLine2: '',
					phoneNumber: '',
					altPhoneNumber: '',
					bank_name: '',
					bank_branch: '',
					bank_account_number: '',
					bank_IFSC: '',
					monthly_Basic: '',
					HRA: '',
					Conveyance: '',
					Travel_allowance: '',
					Home_allowance: '',
				});
				setValidationErrors({});
				setPreview(null);
				setFileUrl(null);

				if (response.status == 'success') {
					toast.success('Staff created successfully!');
					setShowAddStaff(false);
					fetchClassData();
				} else {
					toast.success(response?.message);
				}
			} catch (error) {
				console.error('❌ Failed to create staff:', error);
				toast.success('failed for staff created data!');
			}
		}
	};

	const toggleStatus = async (staffId: number, status: boolean) => {
		console.log(staffId, 'toggle');
		try {
			await updateStaff({ staffId }, { is_active: status });
			fetchClassData();
			toast.success('updated successfully.....!');
		} catch (error) {
			console.error('❌ Failed to update staff status:', error);
			toast.error(' failed to update');
		}
	};

	const getStatusButtonStyle = (status: 'Active' | 'Inactive') => {
		if (status === 'Active') {
			return `${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border}`;
		} else {
			return 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
		}
	};

	const handleProfile = (staffMember: Staff) => {
		navigate('/staffs-details', { state: { staff: staffMember } });
	};

	const loading = useSelector(selectLoading);
	const courseData = useSelector(selectCoursesData);

	const fetchClassData = (page: number = 1) => {
		dispatch(
			getStaffDetailsData({
				page: page,
			})
		);
	};

	useEffect(() => {
		fetchClassData();
	}, [dispatch]);

	useEffect(() => {
		dispatch(GetAllCoursesThunk(''));
	}, []);

	const filteredStaff = classData.filter((member: any) => {
		const statusMatch =
			statusFilter === 'all' ||
			(statusFilter === 'Active' && member.is_active) ||
			(statusFilter === 'Inactive' && !member.is_active);
		const courseMatch =
			courseFilter === 'all' || member.course?.includes(courseFilter);
		return statusMatch && courseMatch;
	});

	return (
		<div className='space-y-4 min-h-screen overflow-y-auto p-2 sm:p-4'>
			<h1 style={{ ...FONTS.heading_02 }} className='text-xl sm:text-2xl'>
				Teaching Staff
			</h1>

			{showAddStaff ? (
				<Card className='p-3 sm:p-4 m-1 sm:m-2 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]'>
					<h3 className='text-lg sm:text-xl font-semibold mb-4'>
						Add New Teaching Staff
					</h3>

					<div className='flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 border rounded mb-4 sm:mb-6 bg-white border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]'>
						<div className='flex items-center gap-3 sm:gap-4 mb-3 sm:mb-0'>
							<input
								type='file'
								accept='.jpg,.jpeg,.png'
								ref={fileInputRef}
								onChange={handleFileChange}
								className='text-xs sm:text-sm'
							/>
							<div>
								<p
									style={{
										...FONTS.heading_05_bold,
										color: COLORS.gray_dark_02,
									}}
									className='text-sm sm:text-base'
								>
									Profile Picture
								</p>
								<p
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs'
								>
									Allowed PNG or JPEG. Max size of 800k.
								</p>
							</div>
						</div>
					</div>

					<div className='space-y-6 sm:space-y-8'>
						{/* Personal Info */}
						<div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
							<h1 className='col-span-full text-lg sm:text-[20px] font-semibold text-[#716F6F] mb-2'>
								Personal Info
							</h1>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Full Name *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.name
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.name}
									onChange={(e) => handleInputChange('name', e.target.value)}
								/>
								{validationErrors.name && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.name}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Email *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.email
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.email}
									onChange={(e) => handleInputChange('email', e.target.value)}
								/>
								{validationErrors.email && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.email}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Date of Birth *
								</label>
								<Input
									type='date'
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.dateOfBirth
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.dateOfBirth}
									onChange={(e) =>
										handleInputChange('dateOfBirth', e.target.value)
									}
								/>
								{validationErrors.dateOfBirth && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.dateOfBirth}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Gender *
								</label>
								<Select
									value={newStaff.gender}
									onValueChange={(value) => handleSelectChange('gender', value)}
								>
									<SelectTrigger
										className={`w-full h-9 sm:h-10 border ${
											validationErrors.gender
												? 'border-red-500'
												: 'border-[#716F6F]'
										} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									>
										<SelectValue placeholder='Select Gender' />
									</SelectTrigger>
									<SelectContent className='bg-white'>
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

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Courses *
								</label>
								<Select
									value={newStaff.course}
									onValueChange={(value) => handleSelectChange('course', value)}
								>
									<SelectTrigger
										className={`w-full h-9 sm:h-10 border ${
											validationErrors.course
												? 'border-red-500'
												: 'border-[#716F6F]'
										} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									>
										<SelectValue placeholder='Select Course' />
									</SelectTrigger>
									<SelectContent className='bg-white'>
										{courseData && courseData.length > 0 ? (
											courseData.map((course: any) => (
												<SelectItem key={course._id} value={course.uuid}>
													{course.course_name}
												</SelectItem>
											))
										) : (
											<SelectItem value='no-course' disabled>
												No Courses Found
											</SelectItem>
										)}
									</SelectContent>
								</Select>
								{validationErrors.course && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.course}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Designation *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.designation
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.designation}
									onChange={(e) =>
										handleInputChange('designation', e.target.value)
									}
								/>
								{validationErrors.designation && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.designation}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Qualification *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.qualification
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.qualification}
									onChange={(e) =>
										handleInputChange('qualification', e.target.value)
									}
								/>
								{validationErrors.qualification && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.qualification}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Phone Number *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.phoneNumber
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.phoneNumber}
									onChange={(e) =>
										handleInputChange('phoneNumber', e.target.value)
									}
								/>
								{validationErrors.phoneNumber && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.phoneNumber}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Alt Phone Number
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.altPhoneNumber
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.altPhoneNumber}
									onChange={(e) =>
										handleInputChange('altPhoneNumber', e.target.value)
									}
								/>
								{validationErrors.altPhoneNumber && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.altPhoneNumber}
									</p>
								)}
							</div>
						</div>

						{/* Address */}
						<div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
							<h1 className='col-span-full text-lg sm:text-[20px] font-semibold text-[#716F6F] mb-2'>
								Address
							</h1>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Address Line 1 *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.addressLine1
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.addressLine1}
									onChange={(e) =>
										handleInputChange('addressLine1', e.target.value)
									}
								/>
								{validationErrors.addressLine1 && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.addressLine1}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Address Line 2
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.addressLine2
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.addressLine2}
									onChange={(e) =>
										handleInputChange('addressLine2', e.target.value)
									}
								/>
								{validationErrors.addressLine2 && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.addressLine2}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									City *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.city
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.city}
									onChange={(e) => handleInputChange('city', e.target.value)}
								/>
								{validationErrors.city && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.city}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									State *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.state
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.state}
									onChange={(e) => handleInputChange('state', e.target.value)}
								/>
								{validationErrors.state && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.state}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Pin Code *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.pinCode
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.pinCode}
									onChange={(e) => handleInputChange('pinCode', e.target.value)}
								/>
								{validationErrors.pinCode && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.pinCode}
									</p>
								)}
							</div>
						</div>

						{/* Bank Details */}
						<div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
							<h1 className='col-span-full text-lg sm:text-[20px] font-semibold text-[#716F6F] mb-2'>
								Bank Details
							</h1>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Bank Name
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.bank_name
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.bank_name}
									onChange={(e) =>
										handleInputChange('bank_name', e.target.value)
									}
								/>
								{validationErrors.bank_name && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.bank_name}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Branch
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.bank_branch
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.bank_branch}
									onChange={(e) =>
										handleInputChange('bank_branch', e.target.value)
									}
								/>
								{validationErrors.bank_branch && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.bank_branch}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Bank IFSC *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.bank_IFSC
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.bank_IFSC}
									onChange={(e) =>
										handleInputChange('bank_IFSC', e.target.value)
									}
								/>
								{validationErrors.bank_IFSC && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.bank_IFSC}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Bank Account Number *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.bank_account_number
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.bank_account_number}
									onChange={(e) =>
										handleInputChange('bank_account_number', e.target.value)
									}
								/>
								{validationErrors.bank_account_number && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.bank_account_number}
									</p>
								)}
							</div>
						</div>

						{/* Salary Structure */}
						<div className='grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4'>
							<h1 className='col-span-full text-lg sm:text-[20px] font-semibold text-[#716F6F] mb-2'>
								Salary Structure
							</h1>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Monthly Basic *
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.monthly_Basic
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.monthly_Basic}
									onChange={(e) =>
										handleInputChange('monthly_Basic', e.target.value)
									}
								/>
								{validationErrors.monthly_Basic && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.monthly_Basic}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									HRA
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.HRA ? 'border-red-500' : 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.HRA}
									onChange={(e) => handleInputChange('HRA', e.target.value)}
								/>
								{validationErrors.HRA && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.HRA}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Conveyance
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.Conveyance
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.Conveyance}
									onChange={(e) =>
										handleInputChange('Conveyance', e.target.value)
									}
								/>
								{validationErrors.Conveyance && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.Conveyance}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Travel Allowance
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.Travel_allowance
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.Travel_allowance}
									onChange={(e) =>
										handleInputChange('Travel_allowance', e.target.value)
									}
								/>
								{validationErrors.Travel_allowance && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.Travel_allowance}
									</p>
								)}
							</div>

							<div className='space-y-1'>
								<label
									style={{ ...FONTS.heading_08, color: COLORS.gray_dark_02 }}
									className='text-xs sm:text-sm'
								>
									Home Allowance
								</label>
								<Input
									className={`w-full h-9 sm:h-10 border ${
										validationErrors.Home_allowance
											? 'border-red-500'
											: 'border-[#716F6F]'
									} focus:border-[#716F6F] focus:outline-none text-sm sm:text-base`}
									value={newStaff.Home_allowance}
									onChange={(e) =>
										handleInputChange('Home_allowance', e.target.value)
									}
								/>
								{validationErrors.Home_allowance && (
									<p className='text-red-500 text-xs mt-1'>
										{validationErrors.Home_allowance}
									</p>
								)}
							</div>
						</div>
					</div>

					<div className='flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 mt-6'>
						<Button
							className='border border-[#1BBFCA] bg-[#1BBFCA]/10 text-[#1BBFCA] w-full sm:w-auto h-9 sm:h-10 text-sm sm:text-base'
							variant='outline'
							onClick={() => {
								setShowAddStaff(false);
								setValidationErrors({});
							}}
						>
							Back
						</Button>
						<Button
							className='bg-[#1BBFCA] hover:bg-teal-600 text-white w-full sm:w-auto h-9 sm:h-10 text-sm sm:text-base'
							onClick={handleAddStaff}
						>
							Submit
						</Button>
					</div>
				</Card>
			) : (
				// ... rest of the component remains the same
				<>
					{/* Existing staff list and filter code remains unchanged */}
					<div className='flex flex-col sm:flex-row items-center justify-between p-3 sm:p-4 gap-3'>
						<Button
							onClick={() => setShowFilter(!showFilter)}
							className={`gap-2 w-full sm:w-auto ${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border} h-9 sm:h-10 text-sm sm:text-base`}
						>
							<Filter size={16} />
							Show Filter
						</Button>
						<Button
							onClick={() => setShowAddStaff(true)}
							className={`gap-2 w-full sm:w-auto ${theme.primary.bg} ${theme.primary.text} ${theme.primary.hover.bg} border ${theme.primary.border} ${theme.primary.hover.border} h-9 sm:h-10 text-sm sm:text-base`}
						>
							<Plus size={16} />
							Add New Staff
						</Button>
					</div>

					{showFilter && (
						<Card className='grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 p-3 sm:p-4 mx-1 sm:mx-2 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]'>
							<div className='space-y-2'>
								<Label
									style={{ color: COLORS.gray_dark_02 }}
									htmlFor='status'
									className='text-sm'
								>
									Status
								</Label>
								<Select value={statusFilter} onValueChange={setStatusFilter}>
									<SelectTrigger className='w-full h-9 sm:h-10 border border-[#716F6F] text-sm sm:text-base'>
										<SelectValue placeholder=' ' />
									</SelectTrigger>
									<SelectContent className='bg-white'>
										<SelectItem
											value='all'
											className='hover:bg-[#1BBFCA] cursor-pointer'
										>
											All
										</SelectItem>
										<SelectItem
											value='Active'
											className='hover:bg-[#1BBFCA] cursor-pointer'
										>
											Active
										</SelectItem>
										<SelectItem
											value='Inactive'
											className='hover:bg-[#1BBFCA] cursor-pointer'
										>
											Inactive
										</SelectItem>
									</SelectContent>
								</Select>
							</div>
							<div className='space-y-2'>
								<Label
									style={{ color: COLORS.gray_dark_02 }}
									htmlFor='course'
									className='text-sm'
								>
									Course
								</Label>
								<Select value={courseFilter} onValueChange={setCourseFilter}>
									<SelectTrigger className='w-full h-9 sm:h-10 border border-[#716F6F] text-sm sm:text-base'>
										<SelectValue placeholder=' ' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem
											value='all'
											className='hover:bg-[#1BBFCA] cursor-pointer'
										>
											All Courses
										</SelectItem>
										{courseData?.map((course: any) => (
											<SelectItem
												key={course._id}
												value={course.course_name}
												className='hover:bg-[#1BBFCA] cursor-pointer'
											>
												{course.course_name}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</Card>
					)}

					<div className='w-full grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-3 sm:gap-4'>
						{loading
							? [...Array(6)].map((_, index) => (
									<ContentLoader
										speed={1}
										width='100%'
										height='100%'
										backgroundColor='#f3f3f3'
										foregroundColor='#ecebeb'
										className='w-full h-[280px] sm:h-[310px] p-3 sm:p-4 rounded-2xl border shadow-md'
										key={index}
									>
										<rect x='0' y='0' rx='6' ry='6' width='80' height='20' />
										<rect x='200' y='0' rx='6' ry='6' width='60' height='20' />
										<rect
											x='0'
											y='32'
											rx='10'
											ry='10'
											width='100%'
											height='100'
										/>
										<rect x='0' y='150' rx='6' ry='6' width='60%' height='16' />
										<rect x='0' y='180' rx='4' ry='4' width='60' height='14' />
										<rect
											x='200'
											y='180'
											rx='4'
											ry='4'
											width='50'
											height='16'
										/>
										<rect x='0' y='210' rx='6' ry='6' width='80' height='28' />
										<rect
											x='180'
											y='210'
											rx='6'
											ry='6'
											width='70'
											height='28'
										/>
									</ContentLoader>
							  ))
							: filteredStaff.map((member: any) => (
									<Card
										key={member?.id}
										className='w-full m-1 sm:m-2 bg-white rounded-xl border border-gray-100 transition-shadow duration-200 shadow-[0_0_15px_rgba(0,0,0,0.1)] hover:shadow-[0_0_20px_rgba(0,0,0,0.15)]'
									>
										<div className='divide-y'>
											<div className='p-3 sm:p-4'>
												<div className='flex items-center gap-3'>
													<Avatar className='!w-[60px] !h-[60px] sm:!w-[80px] sm:!h-[80px]'>
														<AvatarImage
															src={GetImageUrl(member?.image) ?? undefined}
															alt={member?.full_name}
														/>
													</Avatar>
													<h3
														style={{
															...FONTS.heading_02,
															color: COLORS.gray_dark_02,
														}}
														className='text-sm sm:text-base font-semibold truncate'
													>
														{member.full_name}
													</h3>
												</div>
												<div className='flex items-center gap-2 my-2 sm:my-3 text-muted-foreground'>
													<Mail size={14} className='sm:w-4 sm:h-4' />
													<span
														style={{
															...FONTS.heading_06,
															color: COLORS.gray_dark_02,
														}}
														className='text-xs sm:text-sm truncate'
													>
														{member.email}
													</span>
												</div>
												<div className='flex items-center justify-between mb-3 sm:mb-4 bg-white'>
													<span
														style={{
															...FONTS.heading_07,
															color: COLORS.gray_dark_02,
														}}
														className='text-xs sm:text-sm'
													>
														Status
													</span>
													<Select
														value={member?.is_active ? 'Active' : 'Inactive'}
														onValueChange={() =>
															toggleStatus(member.uuid, !member?.is_active)
														}
													>
														<SelectTrigger
															className={`gap-2 w-[100px] sm:w-[120px] bg-white text-xs sm:text-sm h-8 sm:h-9 ${getStatusButtonStyle(
																member.is_active ? 'Active' : 'Inactive'
															)}`}
														>
															<SelectValue
																placeholder={
																	member?.is_active ? 'Active' : 'Inactive'
																}
															/>
														</SelectTrigger>
														<SelectContent className='bg-[#1BBFCA]'>
															<SelectItem
																value='Active'
																className='focus:bg-white cursor-pointer text-xs sm:text-sm'
															>
																Active
															</SelectItem>
															<SelectItem
																value='Inactive'
																className='focus:bg-white cursor-pointer text-xs sm:text-sm'
															>
																Inactive
															</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<Button
													onClick={() => handleProfile(member)}
													className={`w-full bg-[#0400ff] ${theme.primary.text} h-8 sm:h-9 text-xs sm:text-sm`}
												>
													View Profile
												</Button>
											</div>
										</div>
									</Card>
							  ))}
					</div>

					{!loading && filteredStaff.length === 0 && (
						<div className='p-6 sm:p-8 text-center text-muted-foreground col-span-full'>
							<p className='text-sm sm:text-base'>No staff members found.</p>
							<p className='text-xs sm:text-sm mt-1'>
								Click "Add New Staff" to get started.
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default TeachingStaffs;
