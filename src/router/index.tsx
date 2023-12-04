import { Route, Routes } from "react-router-dom";
import Home from "@/pages/dashboard/page";
import Login from "@/pages/auth/login/page";
import Register from "@/pages/auth/register/page";
import AuthLayout from "@/pages/auth/auth.layout";
import UsersManagementPage from "@/pages/users/page";
import CheckAuth from "@/components/global/check.auth";

const AppRouter = () => {
  return (
    <div>
      <CheckAuth />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <AuthLayout>
              <Login />
            </AuthLayout>
          }
        />
        <Route
          path="/register"
          element={
            <AuthLayout>
              <Register />
            </AuthLayout>
          }
        />
        <Route path="/admin/users" element={<UsersManagementPage />} />
      </Routes>
    </div>
  );
};

export default AppRouter;
