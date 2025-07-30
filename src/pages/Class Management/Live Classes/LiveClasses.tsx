import { COLORS, FONTS } from '../../../constants/uiConstants';

const LiveClasses = () => {
	return (
		<>
			<div className='my-4'>
				<div>
					<h1 style={{ ...FONTS.heading_04_bold, color: COLORS.gray_dark_01 }}>
						Live Classes
					</h1>
				</div>
			</div>
		</>
	);
};

export default LiveClasses;
