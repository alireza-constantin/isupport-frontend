import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import noteService from './noteService';

export const getNotes = createAsyncThunk('notes/get', async (ticketId, thunkApi) => {
	try {
		return await noteService.getNotes(ticketId);
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const createNote = createAsyncThunk('notes/create', async ({ ticketId, note }, thunkApi) => {
	try {
		return await noteService.createNote({ ticketId, note });
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

const initialState = {
	status: 'idle',
	notes: null,
};

const noteSlice = createSlice({
	name: 'notes',
	initialState,
	reducers: {
		reset(state) {
			state.status = 'idle';
			state.notes = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getNotes.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(getNotes.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(getNotes.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.notes = action.payload;
			})
			.addCase(createNote.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(createNote.rejected, (state) => {
				state.status = 'failed';
			})
			.addCase(createNote.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.notes.unshift(action.payload);
			});
	},
});

export default noteSlice.reducer;
export const { reset } = noteSlice.actions;
