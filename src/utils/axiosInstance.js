import axios from "axios";
import Cookies from 'js-cookie';

// Create axios instance with base configuration
export const axiosInstance = axios.create({
  baseURL: 'https://localhost:7023/api/User',
  withCredentials: true, // Send cookies with all requests
  headers: {
    'Content-Type': 'application/json',
  }
});

// Function to get the auth token from multiple sources
export const getAuthToken = () => {
  // First try to get from js-cookie (for non-HttpOnly cookies)
  let token = Cookies.get('token');
  
  // If not found, try localStorage as fallback
  if (!token) {
    token = localStorage.getItem('authToken');
  }
  
  return token;
};

// Add auth token to every request if it exists
axiosInstance.interceptors.request.use(request => {
  const token = getAuthToken();
  
  if (token) {
    // Add the token to Authorization header
    request.headers['Authorization'] = `Bearer ${token}`;
    console.log('🔑 Token added to request headers');
  } else {
    console.log('⚠️ No auth token found in cookies or localStorage');
  }
  
  return request;
});
export default axiosInstance;