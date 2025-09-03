
import { getAllLiveClassService } from '../services';
import { getLiveClass, setLoading } from './slices';

export const getAllLiveClasses = (params: any) => async (dispatch: any) => {

	try {
		dispatch(setLoading(true))
		const response = await getAllLiveClassService(params);
		if (response) {
			dispatch(getLiveClass(response));
		}
		dispatch(setLoading(false))
	} catch (error) {
		console.log(error);
		return null;
	}
	finally{
		dispatch(setLoading(false))
	}
};

