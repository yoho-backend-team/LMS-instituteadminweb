/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import LeftSide from './LeftSide';
import ChatView from './ChatView';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCommunityById } from '../../features/Community/Reducers/thunks';
import { selectMessages } from '../../features/Community/Reducers/selectors';
import socket, { socketConnect, socketDisconnect } from '../../utils/socket';
import { GetProfileDetail } from '../../features/Auth/service';
import { getInstituteDetails } from '../../apis/httpEndpoints';
import type { RootState } from '../../store/store';
import { ArrowLeft } from 'lucide-react'; // Import the arrow icon

interface Message {
	sender: string;
	sender_name: string;
	text: string;
	time: string;
	timestamp: string;
}

const Communitys: React.FC = () => {
	interface Batch {
		_id?: string;
		group?: string;
		groupimage?: string;
		batch?: { batch_name?: string };
	}

	const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
	const [message, setMessage] = useState<string>('');
	const [messages, setMessages] = useState<Message[]>([]);
	const [showProfile, setShowProfile] = useState<boolean>(false);
	const [isEditing, setIsEditing] = useState(false);
	const [userId, setUserId] = useState<string | null>(null);
	const [, setUserName] = useState<string | null>(null);
	const [showChatView, setShowChatView] = useState(false); // New state to control chat view visibility on mobile
	const dispatch = useDispatch<any>();
	const communityMessages = useSelector(selectMessages);
	const userIds: any = useSelector((state: RootState) => state.authuser.user);

	const getProfile = async () => {
		try {
			const res = await GetProfileDetail();

			if (res?.data) {
				setUserId(res.data._id);

				const fullName = `${res.data.first_name || ''} ${
					res.data.last_name || ''
				}`.trim();
				setUserName(fullName);
			}
		} catch (error) {
			console.error('Failed to fetch profile:', error);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	const formatTime = (timestamp: string) => {
		const date = new Date(timestamp);
		return date.toLocaleTimeString([], {
			hour: '2-digit',
			minute: '2-digit',
		});
	};

	const instituteId = getInstituteDetails();

	useEffect(() => {
		const transformMessages = (apiMessages: any[]) => {
			return apiMessages
				.map((msg) => ({
					sender: msg.sender,
					sender_name: msg.sender_name,
					text: msg.message,
					time: formatTime(msg.timestamp),
					timestamp: msg.timestamp,
				}))
				.reverse();
		};
		if (communityMessages?.data) {
			const transformedMessages = transformMessages(communityMessages.data);
			setMessages(transformedMessages);
		}
	}, [communityMessages]);

	useEffect(() => {
		socketConnect();

		socket.on('newMessage', (msg: any) => {
			setMessages((prev) => [
				...prev,
				{
					sender: msg.senderId ?? msg.sender,
					sender_name: msg.name ?? msg.sender_name,
					text: msg.content ?? msg.message,
					time: formatTime(msg.time ?? msg.timestamp),
					timestamp: msg.time ?? msg.timestamp,
				},
			]);
		});

		return () => {
			socketDisconnect();
			socket.off('newMessage');
		};
	}, []);

	const handleSendMessage = () => {
		const msgData = {
			content: message.trim(),
			groupId: selectedBatch?._id,
			senderId: userIds?._id,
			name: `${userIds?.first_name} ${userIds?.last_name}`,
			time: new Date().toISOString(),
		};

		socket.emit('sendMessage', msgData);
		setMessages((prev: any) => [
			...prev,
			{
				sender: userIds?._id,
				sender_name: 'You',
				text: message.trim(),
				time: formatTime(msgData.time),
				timestamp: msgData.time,
			},
		]);

		setMessage('');
	};

	const handleDeleteMessage = (index: number) => {
		setMessages((prev) => prev.filter((_, i) => i !== index));
	};

	useEffect(() => {
		(() => {
			if (selectedBatch) {
				dispatch(
					fetchCommunityById({
						group: selectedBatch._id,
					})
				);

				socket.emit('joinRoom', {
					roomId: selectedBatch._id,
					userId: userIds?._id,
				});
			}
		})();
	}, [dispatch, selectedBatch, userIds]);

	const handleSelectBatch = (batch: Batch) => {
		setSelectedBatch(batch);
		setShowProfile(false);
		// On mobile, show chat view and hide left side
		if (window.innerWidth <= 600) {
			setShowChatView(true);
		}
	};

	const handleBackToLeftSide = () => {
		setShowChatView(false);
		setSelectedBatch(null);
		setMessages([]);
	};

	const handleCloseChat = () => {
		setSelectedBatch(null);
		setMessages([]);
		if (window.innerWidth <= 600) {
			setShowChatView(false);
		}
	};

	return (
		<div className='flex justify-between w-full gap-6 bg-white font-poppins'>
			{/* LeftSide - hidden on mobile when chat is open */}
			<div className={`${showChatView ? 'hidden' : 'block'} w-full md:w-auto`}>
				<LeftSide
					selectedBatch={selectedBatch}
					onSelectBatch={handleSelectBatch}
					instituteId={instituteId}
				/>
			</div>

			{/* ChatView - conditionally rendered */}
			{selectedBatch && (
				<div
					className={`${
						showChatView ? 'block' : 'hidden md:block'
					} w-full md:w-auto relative`}
				>
					{/* Back arrow for mobile */}
					<div className='md:hidden top-4 left-4 z-10'>
						<button
							onClick={handleBackToLeftSide}
							className='flex items-center justify-center w-10 h-10 bg-white rounded-full shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors'
						>
							<ArrowLeft size={20} className='text-[#1BBFCA]' />
						</button>
					</div>

					<ChatView
						userId={userId}
						messages={messages}
						message={message}
						onChangeMessage={setMessage}
						onSendMessage={handleSendMessage}
						onDeleteMessage={handleDeleteMessage}
						selectedBatch={selectedBatch}
						onClose={handleCloseChat}
						showProfile={showProfile}
						setShowProfile={setShowProfile}
						profileData={{
							name: selectedBatch?.group || '',
							about: 'Hello My name is Zilan ...',
							email: 'felecia_rower@email.com',
							availability: 'Mon-Fri 10AM - 8PM',
							phone: '+91 98765 43265',
						}}
						setProfileData={() => {}}
						isEditing={isEditing}
						setIsEditing={setIsEditing}
					/>
				</div>
			)}
		</div>
	);
};

export default Communitys;
