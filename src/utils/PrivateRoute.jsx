import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux"; // Import dispatch

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const [error, setError] = useState(null);
  const location = useLocation();
  const dispatch = useDispatch(); // Init Redux dispatch

  useEffect(() => {
    console.log("🔍 PrivateRoute mounted");

    const verifyToken = async () => {
      try {
        console.log("🔄 Sending verification request...");

        const res = await axiosInstance.get("/verify", {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          }
        });
      
        console.log(" /verify success:", res.data);
      
        // Dispatch user info to Redux here
        dispatch({
          type: "USER_VERIFY_SUCCESS",
          payload: res.data,
        });
      
       
        

        setIsAuth(true);
        setError(null);
      } catch (error) {
        console.error("❌ /verify error:", error);
        setIsAuth(false);
      }
    };

    verifyToken();
  }, [dispatch]); // 🔸 Include dispatch in dependency array

  if (isAuth === null) {
    return (
      <div className="auth-loading">
        <p>Verifying authentication...</p>
      </div>
    );
  }

  if (isAuth === false) {   
 return <Navigate to="/" state={{ from: location, authError: error }} />;
  }

  return <Outlet />;
};

export default PrivateRoute;
