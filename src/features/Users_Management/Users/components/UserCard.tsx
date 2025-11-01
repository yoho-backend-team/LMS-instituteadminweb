import React, { useState, useMemo, useEffect } from 'react';
import { COLORS, FONTS } from '../../../../constants/uiConstants';
import card1 from '../../../../assets/profileion1.png';
import card2 from '../../../../assets/Frame 5825blue.png';
import card3 from '../../../../assets/cardimg3.png';
import card4 from '../../../../assets/Frame 5825green.png';
import filterIcon from '../../../../assets/SHFilter.png';
import addIcon from '../../../../assets/Add.png';
import { Input } from '../../../../components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../../../../components/ui/select';
import { ChevronDownIcon } from 'lucide-react';
import AddForm from './AddForm';
import UsersList from './UsersList';

type User = {
	first_name?: string;
	last_name?: string;
	email?: string;
	is_active?: boolean;
	role?: { identity?: string };
};

type Props = {
	Users: User[];
	loading: boolean;
	fetchUser: () => void;
};

const UserCard: React.FC<Props> = React.memo(
	({ Users, loading, fetchUser }) => {
		const [showForm, setShowForm] = useState(false);
		const [showFilter, setShowFilter] = useState(false);
		const [searchQuery, setSearchQuery] = useState('');
		const [statusFilter, setStatusFilter] = useState('');
		const [roleFilter, setRoleFilter] = useState('');

		// Unique roles list for dropdown
		const roles = useMemo(() => {
			const roleSet = new Set(
				Users.map((u) => u.role?.identity).filter(Boolean)
			);
			return Array.from(roleSet);
		}, [Users]);

		const toggleFilter = () => setShowFilter(!showFilter);

		useEffect(() => {
			fetchUser();
		}, [showForm]);

		// Filtered Users
		const filteredUsers = useMemo(() => {
			return Users.filter((u) => {
				const name = `${u.first_name ?? ''} ${u.last_name ?? ''}`.toLowerCase();
				const email = u.email?.toLowerCase() ?? '';
				const matchesSearch =
					name.includes(searchQuery.toLowerCase()) ||
					email.includes(searchQuery.toLowerCase());

				const matchesStatus =
					!statusFilter ||
					(statusFilter === 'active' && u.is_active) ||
					(statusFilter === 'inactive' && !u.is_active);

				const matchesRole =
					!roleFilter ||
					u.role?.identity?.toLowerCase() === roleFilter.toLowerCase();

				return matchesSearch && matchesStatus && matchesRole;
			});
		}, [Users, searchQuery, statusFilter, roleFilter]);

		// Stats
		const totalUsers = Users.length;
		const activeUsers = Users.filter((u) => u.is_active).length;
		const blockedUsers = Users.filter((u) => !u.is_active).length;

		const resetFilters = () => {
			setSearchQuery('');
			setStatusFilter('');
			setRoleFilter('');
		};

		return (
			<div className='grid gap-6'>
				{/* ==== Top Cards Section ==== */}
				<div className='grid gap-5 p-1.5'>
					<h1
						className={`text-xl md:text-2xl text-[${COLORS.gray_dark_01}]`}
						style={{ ...FONTS.heading_05_bold }}
					>
						Admin Users
					</h1>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
						{/* Total Users */}
						<div className='rounded-[12px] grid gap-2 bg-[#EA745F]/20 pr-3 pb-3'>
							<div
								className='flex items-center'
								style={{ ...FONTS.heading_05 }}
							>
								<img
									src={card3}
									className='w-[80px] h-[80px]'
									alt='Total Users'
								/>
								<h3 className={`text-lg text-[${COLORS.gray_dark_02}] ml-3`}>
									Total Users
								</h3>
							</div>
							<h1
								className={`text-3xl text-[${COLORS.gray_light}] font-semibold text-right pr-4`}
							>
								{totalUsers}
							</h1>
						</div>

						{/* Total Groups */}
						<div className='rounded-[12px] grid gap-2 bg-[#6454E2]/20 pr-3 pb-3'>
							<div
								className='flex items-center'
								style={{ ...FONTS.heading_05 }}
							>
								<img
									src={card2}
									className='w-[80px] h-[80px]'
									alt='Total Groups'
								/>
								<h3 className={`text-lg text-[${COLORS.gray_dark_02}] ml-3`}>
									Total Groups
								</h3>
							</div>
							<h1
								className={`text-3xl text-[${COLORS.gray_light}] font-semibold text-right pr-4`}
							>
								0
							</h1>
						</div>

						{/* Active Users */}
						<div className='rounded-[12px] grid gap-2 bg-[#D7F6F5] pr-3 pb-3'>
							<div
								className='flex items-center'
								style={{ ...FONTS.heading_05 }}
							>
								<img
									src={card1}
									className='w-[80px] h-[80px]'
									alt='Active Users'
								/>
								<h3 className={`text-lg text-[${COLORS.gray_dark_02}] ml-3`}>
									Active Users
								</h3>
							</div>
							<h1
								className={`text-3xl text-[${COLORS.gray_light}] font-semibold text-right pr-4`}
							>
								{activeUsers}
							</h1>
						</div>

						{/* Blocked Users */}
						<div className='rounded-[12px] grid gap-2 bg-[#DEF6D7] pr-3 pb-3'>
							<div
								className='flex items-center'
								style={{ ...FONTS.heading_05 }}
							>
								<img
									src={card4}
									className='w-[80px] h-[80px]'
									alt='Blocked Users'
								/>
								<h3 className={`text-lg text-[${COLORS.gray_dark_02}] ml-3`}>
									Blocked Users
								</h3>
							</div>
							<h1
								className={`text-3xl text-[${COLORS.gray_light}] font-semibold text-right pr-4`}
							>
								{blockedUsers}
							</h1>
						</div>
					</div>
				</div>

				{/* ==== Filter Section ==== */}
				<div className='grid gap-5'>
					<div className='flex flex-col sm:flex-row justify-between gap-3'>
						<button
							onClick={toggleFilter}
							className='bg-[#1BBFCA] text-white px-4 h-[45px] rounded-[8px] flex items-center justify-center gap-2'
						>
							<img
								src={filterIcon}
								className='w-[18px] h-[18px]'
								alt='Filter'
							/>
							{showFilter ? 'Hide Filter' : 'Show Filter'}
						</button>

						<button
							onClick={() => setShowForm(true)}
							className='bg-[#1BBFCA] px-4 h-[45px] rounded-[8px] flex items-center justify-center gap-2 text-white'
						>
							<img src={addIcon} className='w-[18px] h-[18px]' alt='Add' />
							Add User
						</button>
					</div>

					{showFilter && (
						<div className='grid gap-4 p-4 shadow-[0px_4px_20px_rgba(0,0,0,0.25)] rounded-[12px]'>
							{/* Search */}
							<Input
								value={searchQuery}
								onChange={(e) => setSearchQuery(e.target.value)}
								className={`border-2 border-[${COLORS.primary}] h-[45px]`}
								placeholder='Search by name or email...'
							/>

							<div className='flex flex-col sm:flex-row gap-4'>
								{/* Status Filter */}
								<div className='w-full'>
									<label className='font-semibold text-sm text-gray-700'>
										Status
									</label>
									<Select
										value={statusFilter}
										onValueChange={(v) => setStatusFilter(v)}
									>
										<SelectTrigger className='w-full h-[45px] border rounded-[8px] px-3'>
											<SelectValue placeholder='Select Status' />
											<ChevronDownIcon className='size-4 opacity-50 text-[#716F6F]' />
										</SelectTrigger>
										<SelectContent className='bg-white border p-2 rounded-[8px]'>
											<SelectItem value='active'>Active</SelectItem>
											<SelectItem value='inactive'>Inactive</SelectItem>
										</SelectContent>
									</Select>
								</div>

								{/* Role Filter */}
								<div className='w-full'>
									<label className='font-semibold text-sm text-gray-700'>
										Role
									</label>
									<Select
										value={roleFilter}
										onValueChange={(v) => setRoleFilter(v)}
									>
										<SelectTrigger className='w-full h-[45px] border rounded-[8px] px-3'>
											<SelectValue placeholder='Select Role' />
											<ChevronDownIcon className='size-4 opacity-50 text-[#716F6F]' />
										</SelectTrigger>
										<SelectContent className='bg-white border p-2 rounded-[8px]'>
											{roles.length > 0 ? (
												roles.map((role: any) => (
													<SelectItem key={role} value={role}>
														{role}
													</SelectItem>
												))
											) : (
												<SelectItem disabled value='none'>
													No roles available
												</SelectItem>
											)}
										</SelectContent>
									</Select>
								</div>
							</div>

							{/* Reset Filter */}
							<div className='flex items-center justify-end'>
								<button
									onClick={resetFilters}
									className='bg-red-600 hover:bg-red-400 text-white px-4 py-2 rounded-[8px] w-fit text-sm font-medium'
								>
									Reset Filters
								</button>
							</div>
						</div>
					)}
				</div>

				<div>
					<UsersList
						Users={filteredUsers}
						loading={loading}
						fetchUser={fetchUser}
					/>
				</div>

				{/* Add User Form Drawer */}
				{showForm && (
					<div className='fixed inset-0 bg-black/30 backdrop-blur-sm z-40'>
						<div
							className={`fixed top-0 right-0 rounded-l-[8px] overflow-y-auto h-full w-full sm:w-[90vw] md:w-[500px] lg:w-[450px] xl:w-[400px] bg-white shadow-lg transition-transform duration-300 z-50`}
						>
							<AddForm setShowForm={setShowForm} />
						</div>
					</div>
				)}
			</div>
		);
	}
);

export default UserCard;
