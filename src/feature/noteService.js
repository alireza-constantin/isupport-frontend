import axios from 'axios';
import { accessToken } from '../config/accessToken';
import { URL } from '../config/constants';

const url = `${URL}/tickets/`;

const getNotes = async (ticketId) => {
	const { data } = await axios.get(`${url}/${ticketId}/notes`, {
		headers: {
			Authorization: `Bearer ${accessToken.getToken()}`,
		},
	});

	return data.reverse();
};

const createNote = async ({ ticketId, note }) => {
	const { data } = await axios.post(
		`${url}/${ticketId}/notes`,
		{ text: note },
		{
			headers: {
				Authorization: `Bearer ${accessToken.getToken()}`,
			},
		}
	);

	return data;
};

const noteService = {
	getNotes,
	createNote,
};

export default noteService;
