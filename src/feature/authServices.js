import axios from 'axios';
import { accessToken } from '../config/accessToken';
import { URL } from '../config/constants';

const url = `${URL}/user/`;

const register = async (userData) => {
	const { data } = await axios.post(url + 'register', userData, {
		withCredentials: true
	});
	return data;
};


const logout = async () => {
	const { data } = await axios.get(url + 'logout', {
		headers: {
			Authorization: `Bearer ${accessToken.getToken()}`,
		},
		withCredentials: true,
	});

	return data;
};

const login = async (userData) => {
	const { data } = await axios.post(url + 'login', userData, {
		withCredentials: true,
	});
	return data;
};

const getAccessToken = async () => {
	const { data } = await axios.post(
		url + 'refresh-token',
		{},
		{
			withCredentials: true,
		}
	);
	return data;
};

const authService = {
	register,
	logout,
	login,
	getAccessToken,
};

export default authService;
