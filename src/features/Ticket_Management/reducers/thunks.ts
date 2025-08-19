import {
	GetIndividualStaffTicketService,
	GetStaffTicketServices,
} from '../services';
import { getindividualStaffdata, getstaffticket } from './moduleSlice';

export const GetStaffTicketServicesThunks =
	(params: any) => async (dispatch: any) => {
		try {
			const response = await GetStaffTicketServices(params);
			dispatch(getstaffticket(response.data));
		} catch (error) {
			console.log('Error in StaffTicketServices thunk:', error);
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
