// PrivateRoute.jsx
import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { axiosInstance } from "./axiosInstance"; // Assuming this is where your axios instance is

const PrivateRoute = ({ children }) => {
  const [isAuth, setIsAuth] = useState(null); // To track the auth state
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || token === "undefined" || token === "null") {
        setIsAuth(false); // No token, unauthenticated
        return;
      }

      try {
        const res = await axiosInstance.get("/Verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 200) {
          setIsAuth(true); // Token is valid, authenticated
        } else {
          setIsAuth(false); // Invalid token
        }
      } catch (error) {
        setIsAuth(false); // Token verification failed (e.g., expired token)
      }
    };

    verifyToken();
  }, [token]);

  // While verifying, you can show a loading state (optional)
  if (isAuth === null) return null; // Optionally, show a loader here

  // If not authenticated, redirect to login page
  if (isAuth === false) return <Navigate to="/" state={{ from: location }} />;

  // If authenticated, render the protected children
  return children;
};

export default PrivateRoute;
