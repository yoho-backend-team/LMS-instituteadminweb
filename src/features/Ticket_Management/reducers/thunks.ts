import {
	GetIndividualStaffTicketService,
	GetStaffTicketServices,
} from '../services';
import {
	getindividualStaffdata,
	getstaffticket,
	setLoading,
} from './moduleSlice';

export const GetStaffTicketServicesThunks =
	(params: any) => async (dispatch: any) => {
		try {
			dispatch(setLoading(true));
			const response = await GetStaffTicketServices(params);
			dispatch(getstaffticket(response));
			dispatch(setLoading(false));
		} catch (error) {
			console.log('Error in StaffTicketServices thunk:', error);
		} finally {
			dispatch(setLoading(false));
		}
	};

export const GetIndividualStaffTicketThunks =
	(id: string) => async (dispatch: any) => {
		try {
			const response = await GetIndividualStaffTicketService(id);
			dispatch(getindividualStaffdata(response));
		} catch (error) {
			console.log('Error in IndividualStaffTicket thunk:', error);
		}
	};
