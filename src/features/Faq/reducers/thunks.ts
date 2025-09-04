import { GetAllFaqs } from '../service';
import { getFaqs, setLoading } from './slice';

export const getAllFaqsThunk = (params: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await GetAllFaqs(params);
		dispatch(getFaqs(response.data ?? response));
		dispatch(setLoading(false));
	} catch (error) {
		console.error('Failed to fetch FAQs:', error);
	} finally {
		dispatch(setLoading(false));
	}
};
