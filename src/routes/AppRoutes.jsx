import { Navigate } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard";
import ForgotPassword from "../components/ForgotPassword";
import Home from "../components/Home";
import LogIn from "../components/LogIn";
import ResetPassword from "../components/ResetPassword";
import SignUp from "../components/SignUp";
import UserDhashboard from "../components/UserDhashboard";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";

const AppRoutes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/admin-dashboard",
    element: (
      <AdminRoutes>
        <AdminDashboard />
      </AdminRoutes>
    ),
  },
  {
    path: "/user-dashboard",
    element: (
      <UserRoutes>
        <UserDhashboard />
      </UserRoutes>
    ),
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
];

export default AppRoutes;
