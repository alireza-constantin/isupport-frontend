import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import authServices from './authServices';
import { accessToken } from '../config/accessToken';

const initialState = {
	user: null,
	status: 'idle',
	message: null,
};

export const registerUser = createAsyncThunk('auth/register', async (data, thunkApi) => {
	try {
		return await authServices.register(data);
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;
		return thunkApi.rejectWithValue(message);
	}
});

export const confirmEmail = createAsyncThunk('auth/confirmEmail', async (userId, thunkApi) => {
	try {
		return await authServices.confirmEmail(userId);
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;

		return thunkApi.rejectWithValue(message);
	}
});

export const logoutUser = createAsyncThunk('/auth/logout', async (_, thunkApi) => {
	try {
		return await authServices.logout();
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;

		return thunkApi.rejectWithValue(message);
	}
});

export const loginUser = createAsyncThunk('auth/login', async (userData, thunkApi) => {
	try {
		return await authServices.login(userData);
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;

		return thunkApi.rejectWithValue(message);
	}
});

// send refresh token and get access token and user back
export const getAccessToken = createAsyncThunk('/auth/getToken', async (_, thunkApi) => {
	const auth = thunkApi.getState().auth;
	try {
		if (auth.user || auth.status === 'pending' || auth.status === 'succeeded') {
			console.log(auth);
			return { accessToken: accessToken.getToken(), user: auth.user };
		}
		const response = await authServices.getAccessToken();
		return response;
	} catch (error) {
		const message = error.response.data.msg || error.response.statusText || error.message;

		return thunkApi.rejectWithValue(message);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.message = action.payload;
			})
			.addCase(confirmEmail.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(confirmEmail.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload?.user;
				accessToken.setToken(action.payload?.accessToken);
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.status = 'succeeded';
				state.user = null;
				accessToken.setToken('');
			})
			.addCase(logoutUser.rejected, (state) => {
				state.status = 'rejected';
			})
			.addCase(loginUser.pending, (state) => {
				state.status = 'pending';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload?.user;
				accessToken.setToken(action.payload?.accessToken);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.message = action.payload;
			})
			.addCase(getAccessToken.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload.user;
				accessToken.setToken(action.payload.accessToken);
			})
			.addCase(getAccessToken.rejected, (state, action) => {
				state.status = 'failed';
				state.message = action.payload;
				state.user = null;
			});
	},
});

export default authSlice.reducer;
// export const { reg } = authSlice.actions
