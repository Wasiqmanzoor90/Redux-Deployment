import { createReducer } from "@reduxjs/toolkit";

const initialState = {
    username: "",
    email: "",
    error: null,
    message: "",
    payload: []
};

export const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase("API_REQUEST", (state) => {
            state.error = null;
            state.message = "Loading...";
        })
        .addCase("API_SUCCESS", (state, action) => {
            const { username, email, message } = action.payload;
            state.username = username;
            state.email = email;
            state.message = message || "Registration successful";
            state.payload = action.payload;
            state.error = null;
        })
        .addCase("API_FAILURE", (state, action) => {
            state.error = action.error;
            state.message = action.message || "Registration failed";
        });
});
