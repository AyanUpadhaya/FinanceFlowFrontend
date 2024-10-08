import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import Login from "../authentication/Login";
import Registration from "../authentication/Registration";
import ForgotPasword from "../authentication/ForgotPasword";
import ResetPassword from "../authentication/ResetPassword";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout></Layout>
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
    ],
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/registration",
    element: <Registration></Registration>,
  },
  {
    path: "/forgot-password",
    element: <ForgotPasword></ForgotPasword>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword></ResetPassword>,
  },

  {
    path: "*",
    element: <NotFound></NotFound>,
  },
]);
