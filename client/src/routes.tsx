import { createBrowserRouter, Navigate } from "react-router";
// import { lazy } from "react";
// Lazy load pages for better performance
import App from "@/App";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Upload from "./pages/Upload";
import Search from "./pages/Search";
import ProtectedRoute from "./components/Auth/ProtectedRoute";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path:"/upload",
        element: <ProtectedRoute><Upload/></ProtectedRoute>
      },
      {
        path:"/search",
        element: <ProtectedRoute><Search/></ProtectedRoute>
      }
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" />,
  },
]);

export default router;
