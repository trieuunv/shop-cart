import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthService, LocalStorageService } from "../../services";

export const login = createAsyncThunk('auth/login', async (data, { rejectWithValue }) => { 
    try { 
        const response = await AuthService.login(data); 
        LocalStorageService.set(LocalStorageService.OAUTH_TOKEN, response.data.accessToken); 
        LocalStorageService.set(LocalStorageService.REFRESH_TOKEN, response.data.refreshToken); 
        return response.data; 
    } catch (err) { 
        const errorResponse = {
            status: err.response?.status,
            data: err.response?.data
        };

        return rejectWithValue(errorResponse); 
    } 
});

export const register = createAsyncThunk('auth/register', async (data, { rejectWithValue }) => {
    try {
        const response = await AuthService.register(data);
        const { refreshToken, accessToken, tokenType, expiresIn, emailVerificationToken } = response;
        LocalStorageService.set(LocalStorageService.OAUTH_TOKEN, accessToken); 
        LocalStorageService.set(LocalStorageService.REFRESH_TOKEN, refreshToken); 
        LocalStorageService.set(LocalStorageService.EMAIL_VERIFICATION_TOKEN, emailVerificationToken); 

        return response.data;
    } catch (err) {
        const errorResponse = {
            status: err.response?.status,
            data: err.response?.data
        };
        return rejectWithValue(errorResponse); // Trả về lỗi
    }
});


const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        error: null
    },
    reducers: {
        setAuthenticated: (state, action) => {
            state.authenticated = action.payload
        }
    },
    extraReducers(builder) {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.authenticated = true; 
                state.error = null;
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload.data.error;
            })

            .addCase(register.fulfilled, (state, action) => {
                state.authenticated = true;
                state.error = null;
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload.data.error;
            });
    }
});

export const { setAuthenticated } = authSlice.actions;

export default authSlice.reducer;
