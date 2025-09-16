/* eslint-disable @typescript-eslint/no-explicit-any */
import { getCommunity, getcommunityById } from '../services/index';
import { getcommunity, getMessage, setLoading } from './CommunitySlice'; // Avoid same name for action and function

// Async thunk for fetching community
export const fetchCommunity = (params: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await getCommunity(params);
		if (response) {
			dispatch(getcommunity(response.data));
		}
		dispatch(setLoading(false));
	} catch (error) {
		console.error('Error fetching community:', error);
		return null;
	} finally {
		dispatch(setLoading(false));
	}
};

// Async thunk for fetching messages
export const fetchCommunityById = (data: any) => async (dispatch: any) => {
	try {
		const response = await getcommunityById(data);
		dispatch(getMessage(response));
	} catch (error) {
		console.error(error);
	}
};
