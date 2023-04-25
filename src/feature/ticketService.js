import axios from 'axios';
import { accessToken } from '../config/accessToken';
import { URL } from '../config/constants';

const url = `${URL}/tickets/`;

const getTickets = async () => {
	const { data } = await axios.get(url, {
		headers: {
			Authorization: `Bearer ${accessToken.getToken()}`,
		},
	});

	return data;
};
const getTicket = async (ticketId) => {
	const { data } = await axios.get(`${url}/${ticketId}`, {
		headers: {
			Authorization: `Bearer ${accessToken.getToken()}`,
		},
	});

	return data;
};

const createTicket = async (ticket) => {
	const { data } = await axios.post(url, ticket, {
		headers: {
			Authorization: `Bearer ${accessToken.getToken()}`,
		},
	});

	return data;
};

const closeTicket = async (ticketId) => {
	const { data } = await axios.patch(
		`${url}/${ticketId}`,
		{},
		{
			headers: {
				Authorization: `Bearer ${accessToken.getToken()}`,
			},
		}
	);

	return data;
};

const deleteTicket = async (ticketId) => {
	const { data } = await axios.delete(`${url}/${ticketId}`, {
		headers: {
			Authorization: `Bearer ${accessToken.getToken()}`,
		},
	});

	return data;
};

const ticketService = {
	getTickets,
	getTicket,
	createTicket,
	closeTicket,
	deleteTicket,
};

export default ticketService;
