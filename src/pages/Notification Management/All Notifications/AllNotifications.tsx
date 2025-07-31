import { Card, CardContent } from '../../../components/ui/card';
import purpleImg from '../../../assets/purple icon.png';
import greenImg from '../../../assets/green icon.png';
import classImg from '../../../assets/classimg (1).png';
import { AddNotificationDrawer } from '../../../components/AllNotification/addNotification';
import { Button } from '../../../components/ui/button';
import instructorImg from '../../../assets/image 108.png';
import studentImg from '../../../assets/image 109.png';
import { COLORS, FONTS } from '../../../constants/uiConstants';

const notifications = [
	{
		id: 13,
		name: 'Vignesh',
		role: 'Instructor',
		status: 'unread',
		title: 'Dress Code Reg',
		message: 'All should maintain the dress code',
	},
	{
		id: 52,
		name: 'Surya',
		role: 'Student',
		status: 'unread',
		title: 'Dress Code Reg',
		message: 'All should maintain the dress code',
	},
	{
		id: 14,
		name: 'Suruthiga',
		role: 'Instructor',
		status: 'read',
		title: 'Dress Code Reg',
		message: 'All should maintain the dress code',
	},
	{
		id: 26,
		name: 'Wikki',
		role: 'Student',
		status: 'unread',
		title: 'Dress Code Reg',
		message: 'All should maintain the dress code',
	},
	{
		id: 15,
		name: 'Sowmiya',
		role: 'Instructor',
		status: 'read',
		title: 'Dress Code Reg',
		message: 'All should maintain the dress code',
	},
	{
		id: 16,
		name: 'Ammu',
		role: 'Student',
		status: 'unread',
		title: 'Dress Code Reg',
		message: 'All should maintain the dress code',
	},
];

const totalCount = notifications.length;
const readCount = notifications.filter(
	(n) => n.status.toLowerCase() === 'read'
).length;
const unreadCount = notifications.filter(
	(n) => n.status.toLowerCase() === 'unread'
).length;

const stats = [
	{
		title: 'Total Notifications',
		count: totalCount,
		color: 'bg-[#DB55D233]',
		iconBg: 'bg-white',
		image: purpleImg,
	},
	{
		title: 'Read notifications',
		count: readCount,
		color: 'bg-green-100',
		iconBg: 'bg-[#7ED74F33]',
		image: greenImg,
	},
	{
		title: 'Unread Notification',
		count: unreadCount,
		color: 'bg-[#E3418F33]',
		iconBg: 'bg-white',
		image: classImg,
	},
];

export default function AllNotifications() {
	return (
		<div className='p-6 w-full'>
			<div className='flex justify-end mb-4'>
				<AddNotificationDrawer />
			</div>

			<div className='flex gap-6 flex-wrap'>
				{stats.map((stat, index) => (
					<Card
						key={index}
						className={`w-[250px] h-[160px] p-4 rounded-xl shadow-md ${stat.color} relative transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl`}
					>
						<div className='absolute -top-3 left-3'>
							<div>
								<img
									src={stat.image}
									alt={stat.title}
									className='w-15 h-15 mt-3 object-contain'
								/>
							</div>
						</div>
						<CardContent className='pt-10'>
							<p className='text-gray-700  mr-10 font-medium text-sm'>
								{stat.title}
							</p>
							<p className='text-xl font-bold text-gray-800 mt-2'>
								{stat.count}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			<h2 className='text-lg font-semibold mt-8 mb-4'>Notifications</h2>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
				{notifications.map((n, index) => (
					<Card key={index} className='p-4 rounded-2xl shadow-md'>
						<CardContent className='p-0 flex flex-col items-start'>
							<div className='flex items-center w-full mb-2'>
								<img
									src={n.role === 'Instructor' ? instructorImg : studentImg}
									alt=''
									className='w-12 h-12 rounded-full'
								/>
								<div className='w-full'>
									<span
										style={{
											...FONTS.heading_08_bold,
											color: COLORS.gray_dark_02,
										}}
									>
										{n.name}
									</span>
									<p
										style={{
											...FONTS.heading_09,
											color: COLORS.gray_dark_03,
										}}
									>
										{n.role}
									</p>
								</div>
								<div className='flex justify-end w-full'>
									<span
										style={{
											...FONTS.heading_09,
											color: COLORS.gray_dark_03,
										}}
										className='border-2 px-1 py-0.5 rounded-md border-gray-400'
									>
										ID : {n.id}
									</span>
								</div>
							</div>
							<h3
								style={{ ...FONTS.heading_08_bold, color: COLORS.gray_dark_02 }}
							>
								{n.title}
							</h3>
							<p
								style={{ ...FONTS.heading_09, color: COLORS.black }}
								className='mb-2'
							>
								{n.message}
							</p>
							<div className='flex justify-between text-sm w-full mb-2'>
								<span
									className={`${
										n.status === 'read' ? 'bg-green-600' : 'bg-red-600'
									} text-white px-2 py-0.5 rounded-md`}
									style={{ ...FONTS.heading_09 }}
								>
									Status : {n.status}
								</span>
							</div>
							<Button className='bg-[#1BBFCA] hover:bg-cyan-600 text-white rounded px-3 py-0.5 self-end'>
								Resend
							</Button>
						</CardContent>
					</Card>
				))}
			</div>
		</div>
	);
}
