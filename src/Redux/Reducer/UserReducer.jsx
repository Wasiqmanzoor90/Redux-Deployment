import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  name: "", // User's name (or any other user-related information)
  error: null, // For storing error messages
  payload: [], // To store any data (perhaps from an API response)

};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // Handling API_REQUEST: This is when you start making an API request
    .addCase("API_REQUEST", (state) => {
      state.error = null; // Clear error message
      state.message = "";  // Clear any message
    })
    // Handling API_SUCCESS: This is when the API request is successful
    .addCase("API_SUCCESS", (state, action) => {
      const { name } = action.payload; // Assume the API response contains name and message
      state.name = name || state.name; // If name is returned, update it
      state.payload = action.payload; // Store the complete payload (response data)
      state.error = null; // Clear any existing error message
    })
    // Handling API_FAILURE: This is when the API request fails
    .addCase("API_FAILURE", (state, action) => {
      state.error = action.error || "Request failed"; // Set error message, fallback to default
      state.message = action.message || ""; // Optional: Store any failure message
    });
});
