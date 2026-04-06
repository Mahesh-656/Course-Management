import React from "react";
import "./App.css";
import Layout from "./pages/Layout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import CourseList from "./pages/CourseList";
import Cart from "./pages/Cart";
import UpdateCourse from "./pages/UpdateCourse";
import AddCourse from "./pages/AddCourse";
import ProtectedRoutes from "./route/ProtectedRoutes";

const App = () => {
  let router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/signup",
          element: <SignUp />,
        },
        {
          path: "/",
          element: (
            <ProtectedRoutes>
              <CourseList />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/cart",
          element: (
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
          ),
        },
        {
          path: "/update/:id",
          element: <UpdateCourse />,
        },
        {
          path: "/add",
          element: <AddCourse />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};

export default App;
