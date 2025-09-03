
import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FiX, FiSend, FiArrowLeft } from 'react-icons/fi';
import chatbg from '../../../assets/navbar/chatbg.png';
import userblue from '../../../assets/navbar/userblue.png';
import { useTicketContext } from '../../../components/StudentTickets/TicketContext';
import { useDispatch, useSelector } from 'react-redux';
import { StudentTicketByID } from '../../../features/StudentTicket/Reducers/thunks';
import { selectStudentTicketById } from '../../../features/StudentTicket/Reducers/selectors';
import { GetImageUrl } from '../../../utils/helper';
import { updateStudentTicketService } from '../../../features/StudentTicket/Services';
import toast from 'react-hot-toast';
import { COLORS, FONTS } from '../../../constants/uiConstants';
import socket from '../../../utils/socket';
import { GetProfileDetail } from '../../../features/Auth/service';

interface Message {
	ticket_id: 'string';
	sender: 'user' | 'admin';
	text: string;
	time: string;
}
interface AdminProfile {
	_id: string;
	full_name?: string;
	[key: string]: any;
}

const TicketDetailsPage: React.FC = () => {
	const { id } = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const { tickets } = useTicketContext();
	const dispatch = useDispatch<any>();

	const ticketDataFromRedux = useSelector(selectStudentTicketById);
	const ticketFromState = location.state?.ticket;


	const ticketData = ticketFromState || ticketDataFromRedux;

	const ticketId = Number(id);
	const ticket = tickets.find((t) => t.id === ticketId);
	const status = ticket?.status ?? 'opened';
	const [adminProfile, SetAdminProfile] = useState<AdminProfile | null>(null);
	console.log(status)

	const updateStatus = async (newStatus: string) => {
		try {
			const data = {
				uuid: ticketData?.uuid,
				status: newStatus,
				user: ticketData?.user,
			};
			const response = await updateStudentTicketService(data);
			console.log(data, "sdfghjklkjhfdsasdfghjklkjhfdsdfgk")
			if (response) {
				fetchstudentTicketsById();
				Object.assign(ticketData, { status: newStatus });
				toast.success(`Ticket marked as ${newStatus}!`);
			} else {
				toast.error('Failed to update ticket status.');
			}
		} catch (error) {
			toast.error('Error updating ticket status.');
		}
	};



	const fetchstudentTicketsById = async () => {
		try {
			dispatch(StudentTicketByID({ uuid: id }));
		} catch (error) {
			console.log('Error fetching in tickets:', error);
		}
	};

	useEffect(() => {
		fetchstudentTicketsById();
	}, [dispatch]);

	const [messages, setMessages] = useState<Message[]>([]);
	const [inputValue, setInputValue] = useState('');
	const chatRef = useRef<HTMLDivElement>(null);

	const getProfile = async () => {
		const response = await GetProfileDetail();
		SetAdminProfile(response?.data);
	};

	useEffect(() => {
		if (ticketData?.messages) {
			setMessages(ticketData.messages);
		}
	}, [ticketData]);

	useEffect(() => {
		getProfile();
	}, []);

	const handleSend = () => {
		if (inputValue.trim() === '') return;

		const newMessage: any = {
			ticket_id: id,
			text: inputValue,
			senderType: 'InstituteAdmin',
			user: adminProfile?._id,
		};
		socket.emit('sendStudentTicketMessage', newMessage);
		setMessages((prev: any) => [
			...prev,
			{ sender: adminProfile?._id, content: inputValue, date: new Date() },
		]);
		setInputValue('');
	};

	useEffect(() => {
		socket.connect();
		socket.on('connect', () => {
			socket.emit('joinTicket', id);
		});

		const handleMessage = (message: Message) => {
			setMessages((prev) => [message, ...prev]);
		};

		socket.on('receiveStudentTicketMessage', handleMessage);
		return () => {
			socket.off('receiveStudentTicketMessage', handleMessage);
		};
	});

	useEffect(() => {
		if (chatRef.current) {
			chatRef.current.scrollTop = chatRef.current.scrollHeight;
		}
	}, [messages]);

	return (
		<div className='p-6 pt-0'>
			<div className='flex items-center justify-between mb-4'>
				<div className='flex items-center gap-4'>
					<button
						onClick={() => navigate(-1)}
						className='flex items-center gap-2 px-4 py-2 text-black rounded-md text-sm font-semibold'
					>
						<FiArrowLeft className='text-lg' />
					</button>
					<h1 style={{ ...FONTS.heading_05_bold, color: COLORS.gray_dark_01 }}>
						Student Ticket
					</h1>
				</div>
			</div>

			<div className='bg-white rounded-lg shadow-md p-4 flex justify-between items-center mb-6 border-t-4 border-[#14b8c6]'>
				<div className='flex items-center justify-between w-full'>
					<p style={{ ...FONTS.heading_07, color: COLORS.gray_dark_01 }}>
						TICKET ID :{' '}
						<span className='text-[#14b8c6]'>#{ticketData?.ticket_id}</span>
					</p>
					<p
						className='mt-1'
						style={{ ...FONTS.heading_07, color: COLORS.gray_dark_02 }}
					>
						RAISED DATE & TIME :{' '}
						<span className='font-medium'>
							{ticketData?.date
								? new Date(ticketData?.date).toLocaleDateString()
								: 'N/A'}{' '}
							&{' '}
							{ticketData?.date
								? new Date(ticketData?.date).toLocaleTimeString([], {
									hour: '2-digit',
									minute: '2-digit',
								})
								: 'N/A'}
						</span>
					</p>
				</div>
				{ticketData?.status !== 'closed' && (
					<button
						onClick={() => navigate(-1)}
						className='flex items-center ml-4 justify-center w-42 gap-2 px-2 py-3 bg-[#14b8c6] text-white rounded-md'
					>
						<FiX className='text-xl' />
						<p style={{ ...FONTS.heading_09 }}>CLOSE TICKET</p>
					</button>
				)}
			</div>

			<div className='flex flex-col lg:flex-row gap-6'>
				<div className='flex-1 flex flex-col gap-4 relative'>
					<div className='bg-white rounded-md border-t-2 shadow p-4'>
						<div className='flex items-center gap-3'>
							<img
								src={GetImageUrl(ticketData?.user?.image) ?? undefined}
								alt='User Avatar'
								className='w-12 h-12 rounded-full object-cover'
							/>
							<div>
								<h2 className='font-semibold text-gray-800 text-base'>
									{ticketData?.user?.full_name}
								</h2>
								<p className='text-green-600 text-sm'>
									{socket ? 'Active' : 'offline'}
								</p>
							</div>
						</div>
					</div>

					<div
						className='bg-white rounded-md shadow border-2 flex flex-col flex-1 relative'
						style={{ backgroundImage: `url(${chatbg})` }}
					>
						<div
							ref={chatRef}
							className='h-[300px] overflow-y-auto p-4 space-y-4 bg-no-repeat bg-cover bg-center'
						>
							{messages?.map((msg: any, idx: any) => (
								<div
									key={idx}
									className={`flex items-start gap-2 ${msg.sender === adminProfile?._id ? 'justify-end' : ''
										}`}
								>
									{msg?.sender === 'user' && (
										<img
											src={userblue}
											alt='User'
											className='w-12 h-12 rounded-full object-cover'
										/>
									)}
									<div
										className={`p-2 rounded shadow text-sm max-w-[75%] ${msg?.sender === adminProfile?._id
											? 'bg-[#14b8c6] text-white'
											: 'bg-white text-gray-800'
											}`}
									>
										{msg.content}
										<div
											className={`text-[10px] text-right mt-1 ${msg.sender === adminProfile?._id
												? 'text-white'
												: 'text-gray-500'
												}`}
										>
											{msg?.date
												? new Date(msg?.date).toLocaleTimeString([], {
													hour: '2-digit',
													minute: '2-digit',
												})
												: 'N/A'}
										</div>
									</div>
									{msg.sender === adminProfile?._id && (
										<img
											src={userblue}
											alt='Admin'
											className='w-12 h-12 rounded-full object-cover'
										/>
									)}
								</div>
							))}

							{ticketData?.status !== 'closed' && (
								<div className='flex gap-2 px-4 py-2 border-t'>
									<button
										onClick={() => updateStatus('closed')}
										className='border border-[#1BBFCA] text-[#1BBFCA] text-sm font-medium px-4 py-2 rounded'
									>
										Solved
									</button>

									<button className='bg-[#1BBFCA] text-white text-sm font-medium px-4 py-2 rounded'>
										Not Related
									</button>
								</div>
							)}
						</div>

						<div className='border-t border-gray-200 px-4 py-3 flex items-center gap-2 bg-white'>
							<input
								type='text'
								value={inputValue}
								onChange={(e) => setInputValue(e.target.value)}
								placeholder='Type a message'
								className='w-full border border-gray-400 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#14b8c6]'
								onKeyDown={(e) => e.key === 'Enter' && handleSend()}
							/>
							<button
								onClick={handleSend}
								className='bg-green-500 p-2 rounded text-white'
							>
								<FiSend />
							</button>
						</div>
					</div>
				</div>

				<div className='w-full lg:w-[30%] bg-white border rounded-md shadow p-4 space-y-4'>
					<div>
						<p className='font-semibold text-gray-800 mb-1'>
							Issue Description:
						</p>
						<p className='text-sm text-gray-600'>
							{ticketData?.description || 'No description provided.'}
						</p>
					</div>
					<div>
						<p className='font-semibold text-gray-800 mb-1'>Issue Category:</p>
						<p className='text-sm text-gray-600'>{ticketData?.category}</p>
					</div>
					<div>
						<p className='font-semibold text-gray-800 mb-1'>Attachments:</p>
						<p className='text-sm text-gray-600 break-all'>
							{ticketData?.file}
						</p>
						<a
							href={GetImageUrl(ticketData?.file) ?? undefined}
							target='_blank'
							className='text-blue-500 underline text-sm'
						>
							View
						</a>
					</div>
					<div>
						<p className='font-semibold text-gray-800 mb-1'>Status:</p>
						<span
							className={`inline-block px-3 py-2 rounded text-sm ${ticketData?.status === 'opened'
								? 'text-white bg-[#1BBFCA]'
								: 'text-white bg-[#be3a3a]'
								}`}
						>
							{ticketData?.status}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default TicketDetailsPage;
