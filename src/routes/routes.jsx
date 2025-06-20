import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./protected-route";
import Layout from "../layout/layout";
import ProtectAuthUsersPage from "../pages/protect-auth-users/protect-auth-users-page";

const Routes = () => {
  const { token } = useAuth();

  const routesForPublic = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <div>home page</div>,
        },
        {
          path: "/about-us",
          element: <div>About Us</div>,
        },
      ],
    },
  ];

  const routesForAuthenticatedOnly = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <ProtectedRoute />,
          children: [
            {
              path: "administration",
              element: <div>Admin page</div>,
            },
            {
              path: "userPage",
              element: <div>User Page</div>,
            },
            {
              path: "*",
              element: <ProtectAuthUsersPage />,
            },
          ],
        },
      ],
    },
  ];

  const routesForNotAuthenticatedOnly = [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <div>Login Page</div>,
        },
        {
          path: "/registration",
          element: <div>Registration Page</div>,
        },
      ],
    },
  ];

  const router = createBrowserRouter([
    ...routesForPublic,
    ...(!token ? routesForNotAuthenticatedOnly : []),
    ...routesForAuthenticatedOnly,
  ]);

  return <RouterProvider router={router} />;
};

export default Routes;
