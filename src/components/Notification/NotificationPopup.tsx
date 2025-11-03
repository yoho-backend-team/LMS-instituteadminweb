import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAllNotifications } from '../../features/AllNotifications/Reducers/thunks';
import { useSelector } from 'react-redux';
import { selectAllNotification } from '../../features/AllNotifications/Reducers/selectors';


interface Props {
	onClose: () => void;
}

const NotificationPopup: React.FC<Props> = ({ onClose }) => {
	const navigate = useNavigate();
	const [animate, setAnimate] = useState(false);

	useEffect(() => {
		setAnimate(true);
	}, []);

	const dispatch = useDispatch<any>();
	const notifications = useSelector(selectAllNotification)?.data;

	const fetchAllNotifications = async (page = 1) => {
		try {
			const params = {
				branch: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
				institute: '973195c0-66ed-47c2-b098-d8989d3e4529',
				page,
			};
			dispatch(getAllNotifications(params));
		} catch (error) {
			console.log('Error fetching notifications:', error);
		}
	};

	useEffect(() => {
		fetchAllNotifications(1);
	}, [dispatch]);

	return (
		<div
			className={`absolute right-0 top-[60px] w-72 bg-white shadow-lg rounded-md border z-50 
        transform transition-all duration-600 ease-out 
        ${animate ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
		>
			<div className='bg-[#1BBFCA] text-white font-bold p-2 rounded-t-md'>
				Notifications
			</div>
			<div className='p-2 space-y-2'>
				{notifications?.slice(0, 3)?.map((n: any) => (
					<div key={n?.id || n?._id} className='border-b pb-1'>
						<p className='font-semibold'>{n?.title}</p>
						<p className='text-xs text-gray-500 text-right'>
							Status: {`${n?.status}`}
						</p>
					</div>
				))}
				<div className='text-center pt-2'>
					<button
						onClick={() => {
							navigate('/notifications');
							setTimeout(onClose, 0);
						}}
						className='text-sm text-cyan-600 hover:underline'
					>
						View All Notification
					</button>
				</div>
			</div>
		</div>
	);
};

export default NotificationPopup;
