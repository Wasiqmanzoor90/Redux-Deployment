

import { apiPost } from "../../utils/Api Call/apiPost";



export const handleregister = (e, formData) => apiPost("POST", "/Register", formData, e);
export const HandleLogin =(e, formData)=> apiPost("POST", "/Login", formData, e);
// Redux/Action/UserAction.js
export const verifyUser = (userData) => {
    return {
      type: "VERIFY_USER",  // Action type to store user data in Redux
      payload: userData,    // User data returned from the /Verify API
    };
  };
  
