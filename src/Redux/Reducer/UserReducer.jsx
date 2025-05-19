// userReducer.js
import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  userId:"",
  name: "",
  email: "",
  error: null,
  message: "",
  payload: [],
  posts: [],
  comment: [],  // Initialize as empty array
  
  commentsLoading: false,
  isAuthenticated: false,
  // Likes:[]
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("API_REQUEST", (state) => {
      state.error = null;
      state.message = "";
    })
    
    // User verification
    .addCase("VERIFY_SUCCESS", (state, action) => {
      const payload = action.payload || {};
      state.userId = payload.userId || "";
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

    .addCase("LIKE_POST", (state, action) => {
      const { postId, userId } = action.payload;
      const post = state.posts.find(post => post.id === postId);
    
      if (post) {
        post.LikedBy = post.LikedBy || [];
        const likedIndex = post.LikedBy.indexOf(userId);
        
        likedIndex !== -1
          ? post.LikedBy.splice(likedIndex, 1)
          : post.LikedBy.push(userId);
      }
    })
    
    // Set comments with better logging
    .addCase("SET_COMMENTS", (state, action) => {
      state.comment = action.payload || [];
      state.commentsLoading = false;
      console.log("Comments in reducer after setting:", state.comment);
    });
});
