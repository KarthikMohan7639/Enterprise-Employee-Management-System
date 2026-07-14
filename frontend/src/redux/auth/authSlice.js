import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    token: null,
    refreshToken: null,
    user: null,
    loading: false,
    error: null
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {

        loginStart: (state) => {
            state.loading = true;
            state.error = null;
        },

        loginSuccess: (state, action) => {

            state.loading = false;
            state.isAuthenticated = true;
            state.token = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
            state.user = null;

        },

        loginFailure: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },

        logout: (state) => {
            state.isAuthenticated = false;
            state.token = null;
            state.refreshToken = null;
            state.user = null;
            state.loading = false;
            state.error = null;
        }

    }
});

export const {
    loginStart,
    loginSuccess,
    loginFailure,
    logout
} = authSlice.actions;

export default authSlice.reducer;