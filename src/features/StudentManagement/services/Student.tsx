/* eslint-disable @typescript-eslint/no-explicit-any */
import Client from '../../../apis/index.js';

export const getstudentdata = async (data: any) => {
	const response = await Client.student.class(data)
	if (response) {
		return response;
	}
};
export const getcoursedataservice = async (data: any) => {
	const response = await Client.student.getWithId(data)
	if (response) {
		return response;
	}
};
export const updatestudentdata = async (data: any) => {
	const response = await Client.student.update(data)
	if (response) {
		return response;
	}
};
export const deletestudentdata = async (data: any) => {
	const response = await Client.student.delete(data)
	if (response) {
		return response;
	}
};
export const createstudentdata = async (data: any) => {
	const response = await Client.users.studentRegister(data)
	if (response) {
		return response;
	}
};

export const getLiveClassData = async (query: any) => {
	const response = await Client.student.getLiveClass(query)
	if (response) {
		return response;
	}
};

export const getActivityStudentdata = async (data: any) => {
	const response = await Client.student.activity(data)
	if (response) {
		return response;
	}
};