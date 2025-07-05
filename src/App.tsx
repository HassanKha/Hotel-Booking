import { Suspense } from "react";
import Landing from "./modules/pages/User/Landing/Landing";
import NotFound from "./modules/shared/NotFound/NotFound";
import Dashboard from "./modules/pages/Admin/Dashboard/Dashboard";
import ProtectedRoute from "./modules/shared/ProtectedRoute/ProtectedRoute";
import MasterLayout from "./modules/layouts/MasterLayout.css/MasterLayout";
import ChangePassword from "./modules/auth/ChangePassword/ChangePassword";
import ForgetPassword from "./modules/auth/ForgetPassword/ForgetPassword";
import Register from "./modules/auth/Register/Register";
import Login from "./modules/auth/Login/Login";
import AuthLayout from "./modules/layouts/AuthLayout/AuthLayout";
import { lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  type RouteObject,
} from "react-router-dom";
import ResetPassword from "./modules/auth/ResetPassword/ResetPassword";
import { ToastContainer } from "react-toastify";
const Ads = lazy(() => import("./modules/pages/Admin/Dashboard/Ads/AdsList/Ads"));
const Facilities = lazy(() => import("./modules/pages/Admin/Dashboard/Facilities/FacilitesList/Facilities"));
const Bookings = lazy(() => import("./modules/pages/Admin/Dashboard/Bookings/BookingList/Bookings"));
const Rooms = lazy(() => import("./modules/pages/Admin/Dashboard/Rooms/RoomsList/Rooms"));
const Users = lazy(() => import("./modules/pages/Admin/Dashboard/Users/UsersList/Users"));
const UserData = lazy(() => import("./modules/pages/Admin/Dashboard/Users/UsersData/UserData"));
const RoomData = lazy(() => import("./modules/pages/Admin/Dashboard/Rooms/RoomsData/RoomData"));
const BookingData = lazy(() => import("./modules/pages/Admin/Dashboard/Bookings/BookingData/BookingData"));
const FacilitesData = lazy(() => import("./modules/pages/Admin/Dashboard/Facilities/FacilitesData/FacilitesData"));
const AdData = lazy(() => import("./modules/pages/Admin/Dashboard/Ads/AdData/AdData"));
const UsersUpdate = lazy(() => import("./modules/pages/Admin/Dashboard/Users/UsersUpdate/UsersUpdate"));

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
         {
          path: "users-update",
          element: (
            <Suspense fallback={null}>
              <UsersUpdate />
            </Suspense>
          ),
        },
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
          path: "users",
          element: (
            <Suspense fallback={null}>
              <Users />
            </Suspense>
          ),
        },
         
        {
          path: "rooms",
          element: (
            <Suspense fallback={null}>
              <Rooms />
            </Suspense>
          ),
        },
        {
          path: "bookings",
          element: (
            <Suspense fallback={null}>
              <Bookings />
            </Suspense>
          ),
        },
        {
          path: "facilities",
          element: (
            <Suspense fallback={null}>
              <Facilities />
            </Suspense>
          ),
        },
        {
          path: "ads",
          element: (
            <Suspense fallback={null}>
              <Ads />
            </Suspense>
          ),
        },
        {
          path: "users-data",
          element: (
            <Suspense fallback={null}>
              <UserData />
            </Suspense>
          ),
        },
       
        {
          path: "rooms-data",
          element: (
            <Suspense fallback={null}>
              <RoomData />
            </Suspense>
          ),
        },
        {
          path: "bookings-data",
          element: (
            <Suspense fallback={null}>
              <BookingData />
            </Suspense>
          ),
        },
        {
          path: "facilities-data",
          element: (
            <Suspense fallback={null}>
              <FacilitesData />
            </Suspense>
          ),
        },
        {
          path: "ads-data",
          element: (
            <Suspense fallback={null}>
              <AdData />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/landing",
      element: <Landing />,
      children: [
        {
          index: true,
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
      <ToastContainer position="top-right" autoClose={3000} />
      <RouterProvider router={createBrowserRouter(routes)} />
    </>
  );
}

export default App;
