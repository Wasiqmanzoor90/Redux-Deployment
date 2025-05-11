import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  name: "",         // User's name
  error: null,      // Error message
  message: "",      // Success/failure message
  payload: [],      // General-purpose API data
  posts: [],        // Store posts here
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    // API request started
    .addCase("API_REQUEST", (state) => {
      state.error = null;
      state.message = "";
    })

    // API success
    .addCase("API_SUCCESS", (state, action) => {
      const { name, message } = action.payload || {};
      state.name = name || state.name;
      state.payload = action.payload;
      state.error = null;
      state.message = message || "";
    })

    // API failure
    .addCase("API_FAILURE", (state, action) => {
      state.error = action.error?.message || "Request failed";
      state.message = action.message || "";
    })

    // Set posts (from /GetPostsByUser)
    .addCase("SET_POSTS", (state, action) => {
      state.posts = action.payload;
    });
});
