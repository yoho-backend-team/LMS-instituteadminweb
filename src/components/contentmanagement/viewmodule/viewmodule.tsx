import { FaStar } from 'react-icons/fa';

interface ModuleCardProps {
	title: string;
	courseName: string;
	description: string;
	isActive: boolean;
	fileUrl?: string;
	fileName: string;
	branch: string;
	video?: string;
	onStatusChange?: () => void;
}

const ViewModule = ({
	title,
	courseName,
	description,
	isActive,
	fileUrl,
	fileName,
	branch,
	video,
}: ModuleCardProps) => {
	console.log('ViewModule Props:', {
		title,
		courseName,
		description,
		isActive,
		fileUrl,
		fileName,
		branch,
		video,
	});

	// Check if video is YouTube
	const isYoutube =
		video?.includes('youtube.com') || video?.includes('youtu.be');

	return (
		<div className='relative w-full bg-white rounded-lg xs:rounded-xl p-3 xs:p-4 sm:p-5 md:p-6'>
			{/* Video Preview Section - Full Width */}
			<div className='w-full h-48 xs:h-52 sm:h-56 md:h-60 bg-gray-200 rounded-md xs:rounded-lg mb-3 xs:mb-4 flex items-center justify-center overflow-hidden'>
				{video ? (
					isYoutube ? (
						<iframe
							src={video}
							className='w-full h-full rounded-md xs:rounded-lg'
							allow='autoplay; encrypted-media'
							allowFullScreen
							title='YouTube video'
						/>
					) : (
						<video
							src={video}
							controls
							className='w-full h-full rounded-md xs:rounded-lg object-cover'
							title='Module video'
						/>
					)
				) : (
					<div className='text-center text-gray-500 p-4'>
						<div className='text-3xl xs:text-4xl mb-2'>📹</div>
						<p className='text-sm xs:text-base'>No video available</p>
					</div>
				)}
			</div>

			{/* Header Section with Title and Status - Full Width */}
			<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 xs:gap-3 mb-3 xs:mb-4'>
				<h2 className='text-lg xs:text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-1 xs:gap-2 break-words w-full'>
					<span className='line-clamp-2 flex-1'>{title}</span>
					<FaStar className='text-yellow-400 flex-shrink-0 text-base xs:text-lg' />
				</h2>

				<span
					className={`w-full sm:w-auto min-w-[80px] xs:min-w-[90px] h-8 xs:h-9 text-center py-1 px-2 xs:px-3 rounded-lg text-white text-xs xs:text-sm font-medium flex-shrink-0 ${
						isActive ? 'bg-green-600' : 'bg-red-500'
					}`}
				>
					{isActive ? 'Active' : 'Inactive'}
				</span>
			</div>

			{/* Module Details - Full Width */}
			<div className='text-sm xs:text-base text-gray-700 space-y-2 xs:space-y-3 rounded w-full'>
				{/* Title */}
				<div className='flex flex-col gap-1 xs:gap-2 w-full'>
					<span className='font-semibold text-gray-800 w-full'>Title:</span>
					<div className='w-full'>
						<span className='text-gray-600 break-words w-full inline-block'>
							{title || 'No title provided'}
						</span>
					</div>
				</div>

				{/* Course Name */}
				<div className='flex flex-col gap-1 xs:gap-2 w-full'>
					<span className='font-semibold text-gray-800 w-full'>Course:</span>
					<div className='w-full'>
						<span className='text-gray-600 break-words w-full inline-block'>
							{courseName || 'No course assigned'}
						</span>
					</div>
				</div>

				{/* Branch */}
				{branch && (
					<div className='flex flex-col gap-1 xs:gap-2 w-full'>
						<span className='font-semibold text-gray-800 w-full'>Branch:</span>
						<div className='w-full'>
							<span className='text-gray-600 break-words w-full inline-block'>
								{branch}
							</span>
						</div>
					</div>
				)}

				{/* Description */}
				<div className='flex flex-col gap-1 xs:gap-2 w-full'>
					<span className='font-semibold text-gray-800'>Description:</span>
					<div className='bg-gray-50 rounded-md xs:rounded-lg p-2 xs:p-3 border border-gray-200 w-full'>
						<p className='text-gray-600 whitespace-pre-wrap break-words text-sm xs:text-base leading-relaxed w-full'>
							{description || 'No description provided'}
						</p>
					</div>
				</div>

				{/* File Information */}
				{fileUrl && (
					<div className='flex flex-col gap-1 xs:gap-2 w-full'>
						<span className='font-semibold text-gray-800 w-full'>File:</span>
						<div className='w-full'>
							<a
								href={fileUrl}
								target='_blank'
								rel='noopener noreferrer'
								className='text-blue-600 hover:text-blue-800 underline break-words w-full inline-block'
							>
								{fileName || 'Download file'}
							</a>
						</div>
					</div>
				)}

				{/* Video Source Info */}
				{video && (
					<div className='flex flex-col gap-1 xs:gap-2 w-full'>
						<span className='font-semibold text-gray-800 w-full'>Source:</span>
						<div className='w-full'>
							<span className='text-gray-600 w-full inline-block'>
								{isYoutube ? 'YouTube Video' : 'Uploaded Video'}
							</span>
						</div>
					</div>
				)}
			</div>

			{/* Video URL (for debugging/development) */}
			{video && process.env.NODE_ENV === 'development' && (
				<div className='mt-3 xs:mt-4 p-2 bg-gray-100 rounded-md w-full'>
					<p className='text-xs text-gray-500 break-all w-full'>
						Video URL: {video}
					</p>
				</div>
			)}
		</div>
	);
};

export default ViewModule;
