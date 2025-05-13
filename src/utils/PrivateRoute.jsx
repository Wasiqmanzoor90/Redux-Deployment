import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();

  useEffect(() => {
    console.log("🔍 PrivateRoute mounted");

    const verifyToken = async () => {
      try {
        console.log("🔄 Sending verification request...");
        
        // Add specific headers that might be required by your backend
        const res = await axiosInstance.get("/verify", {
          withCredentials: true, // This ensures cookies are sent with the request
          headers: {
            'Content-Type': 'application/json',
            // Add any additional headers your API might expect
          }
        });
        
        console.log("✅ /verify success:", res.data);
        setIsAuth(true);
        setError(null);
      } catch (error) {
        console.error("❌ /verify error:", error);
        console.log("Status:", error.response?.status);
        console.log("Error data:", error.response?.data);
        
        // Store error details for debugging display
        setError({
          status: error.response?.status,
          message: error.response?.data?.message || error.message,
          details: error.response?.data
        });
        
        setIsAuth(false);
      }
    };

    verifyToken();
  }, []);

  // Render loading indicator while checking auth
  if (isAuth === null) {
    return (
      <div className="auth-loading">
        <p>Verifying authentication...</p>
      </div>
    );
  }

  // If not authorized, show error details before redirecting
  if (isAuth === false) {
    console.log("Authentication failed, redirecting to login");
    
    // You can display error details temporarily for debugging
    // Remove in production or add a flag for development mode only
    if (error) {
      console.log("Auth Error Details:", error);
    }
    
    return <Navigate to="/" state={{ from: location, authError: error }} />;
  }

  // If authorized, render the nested routes
  return <Outlet />;
};

export default PrivateRoute;