import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CheckLogin = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  useEffect(() => {
    const checkLogged = () => {
      const data = localStorage.getItem("data") ?? null;
      if (!data && pathname !== "/login" && pathname !== "/verify-otp")
        navigate("/register");
    };
    checkLogged();
  }, [pathname]);
  return <></>;
};

export default CheckLogin;
