import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/dashboard/page";
import Login from "@/pages/auth/login/page";
import VerifyOtp from "@/pages/auth/verify-otp/page";
import Register from "@/pages/auth/register/page";
import Layout from "@/pages/auth/auth.layout";

const AppRouter = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Layout>
          <Routes>
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Layout>
      </Router>
    </div>
  );
};

export default AppRouter;
