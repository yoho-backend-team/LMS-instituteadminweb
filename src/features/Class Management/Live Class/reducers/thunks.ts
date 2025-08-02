import { getAllLiveClassService } from '../services';
import { getLiveClass } from './slices';

export const getAllLiveClasses = (params: any) => async (dispatch: any) => {
	try {
		const response = await getAllLiveClassService(params);
		console.log(response, 'live class response');
		if (response) {
			// dispatch(getLiveClass(response));
		}
	} catch (error) {
		console.log(error);
		return null;
	}
};
