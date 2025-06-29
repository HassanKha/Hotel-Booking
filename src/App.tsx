import { Suspense } from "react";
import Landing from "./modules/pages/Landing/Landing";
import NotFound from "./modules/shared/NotFound/NotFound";
import Dashboard from "./modules/pages/Dashboard/Dashboard";
import ProtectedRoute from './modules/shared/ProtectedRoute/ProtectedRoute';
import MasterLayout from "./modules/layouts/MasterLayout.css/MasterLayout";
import Verify from "./modules/auth/Verify/Verify";
import ChangePassword from "./modules/auth/ChangePassword/ChangePassword";
import ForgetPassword from "./modules/auth/ForgetPassword/ForgetPassword";
import Register from "./modules/auth/Register/Register";
import Login from "./modules/auth/Login/Login";
import AuthLayout from "./modules/layouts/AuthLayout/AuthLayout";
import { createBrowserRouter, RouterProvider, type RouteObject } from "react-router-dom";
import ResetPassword from "./modules/auth/ResetPassword/ResetPassword";


function App() {

const routes: RouteObject[] = [
  {
    path: "",
    element: <AuthLayout />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Login /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "forget-password", element: <ForgetPassword /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "change-password", element: <ChangePassword /> },
      { path: "verify-account", element: <Verify /> },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <MasterLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={null}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "landing",
        element: (
          <Suspense fallback={null}>
            <Landing />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

  return (
    <>
   
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  )
}

export default App
