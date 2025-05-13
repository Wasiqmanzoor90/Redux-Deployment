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

// Add request interceptor for debugging
axiosInstance.interceptors.request.use(
  config => {
    console.log(`📤 Request: ${config.method?.toUpperCase()} ${config.url}`);
    console.log('Request headers:', config.headers);
    
    // Check if cookies are attached
    console.log('Cookies present:', document.cookie ? 'Yes' : 'No');
    if (document.cookie) {
      console.log('Cookie string:', document.cookie);
    }
    
    // Check specifically for auth token in headers
    const authHeader = config.headers['Authorization'];
    console.log('Authorization header:', authHeader || 'Not present');
    
    return config;
  },
  error => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for debugging
axiosInstance.interceptors.response.use(
  response => {
    console.log(`📥 Response: ${response.status} from ${response.config.url}`);
    return response;
  },
  error => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error(`❌ Response error: ${error.response.status} from ${error.config?.url}`);
      console.error('Error response data:', error.response.data);
      console.error('Error response headers:', error.response.headers);
      
      // Handle 401 errors globally - redirect to login or refresh token
      if (error.response.status === 401) {
        console.log('🔑 Authentication failed. Redirecting or refreshing token...');
        // You could dispatch an action to your auth state manager here
        // or redirect to login
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('❌ No response received:', error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('❌ Request setup error:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export default axiosInstance;