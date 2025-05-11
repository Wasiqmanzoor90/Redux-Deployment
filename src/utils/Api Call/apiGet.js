import { axiosInstance } from "../axiosInstance";

export const apiGet = (url, id) => async (dispatch) => {
    try {
      dispatch({ type: "API_REQUEST" });
  
      const endpoint = id !== undefined ? `${url}/${id}` : url;
      const res = await axiosInstance.get(endpoint);
  
      console.log('API Response:', res); // Log the full response
  
      if (res.status === 200) {
        // Directly dispatch the data array from the response
        dispatch({
          type: "API_SUCCESS",
          payload: res.data,  // Directly assign the array here
          message: res.data.message,
          username: res.data.name,
          email: res.data.email,
        });
        return res.data;  // Return the posts array
      } else {
        return null;
      }
    } catch (error) {
      console.error('Error in API call:', error);
      dispatch({
        type: "API_FAILURE",
        error: error,
        message: error?.response?.data?.message || "Request failed",
      });
      return null;
    }
  };
  