import { getGroupcard, getViewcard, setLoading } from '../reducers/Slice';
import { deleteGroup, GetAllGroupCard, GetViewCard } from './service';

export const GetGroupCardthunks = (params: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await GetAllGroupCard(params);
		dispatch(getGroupcard(response.data ?? response));
		dispatch(setLoading(false));
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(setLoading(false));
	}
};
export const GetViewGroupthunks = (params: any) => async (dispatch: any) => {
	try {
		const response = await GetViewCard(params);
		dispatch(getViewcard(response.data ?? response));
	} catch (error) {
		console.log(error);
	}
};
export const deleteGroupThunk = (uuid: any) => async (dispatch: any) => {
	try {
		await deleteGroup(uuid);

		dispatch(
			GetGroupCardthunks({
				branch: '90c93163-01cf-4f80-b88b-4bc5a5dd8ee4',
				page: 1,
			})
		);
	} catch (error: any) {
		console.error('Group delete failed:', error.message);
		throw error;
	}
};
