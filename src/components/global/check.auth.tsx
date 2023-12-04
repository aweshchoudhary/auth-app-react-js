import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckAuth = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const checkAccess = () => {
      const publicPaths = ["/login", "/verify-otp", "/register"];
      const accessToken = localStorage.getItem("accessToken") ?? null;
      if (!accessToken && !publicPaths.includes(pathname)) navigate("/login");
      if (accessToken && publicPaths.includes(pathname)) navigate("/");
    };
    checkAccess();
  }, [pathname]);
  return <></>;
};

export default CheckAuth;
