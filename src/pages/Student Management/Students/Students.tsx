import type React from 'react';
import { useEffect, useState } from 'react';
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
import { selectStudent } from '../../../features/StudentManagement/reducer/selector';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import { GetImageUrl } from '../../../utils/helper';
import { createstudentdata } from '../../../features/StudentManagement/services/Student';

const Students = () => {
	const [showFilters, setShowFilters] = useState(false);
	const [showAddStudent, setShowAddStudent] = useState(false);
	const [courseFilter, setCourseFilter] = useState('');
	const [batchFilter, setBatchFilter] = useState('');
	const [statusFilter, setStatusFilter] = useState('');
	const [searchInput, setSearchInput] = useState('');
	const navigate = useNavigate();

	// State for the new student form
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

	const handleFileUpload = (file: File) => {
		// Check file type
		if (!['image/jpeg', 'image/png'].includes(file.type)) {
			alert('Only JPEG and PNG files are allowed');
			return;
		}

		// Check file size (2MB max)
		if (file.size > 2 * 1024 * 1024) {
			alert('File size must be less than 2MB');
			return;
		}

		setNewStudentForm((prev) => ({ ...prev, image: file }));
	};

	const toggleFilters = () => setShowFilters(!showFilters);
	const toggleAddStudent = () => setShowAddStudent(!showAddStudent);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, value } = e.target;
		setNewStudentForm((prev) => ({ ...prev, [id]: value }));
	};

	const handleAddNewStudent = () => {
		const payload = {
			first_name: newStudentForm.first_name,
			last_name: newStudentForm.last_name,
			email: newStudentForm.email,
			dob: newStudentForm.dob,
			gender: newStudentForm.gender,
			qualification: newStudentForm.qualification,
			course: '1958e331-84ce-464b-8865-eb06c6189414',
			contact_info: {
				address1: newStudentForm.address1,
				address2: newStudentForm.address2,
				city: newStudentForm.city,
				state: newStudentForm.state,
				pincode: newStudentForm.pincode,
				phone_number: newStudentForm.phone_number,
				alternate_phone_number: newStudentForm.alternate_phone_number,
			},

			branch_id: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
			institute_id: '973195c0-66ed-47c2-b098-d8989d3e4529',
			type: 'payment',
		};

		console.log('Submitting payload:', payload);

		dispatch(createstudentdata(payload))
			.unwrap()
			.then(() => {
				// Reset form and close modal on success
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
					image: null as File | string | null,
				});
				setShowAddStudent(false);
				// Refresh student list
				fetchStudentManagement();
			})
			.catch((error: any) => {
				console.error('Error adding student:', error);
			});
	};

	const studentData = useSelector(selectStudent);
	const dispatch = useDispatch<any>();

	const fetchStudentManagement = () => {
		dispatch(
			getStudentmanagement({
branch_id: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
page: 1,
			})
		);
	};

	useEffect(() => {
		fetchStudentManagement();
	}, []);

	const formatStudentData = (data: any) => {
		if (!data || !data.data) return [];

		return data.data.map((student: any) => ({
			id: student._id,
			name: student.full_name || `${student.first_name} ${student.last_name}`,
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

	if (showAddStudent) {
		return (
			<div className='p-6'>
				<Card className='mb-6 shadow-md'>
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
							className='border-2  border-gray-300 rounded-lg p-12 text-center cursor-pointer hover:border-[#1BBFCA] transition-colors relative'
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
								onChange={(e) => {
									if (e.target.files && e.target.files.length > 0) {
										handleFileUpload(e.target.files[0]);
									}
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
										onClick={(e) => {
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
								First Name
							</label>
							<Input
								id='first_name'
								value={newStudentForm.first_name}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
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
						<div className='space-y-2'>
							<label htmlFor='branch' className='text-[16px] font-medium'>
								Select Branch
							</label>
							<Input
								id='branch'
								value={newStudentForm.branch}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='course' className='text-[16px] font-medium'>
								Select Course
							</label>
							<Input
								id='course'
								value={newStudentForm.course}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
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
						<div className='space-y-2'>
							<label htmlFor='address1' className='text-[16px] font-medium'>
								Address Line 1
							</label>
							<Input
								id='address1'
								value={newStudentForm.address1}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='address2' className='text-[16px] font-medium'>
								Address Line 2
							</label>
							<Input
								id='address2'
								value={newStudentForm.address2}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='city' className='text-[16px] font-medium'>
								City
							</label>
							<Input
								id='city'
								value={newStudentForm.city}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='state' className='text-[16px] font-medium'>
								State
							</label>
							<Input
								id='state'
								value={newStudentForm.state}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='pincode' className='text-[16px] font-medium'>
								Pin Code
							</label>
							<Input
								id='pincode'
								value={newStudentForm.pincode}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
						<div className='space-y-2'>
							<label htmlFor='phone_number' className='text-[16px] font-medium'>
								Phone Number
							</label>
							<Input
								id='phone_number'
								value={newStudentForm.phone_number}
								onChange={handleInputChange}
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
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
								className='w-full h-10 border border-gray-300 placeholder:text-gray-500 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 focus-visible:ring-0 focus-visible:border-gray-400 text-[18px]'
							/>
						</div>
					</CardContent>
					<CardFooter className='flex justify-end mt-4 space-x-3'>
						<Button
							onClick={toggleAddStudent}
							className='bg-[#1BBFCA]/10 text-[#1BBFCA] hover:bg-[#1BBFCA]/10 pr-16px pl-16px'
						>
							Cancel
						</Button>
						<Button
							onClick={handleAddNewStudent}
							className='bg-[#1BBFCA] text-white hover:bg-[#1BBFCA]/90 pr-16px pl-16px'
						>
							Add Student
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	return (
		<div className='p-6'>
			<div className='flex justify-between items-center mb-4'>
				<h4 className='text-[24px] font-semibold'>Student</h4>
			</div>

			<div className='flex justify-between items-center mb-4'>
				<Button
					variant='outline'
					className='px-4 py-2 pr-16px pl-16px w-[153px] h-[48px] bg-[#1BBFCA] text-white text-[16px] hover:bg-[#1BBFCA]/90 flex items-center gap-2'
					onClick={toggleFilters}
				>
					<FaSlidersH className='text-white text-[18px]' />
					{showFilters ? 'Hide Filter' : 'Show Filter'}
				</Button>

				<Button
					className='px-4 py-2 pr-16px pl-16px w-[205px] h-[48px] bg-[#1BBFCA] text-white text-[16px] hover:bg-[#1BBFCA]/90 flex items-center gap-2'
					onClick={toggleAddStudent}
				>
					<BsPlusLg className='text-white text-[18px]' />
					Add New Student
				</Button>
			</div>

			{showFilters && (
				<div className='bg-white p-6 rounded-lg shadow-lg mb-6 space-y-6 border border-gray-200'>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-2'>
							<label className='text-[16px] font-medium text-gray-700'>
								Filter by Course
							</label>
							<Select value={courseFilter} onValueChange={setCourseFilter}>
								<SelectTrigger className='w-full h-10 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150'>
									<SelectValue className='text-gray-500' />
								</SelectTrigger>
								<SelectContent className='border-gray-300 shadow-md bg-white'>
									<SelectItem value='web-dev'>Web Development</SelectItem>
									<SelectItem value='data-science'>Data Science</SelectItem>
									<SelectItem value='mobile-dev'>Mobile Development</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<label className='text-[16px] font-medium text-gray-700'>
								Filter by Batches
							</label>
							<Select value={batchFilter} onValueChange={setBatchFilter}>
								<SelectTrigger className='w-full h-10 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150'>
									<SelectValue className='text-gray-500' />
								</SelectTrigger>
								<SelectContent className='border-gray-300 shadow-md bg-white'>
									<SelectItem value='2023'>2023</SelectItem>
									<SelectItem value='2022'>2022</SelectItem>
									<SelectItem value='2021'>2021</SelectItem>
								</SelectContent>
							</Select>
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
						<div className='space-y-2'>
							<label className='text-[16px] font-medium text-gray-700'>
								Filter by Status
							</label>
							<Select value={statusFilter} onValueChange={setStatusFilter}>
								<SelectTrigger className='w-full h-10 border border-gray-300 hover:border-gray-400 focus:border-gray-400 focus:outline-none focus:ring-0 transition duration-150'>
									<SelectValue className='text-gray-500' />
								</SelectTrigger>
								<SelectContent className='border-gray-300 shadow-md bg-white'>
									<SelectItem value='active'>Active</SelectItem>
									<SelectItem value='inactive'>Inactive</SelectItem>
									<SelectItem value='completed'>Completed</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className='space-y-2'>
							<div className='text-sm font-medium text-transparent select-none'>
								Hidden Label
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

			<div className='grid grid-cols-3 justify-around overflow-x-auto gap-5 pb-4'>
				{formattedStudents.map((student, index) => (
					<Card
						key={index}
						className='min-w-[380px] max-w-[300px] flex-shrink-0 shadow-md cursor-pointer hover:shadow-lg transition-shadow'
						onClick={() => handleStudentClick(student)}
					>
						<CardContent className='p-4'>
							<div className='flex justify-center mb-4'>
								<Avatar className='h-20 w-20 rounded-lg'>
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

						<CardFooter className='flex justify-center gap-[30px] items-center px-4 pb-4'>
							<img className='w-8 h-8' src={call} alt='Call' />
							<img className='w-8 h-8' src={msg} alt='Message' />
							<img className='w-8 h-8' src={person} alt='Profile' />
							<img className='w-8 h-8' src={send} alt='Send' />
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
};

export default Students;
