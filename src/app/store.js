import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../feature/authSlice';
import ticketReducer from '../feature/ticketSlice';
import noteReducer from '../feature/noteSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		ticket: ticketReducer,
		note: noteReducer,
	},
});
