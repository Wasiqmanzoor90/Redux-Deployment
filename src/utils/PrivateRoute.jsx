import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { axiosInstance } from "../utils/axiosInstance";

const PrivateRoute = () => {
  const [isAuth, setIsAuth] = useState(null);
  const token = localStorage.getItem("token");
  const location = useLocation();

  useEffect(() => {
    const verifyToken = async () => {
      if (!token || token === "undefined" || token === "null") {
        setIsAuth(false);
        return;
      }

      try {
        const res = await axiosInstance.get("/Verify", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setIsAuth(res.status === 200);
      } catch (error) {
        setIsAuth(false);
      }
    };

    verifyToken();
  }, [token]);

  if (isAuth === null) return null; // You can return a loader here
  if (isAuth === false) return <Navigate to="/" state={{ from: location }} />;

  return <Outlet />; // 👈 CRUCIAL: this renders the nested routes (Dashboard -> Home)
};

export default PrivateRoute;
