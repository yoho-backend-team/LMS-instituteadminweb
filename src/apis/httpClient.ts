/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import { ClearLocalStorage, GetLocalStorage } from '../utils/localStorage';

const Axios = axios.create({
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	timeout: 5000000,
	headers: {
		'Content-Type': 'application/json',
	},
});

Axios.interceptors.request.use((config) => {
	// const token = GetLocalStorage('token');
	if (true) {
		// config.headers['Authorization'] = `Token ${token ? token : ''}`;
		config.headers[
			'Authorization'
		] = `Token eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImNoYW5kcmFuMUBnbWFpbC5jb20iLCJyb2xlIjoiNjdhMDY4ODU0MDBmZmFlMmQyMDZhYmZiIiwiaW5zdGl0dXRlX2lkIjoiNjdmM2EyNmRmNGIyYzUzMGFjZDE2NDE5IiwidXVpZCI6Ijg3MjcyMjVkLWM5ZDUtNGQ0MC1hYjAyLTZhYzUyOGEyM2Q1MiIsInVzZXJfdHlwZSI6Imluc3RpdHV0ZSIsImlhdCI6MTc1NDEzODUyNiwiZXhwIjoxNzU0MjI0OTI2fQ.lk8pUvbJkGAkGXbHkwCwURcR5U4xzc4oGTsXYllb9EM`;
	}
	return config;
});

Axios.interceptors.response.use(
	(response) => response,
	(error) => {
		if (
			error?.response &&
			error?.response?.status === 401 &&
			error?.response?.data?.status === 'session_expired'
		) {
			ClearLocalStorage();
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

	async update(url: string, data?: any) {
		const response = await Axios.put(url, data);
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
