import type React from 'react';
import { IoMdAdd } from 'react-icons/io';

interface HeaderActionsProps {
	title: string;
	onFilterToggle: () => void;
	onAddClick: () => void;
	filterIcon: string;

	addButtonText?: string;
	showFilter?: boolean;
}

export const HeaderActions: React.FC<HeaderActionsProps> = ({
	title,
	onFilterToggle,
	onAddClick,
	filterIcon,

	addButtonText = 'Add',
	showFilter = false,
}) => {
	return (
		<div className='space-y-4 sm:space-y-6 text-[#716F6F] px-4 sm:px-2 md:px-8'>
			{/* Title */}
			<h1 className='text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-[#3B3939]'>
				{title}
			</h1>

			{/* Buttons Section */}
			<div
				className='
      flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4
    '
			>
				{/* Filter Button */}
				<button
					onClick={onFilterToggle}
					className={`
        flex items-center justify-center gap-2
        w-full sm:w-auto md:w-48
        bg-[#1BBFCA]
        px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3
        rounded-lg text-white text-sm sm:text-base md:text-md
        font-semibold shadow-md
        transition-all duration-300 hover:bg-[#17aab5] hover:shadow-lg
        ${showFilter ? 'bg-[#1BBFCA]' : ''}
      `}
				>
					<img
						src={filterIcon || '/placeholder.svg'}
						alt='filter'
						className='h-4 w-4 sm:h-5 sm:w-5'
					/>
					{showFilter ? 'Hide Filter' : 'Show Filter'}
				</button>

				{/* Add Button */}
				<button
					onClick={onAddClick}
					className='
    flex items-center justify-center gap-2
    w-full sm:w-1/2 md:w-2/5 lg:w-1/3 xl:w-1/5 2xl:w-1/8
    bg-[#1BBFCA]
    px-3 py-2 sm:px-4 sm:py-2 md:px-5 md:py-3
    rounded-lg
    text-sm sm:text-base md:text-md lg:text-lg
    font-semibold text-white shadow-md
    whitespace-nowrap
    transition-all duration-300 hover:bg-[#17aab5] hover:shadow-lg
    overflow-hidden
  '
				>
					<IoMdAdd className='flex-shrink-0 h-5 w-5 sm:h-6 sm:w-6 md:h-6 md:w-6 lg:h-7 lg:w-7 text-white' />
					<span className=''>{addButtonText}</span>
				</button>
			</div>
		</div>
	);
};
