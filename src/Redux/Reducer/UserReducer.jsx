// userReducer.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
  error: null,
  message: "",
  payload: [],
  posts: [],
  comment: [],  // Initialize as empty array
  commentsLoading: false,
  isAuthenticated: false
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("API_REQUEST", (state) => {
      state.error = null;
      state.message = "";
    })
    
    // User verification
    .addCase("USER_VERIFY_SUCCESS", (state, action) => {
      const payload = action.payload || {};
      
      state.name = payload.name || "";
      state.email = payload.email || "";
      state.message = payload.message || "";
      state.isAuthenticated = !!(payload.name || payload.email);
    })
    
    // Old VERIFY_USER case (if still needed)
    .addCase("VERIFY_USER", (state, action) => {
      const payload = action.payload || {};
      
      state.name = payload.name || "";
      state.email = payload.email || "";
      state.message = payload.message || "";
      state.isAuthenticated = !!(payload.name || payload.email);
    })
    
    .addCase("API_FAILURE", (state, action) => {
      state.error = action.error?.message || "Request failed";
      state.message = action.message || "";
      state.isAuthenticated = false;
    })
    
    .addCase("SET_POSTS", (state, action) => {
      state.posts = action.payload;
    })
    
    // Set comments with better logging
    .addCase("SET_COMMENTS", (state, action) => {
      state.comment = action.payload || [];
      state.commentsLoading = false;
      console.log("Comments in reducer after setting:", state.comment);
    });
});