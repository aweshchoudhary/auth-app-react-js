import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@/pages/dashboard/page";
import Login from "@/pages/auth/login/page";
import Register from "@/pages/auth/register/page";
import AuthLayout from "@/pages/auth/auth.layout";

const AppRouter = () => {
  return (
    <Router>
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
      </Routes>
    </Router>
  );
};

export default AppRouter;
