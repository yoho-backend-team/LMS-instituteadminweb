import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BsPlusLg, BsSliders } from 'react-icons/bs';
import CustomDropdown from '../../../components/ContentMangement/Notes/CoustomDropdown/CustomDropdown';
import AddNotes from '../../../components/ContentMangement/Notes/AddNotes';
import NoteCard from '../../../components/ContentMangement/Notes/NotesCards';
import EditNotes from '../../../components/ContentMangement/Notes/EditNotes';
import ViewNoteModal from '../../../components/ContentMangement/Notes/Viewnotes';
import {
	fetchNotesThunk,
	createNoteThunk,
	updateNoteThunk,
	deleteNoteThunk,
	UpdateModuleStatusThunk,
} from '../../../features/ContentMangement/Notes/Reducer/noteThunk';
import {
	selectNote,
	selectLoading,
} from '../../../features/ContentMangement/Notes/Reducer/selectors';
import toast from 'react-hot-toast';
import ContentLoader from 'react-content-loader';

const statusfilteroption = ['Active', 'InActive'];
const courseOptions = ['Course 1', 'Course 2'];

const Notes = () => {
	const dispatch = useDispatch<any>();
	const notes = useSelector(selectNote);
	const [showFilter, setShowFilter] = useState(false);
	const [openIndex, setOpenIndex] = useState<number | null>(null);
	const [showPanel, setShowPanel] = useState(false);
	const [selectedStatus, setSelectedStatus] = useState('');
	const [selectedCourse, setSelectedCourse] = useState('');
	const [editNote, setEditNote] = useState<any>(null);
	const [viewNote, setViewNote] = useState<any>(null);
	const [deleteModal, setDeleteModal] = useState<{
		isOpen: boolean;
		noteId: string | null;
	}>({
		isOpen: false,
		noteId: null,
	});
	const panelRef = useRef<HTMLDivElement>(null);
	const loading = useSelector(selectLoading);
	const [toggleStatusMap, setToggleStatusMap] = useState<{
		[key: string]: boolean;
	}>({});

	const fetchAllNotes = async () => {
		try {
			const params = {
				branch: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
				page: 1,
			};
			dispatch(fetchNotesThunk(params));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		fetchAllNotes();
	}, [dispatch]);

	const handleToggleStatus = (id: string, currentStatus: boolean) => {
		const newStatus = !currentStatus;

		setToggleStatusMap((prev) => ({
			...prev,
			[id]: newStatus,
		}));

		dispatch(
			UpdateModuleStatusThunk({
				id,
				is_active: newStatus ? true : false,
			})
		);
	};

	const handleNoteSubmit = (data: any) => {
		if (editNote) {
			dispatch(updateNoteThunk(data))
				.then(() => toast.success('Note updated'))
				.catch(() => toast.error('Update failed'));
		} else {
			dispatch(createNoteThunk(data))
				.then(() => toast.success('Note added'))
				.catch(() => toast.error('Add failed'));
		}
		fetchAllNotes();
		setEditNote(null);
		setShowPanel(false);
	};

	const handleEditClick = (note: any) => {
		setEditNote(note);
		setShowPanel(true);
		setShowFilter(false);
		setOpenIndex(null);
	};

	const handleDeleteClick = (noteId: string) => {
		setDeleteModal({
			isOpen: true,
			noteId,
		});
	};

	const handleConfirmDelete = async () => {
		if (!deleteModal.noteId) return;

		try {
			await dispatch(deleteNoteThunk(deleteModal.noteId));
			setShowFilter(false);
			setOpenIndex(null);
			toast.success('Notes deleted successfully');
		} catch (error) {
			toast.error('Failed to delete note');
		} finally {
			setDeleteModal({
				isOpen: false,
				noteId: null,
			});
		}
	};

	const handleCancelDelete = () => {
		setDeleteModal({
			isOpen: false,
			noteId: null,
		});
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				panelRef.current &&
				!panelRef.current.contains(event.target as Node)
			) {
				setShowPanel(false);
				setEditNote(null);
			}
		};

		if (showPanel) {
			document.addEventListener('mousedown', handleClickOutside);
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showPanel]);

	return (
		<div className='relative flex flex-col gap-6'>
			{/* Delete Confirmation Modal */}
			{deleteModal.isOpen && (
				<div className='fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm'>
					<div className='bg-white rounded-lg shadow-xl p-6 max-w-sm w-full mx-auto'>
						<div className='flex flex-col gap-4'>
							<h3 className='text-lg font-semibold text-gray-800 text-center'>
								Confirm Deletion
							</h3>
							<p className='text-gray-600 text-center'>
								Are you sure you want to delete this note?
							</p>
							<div className='flex flex-row xs:flex-col justify-center gap-3 mt-4'>
								<button
									className='px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors duration-200 text-sm font-medium w-full xs:w-auto min-w-[100px]'
									onClick={handleCancelDelete}
								>
									Cancel
								</button>
								<button
									className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors duration-200 text-sm font-medium w-full xs:w-auto min-w-[100px]'
									onClick={handleConfirmDelete}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* Side panel */}
			{showPanel && (
				<div
					className='fixed inset-0 z-50 flex justify-end items-center backdrop-blur-sm'
					onClick={() => {
						setShowPanel(false);
						setEditNote(null);
					}}
				>
					<div
						ref={panelRef}
						className='bg-white shadow-xl rounded-xl w-[500px] max-w-[95%] h-[95vh]'
						onClick={(e) => e.stopPropagation()}
					>
						{editNote ? (
							<EditNotes
								noteData={editNote}
								onClose={() => {
									setShowPanel(false);
									setEditNote(null);
								}}
								onSubmit={handleNoteSubmit}
							/>
						) : (
							<AddNotes
								onClose={() => {
									setShowPanel(false);
									setEditNote(null);
								}}
								onSubmit={handleNoteSubmit}
							/>
						)}
					</div>
				</div>
			)}

			{/* Top bar */}
			<div className='flex flex-col sm:flex-row md:justify-between sm:justify-start md:items-center gap-3 w-full'>
				{/* Filter Button */}
				<button
					onClick={() => setShowFilter((prev) => !prev)}
					className='bg-[#1BBFCA] text-white py-3 px-4 rounded-xl flex gap-2 items-center justify-center transition-all hover:bg-[#19acc7] active:scale-95 flex-1 sm:w-auto shadow-md hover:shadow-lg md:max-w-[200px]'
				>
					<BsSliders className='text-lg flex-shrink-0' />
					<span className='text-sm font-medium whitespace-nowrap'>
						{showFilter ? 'Hide Filter' : 'Show Filter'}
					</span>
				</button>

				{/* Add New Note Button */}
				<button
					onClick={() => {
						setEditNote(null);
						setShowPanel(true);
						setShowFilter(false);
					}}
					className='bg-[#1BBFCA] text-white py-3 px-4 rounded-xl flex gap-2 items-center justify-center transition-all hover:bg-[#19acc7] active:scale-95 flex-1 sm:w-auto shadow-md hover:shadow-lg md:max-w-[200px]'
				>
					<BsPlusLg className='text-lg flex-shrink-0' />
					<span className='text-sm font-medium whitespace-nowrap'>
						Add New Note
					</span>
				</button>
			</div>

			{/* Filters */}
			{showFilter && (
				<div className='flex flex-col sm:flex-row gap-4 sm:gap-5 bg-white p-4 sm:p-2 rounded-lg shadow-lg'>
					<div className='w-full sm:flex-1 p-1 flex flex-col gap-2'>
						<label className='text-[#716F6F] font-medium text-sm sm:text-base'>
							Status
						</label>
						<CustomDropdown
							options={statusfilteroption}
							value={selectedStatus}
							onChange={setSelectedStatus}
							placeholder='Select Status'
							width='w-full'
						/>
					</div>
					<div className='w-full sm:flex-1 p-1 flex flex-col gap-2'>
						<label className='text-[#716F6F] font-medium text-sm sm:text-base'>
							Courses
						</label>
						<CustomDropdown
							options={courseOptions}
							value={selectedCourse}
							onChange={setSelectedCourse}
							placeholder='Select Course'
							width='w-full'
						/>
					</div>
				</div>
			)}

			{/* Notes Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
				{loading ? (
					<div className='grid grid-cols-1 md:grid-cols-3 mt-4 gap-5 col-span-3'>
						{[...Array(6)].map((_, index) => (
							<ContentLoader
								speed={1}
								width='100%'
								height='100%'
								backgroundColor='#f3f3f3'
								foregroundColor='#ecebeb'
								className='w-full h-[210px] p-4 rounded-2xl border shadow-md'
								key={index}
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
						))}
					</div>
				) : (
					notes.map((note: any, index: number) => (
						<NoteCard
							key={note.uuid || index}
							id={note.uuid}
							title={note.title}
							course={note.course}
							isActive={note.is_active}
							index={index}
							openIndex={openIndex}
							setOpenIndex={setOpenIndex}
							onEdit={() => handleEditClick(note)}
							onDelete={() => handleDeleteClick(note.uuid)}
							onView={() => setViewNote(note)}
							toggleStatusMap={toggleStatusMap}
							onToggleStatus={handleToggleStatus}
						/>
					))
				)}

				{/* View Modal */}
				{viewNote && (
					<ViewNoteModal
						isOpen={true}
						note={{
							title: viewNote.title,
							course: viewNote.course?.course_name ?? 'N/A',
							description: viewNote.description ?? '',
							file: viewNote.file instanceof File ? viewNote.file : undefined,
							fileName:
								typeof viewNote.fileName === 'string'
									? viewNote.fileName
									: undefined,
							status: viewNote.is_active ? 'Active' : 'Inactive',
						}}
						onClose={() => setViewNote(null)}
					/>
				)}
			</div>
		</div>
	);
};

export default Notes;
