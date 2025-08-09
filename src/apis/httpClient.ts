
import axios from 'axios';
import { ClearLocalStorage, GetLocalStorage } from '../utils/localStorage';
import UpgradeModal from '../components/shared/UpgradeSubscriptionModal';
import { showSessionExpiredModal } from '../components/Session/sessionexpiremodel';




const Axios = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	timeout: 5000000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response && error?.response?.status === 401 && error?.response?.data?.status === "session_expired") {
			ClearLocalStorage();
			showSessionExpiredModal();
		}
		return Promise.reject(error);
	}
);


Axios.interceptors.request.use((config) => {
	const token = GetLocalStorage('instituteAdminToken');
	if (token) {
		config.headers['Authorization'] = `Token ${token}`;
	}
	return config;
});

Axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			ClearLocalStorage();

			showSessionExpiredModal();

		}
		return Promise.reject(error);
	}
);

class HttpClient {
	async get(url: string, params?: any) {
		const response = await Axios.get(url, { params });
		return response.data;
	}

	async post(url: string, data: any, params?: any) {
		const response = await Axios.post(url, data, { params });
		return response.data;
	}

	async update(url: string, data?: any, params?: any) {
		const response = await Axios.put(url, data, { params });
		return response.data;
	}

	async delete(url: string, data?: any) {
		const response = await Axios.delete(url, data);
		return response;
	}

	async uploadFile(url: string, data: any) {
		const response = await Axios.post(url, data, {
			headers: { 'Content-Type': 'multipart/form-data' },
		});
		return response.data;
	}
}

export default new HttpClient();