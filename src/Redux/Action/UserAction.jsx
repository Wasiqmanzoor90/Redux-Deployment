// Redux/Action/UserAction.js

import { apiGet } from "../../utils/Api Call/apiGet";
import { apiPost } from "../../utils/Api Call/apiPost";
import axiosInstance from "../../utils/axiosInstance";

export const handleregister = (e, formData) => apiPost("POST", "/Register", formData, e);
export const HandleLogin = (e, formData) => apiPost("POST", "/Login", formData, e);

export const GetPost = () => async (dispatch) => {
  const data = await apiGet("/GetPostsByUser")(dispatch);
  
  if (data) {
    dispatch({
      type: "SET_POSTS",
      payload: data,
    });
  }
};

export const GetComments = (postId) => async (dispatch) => {
    // Call API to get comments
    const data = await apiGet(`/GetComment/${postId}`)(dispatch);
    console.log("Comments data from API:", data); // Debug log
    
    if (data) {
      // Dispatch action with comments data
      dispatch({
        type: "SET_COMMENTS",
        payload: data,
      });
    } 
};


// In UserAction.js
export const toggleLike = (postId, userId) => async (dispatch) => {
  try {
    dispatch({ type: "API_REQUEST" });
    
    // Use axiosInstance for consistency with your other API calls
    const res = await axiosInstance.post(`/LikeBy/${postId}`, userId);
    
    if (res.status === 200) {
      // Dispatch success action
      dispatch({
        type: "LIKE_POST",
        payload: { postId, userId }
      });
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error toggling like:', error);
    dispatch({
      type: "API_FAILURE",
      error,
      message: error?.response?.data?.message || "Failed to toggle like"
    });
    return false;
  }
};