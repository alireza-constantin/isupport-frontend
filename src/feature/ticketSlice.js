import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import ticketService from './ticketService';

const initialState = {
	status: 'idle',
	tickets: null,
	ticket: null,
};

export const getAllTickets = createAsyncThunk('tickets/getAllTickets', async (_, thunkApi) => {
	try {
		const { ticket } = thunkApi.getState();
		if (ticket.tickets && (ticket.status === 'succeded' || ticket.status === 'pending')) {
			return ticket.tickets;
		}
		return await ticketService.getTickets();
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const getTicket = createAsyncThunk('tickets/getTicket', async (ticketId, thunkApi) => {
	try {
		return await ticketService.getTicket(ticketId);
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const createTicket = createAsyncThunk('tickets/create', async (ticket, thunkApi) => {
	try {
		return await ticketService.createTicket(ticket);
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const closeTicket = createAsyncThunk('tickets/closeTicket', async (ticketId, thunkApi) => {
	try {
		return await ticketService.closeTicket(ticketId);
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const deleteTicket = createAsyncThunk('tickets/deleteTicket', async (ticketId, thunkApi) => {
	try {
		await ticketService.deleteTicket(ticketId);
		return ticketId;
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

const ticketSlice = createSlice({
	name: 'ticket',
	initialState,
	reducers: {
		resetTicket(state) {
			state.ticket = null;
			state.status = 'idle';
		},
		reset(state) {
			state.tickets = null;
			state.ticket = null;
			state.status = 'idle';
		},
	},
	extraReducers(builder) {
		builder
			.addCase(getAllTickets.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(getAllTickets.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.tickets = action.payload;
			})
			.addCase(getAllTickets.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(getTicket.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(getTicket.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.ticket = action.payload;
			})
			.addCase(getTicket.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(closeTicket.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(closeTicket.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(closeTicket.fulfilled, (state, { payload }) => {
				state.status = 'succeeded';
				state.tickets.forEach((ticket) => {
					if (ticket._id === payload._id) {
						ticket.isClosed = true;
					}
				});
				state.ticket.isClosed = true;
			})
			.addCase(createTicket.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(createTicket.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(createTicket.fulfilled, (state, { payload }) => {
				state.status = 'succeeded';
				state.tickets.push(payload);
			})
			.addCase(deleteTicket.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(deleteTicket.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(deleteTicket.fulfilled, (state, { payload }) => {
				console.log(payload);
				state.tickets = state.tickets.filter((ticket) => ticket._id !== payload);
			});
	},
});

export const { reset, resetTicket } = ticketSlice.actions;
export default ticketSlice.reducer;
