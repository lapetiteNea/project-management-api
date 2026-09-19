import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { authLoader } from "./routes/authLoader";
import { Dashboard } from "./pages/Dashboard";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    loader: authLoader,
  },
  {
    path: "*",
    element: <Login />,
  },
]);

export const App: React.FC = () => {
  return <RouterProvider router={router} />;
};

export default App;
