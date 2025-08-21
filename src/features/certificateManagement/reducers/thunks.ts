import { getCertificate } from '../services';
import { setCertificateClass, setLoading } from './slice';

export const getStudentCertificate = (params: any) => async (dispatch: any) => {
	try {
		dispatch(setLoading(true));
		const response = await getCertificate(params);
		dispatch(setCertificateClass(response));
		dispatch(setLoading(false));
	} catch (error) {
		console.log(error);
	} finally {
		dispatch(setLoading(false));
	}
};
