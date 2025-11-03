import { useEffect, useState } from 'react';
import { IoMdCall, IoMdMail } from 'react-icons/io';
import { FaChevronRight } from 'react-icons/fa';
import { getHelpCenterAll } from '../../features/HelpCenter/service';

interface HelpItem {
	id: string;
	module: string;
	title: string;
	description: string;
	video?: string;
	createdAt?: string;
}

const HelpFAQ = () => {
	const [helpCenter, setHelpCenter] = useState<HelpItem[]>([]);
	const [selectedModule, setSelectedModule] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [loading, setLoading] = useState<boolean>(true);
	const [modalOpen, setModalOpen] = useState<boolean>(false);
	const [selectedItem, setSelectedItem] = useState<HelpItem | null>(null);

	// Fetch Help Center Data
	const fetchHelpCenter = async () => {
		try {
			setLoading(true);
			const response = await getHelpCenterAll('');
			setHelpCenter(response || []);
			if (response && response.length > 0) {
				setSelectedModule(response[0].module);
			}
		} catch (error) {
			console.error('Failed to fetch help center:', error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchHelpCenter();
	}, []);

	// Filter modules and titles by search
	const filteredData = helpCenter.filter(
		(item) =>
			item.module.toLowerCase().includes(searchQuery.toLowerCase()) ||
			item.title.toLowerCase().includes(searchQuery.toLowerCase())
	);

	const filteredModules = Array.from(
		new Set(filteredData.map((i) => i.module))
	);

	// Items under selected module
	const filteredItems = helpCenter.filter(
		(item) => item.module === selectedModule
	);

	// Format date
	const formatDate = (date?: string) => {
		if (!date) return 'N/A';
		return new Date(date).toLocaleDateString('en-GB', {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
		});
	};

	// Convert YouTube URLs or generic video links to iframe-compatible URLs
	const getEmbedUrl = (url?: string) => {
		if (!url) return '';
		try {
			if (url.includes('youtube.com/watch?v=')) {
				const videoId = url.split('v=')[1].split('&')[0];
				return `https://www.youtube.com/embed/${videoId}`;
			}
			if (url.includes('youtu.be/')) {
				const videoId = url.split('youtu.be/')[1].split('?')[0];
				return `https://www.youtube.com/embed/${videoId}`;
			}
			// Return as-is for other iframe sources (Vimeo, etc.)
			return url;
		} catch {
			return url;
		}
	};

	return (
		<div className='p-3'>
			{/* Header */}
			<div className='bg-[#1BBFCA] p-5 text-white text-lg rounded-md font-bold'>
				CUSTOMER
			</div>

			{/* Search Box */}
			<div className='mt-5 mb-3'>
				<input
					type='text'
					placeholder='Search by module or title...'
					value={searchQuery}
					onChange={(e) => setSearchQuery(e.target.value)}
					className='w-full md:w-1/3 p-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#1BBFCA]'
				/>
			</div>

			{/* Main Layout */}
			<div className='flex flex-col md:flex-row mt-5 gap-5'>
				{/* Sidebar */}
				<div className='w-full md:w-1/4 bg-white rounded-2xl shadow-2xl p-4'>
					{loading ? (
						<div className='space-y-3 animate-pulse'>
							{Array.from({ length: 3 }).map((_, i) => (
								<div
									key={i}
									className='h-8 bg-gray-200 rounded-md w-full'
								></div>
							))}
						</div>
					) : filteredModules.length > 0 ? (
						filteredModules.map((module, index) => (
							<div
								key={index}
								className={`flex items-center justify-between p-2 cursor-pointer rounded ${
									selectedModule === module
										? 'bg-[#1BBFCA] text-white'
										: 'hover:bg-gray-100 text-[#716F6F]'
								}`}
								onClick={() => setSelectedModule(module)}
							>
								<h1 className='text-lg'>{module}</h1>
								<FaChevronRight />
							</div>
						))
					) : (
						<div className='text-center text-gray-500 py-4'>
							No modules available
						</div>
					)}
				</div>

				{/* Content Area */}
				<div className='w-full md:w-3/4 bg-white rounded-2xl shadow-2xl p-4'>
					{loading ? (
						<div className='space-y-3 animate-pulse'>
							{Array.from({ length: 4 }).map((_, i) => (
								<div
									key={i}
									className='h-10 bg-gray-200 rounded-md w-full'
								></div>
							))}
							<div className='h-24 bg-gray-200 rounded-md mt-4'></div>
						</div>
					) : filteredItems.length > 0 ? (
						<ul className='space-y-3'>
							{filteredItems.map((item, i) => (
								<li
									key={i}
									className='p-3 border rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center hover:bg-gray-50 transition'
								>
									<div>
										<h2 className='font-semibold text-lg text-[#1BBFCA]'>
											{item.title}
										</h2>
										<p className='text-sm text-gray-500'>
											Created: {formatDate(item.createdAt)}
										</p>
									</div>
									<button
										onClick={() => {
											setSelectedItem(item);
											setModalOpen(true);
										}}
										className='mt-2 md:mt-0 px-4 py-2 bg-[#1BBFCA] text-white rounded-md hover:bg-[#18aeb7] transition'
									>
										View
									</button>
								</li>
							))}
						</ul>
					) : (
						<div className='text-center text-gray-500 py-6'>
							No help items available
						</div>
					)}
				</div>
			</div>

			{/* Contact Cards */}
			<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-5 gap-5 text-[#716F6F]'>
				{/* Phone Card 1 */}
				<div className='bg-white p-5 rounded-2xl shadow-2xl'>
					<div className='bg-[#1BBFCA] w-12 h-11 rounded-md p-3'>
						<IoMdCall className='fill-white h-6 w-6' />
					</div>
					<a
						href='tel:81025482568'
						className='mt-3 font-bold block text-[#1BBFCA] hover:underline'
					>
						+ (810) 2548 2568
					</a>
					<div className='mt-3'>We are always happy to help!</div>
					<div className='mt-2 text-sm text-gray-500'>
						Academic Support Timings: <br />
						<strong>Mon – Fri, 9:00 AM – 6:00 PM</strong>
					</div>
				</div>

				{/* Phone Card 2 */}
				<div className='bg-white p-5 rounded-2xl shadow-2xl'>
					<div className='bg-[#1BBFCA] w-12 h-11 rounded-md p-3'>
						<IoMdCall className='fill-white h-6 w-6' />
					</div>
					<a
						href='tel:9104598761'
						className='mt-3 font-bold block text-[#1BBFCA] hover:underline'
					>
						+ (910) 4598 761
					</a>
					<div className='mt-3'>We are always happy to help!</div>
					<div className='mt-2 text-sm text-gray-500'>
						Academic Support Timings: <br />
						<strong>Mon – Fri, 9:00 AM – 6:00 PM</strong>
					</div>
				</div>

				{/* Email Card */}
				<div className='bg-white p-5 rounded-2xl shadow-2xl'>
					<div className='bg-[#1BBFCA] w-12 h-11 rounded-md p-3'>
						<IoMdMail className='fill-white h-6 w-6' />
					</div>
					<a
						href='mailto:help@gmail.com'
						className='mt-3 font-bold block text-[#1BBFCA] hover:underline'
					>
						help@gmail.com
					</a>
					<div className='mt-3'>Best way to get answers fast!</div>
					<div className='mt-2 text-sm text-gray-500'>
						Academic Support Timings: <br />
						<strong>Mon – Fri, 9:00 AM – 6:00 PM</strong>
					</div>
				</div>
			</div>

			{/* Modal */}
			{modalOpen && selectedItem && (
				<div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
					<div className='bg-white rounded-2xl shadow-2xl p-6 w-11/12 md:w-2/3 lg:w-1/2 relative'>
						<button
							className='absolute top-3 right-3 text-gray-500 hover:text-red-500 text-lg font-bold'
							onClick={() => setModalOpen(false)}
						>
							✕
						</button>
						<h2 className='text-xl font-semibold text-[#1BBFCA] mb-2'>
							{selectedItem.title}
						</h2>
						<p className='text-gray-600 mb-2'>
							<strong>Description:</strong> {selectedItem.description}
						</p>
						<p className='text-gray-500 mb-4'>
							<strong>Created At:</strong> {formatDate(selectedItem.createdAt)}
						</p>

						{/* Video Section */}
						{selectedItem.video ? (
							<div className='aspect-video w-full'>
								<iframe
									src={getEmbedUrl(selectedItem.video)}
									title={selectedItem.title}
									allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
									allowFullScreen
									className='w-full h-full rounded-lg shadow'
								/>
							</div>
						) : (
							<p className='text-gray-400 text-center italic'>
								No video available
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default HelpFAQ;
