import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./protected-route";
import Layout from "../components/layout/layout";
import ProtectAuthUsersPage from "../pages/protect-auth-users/protect-auth-users-page";
import LoginPage from "../pages/login/login";
import RegistrationPage from "../pages/registration/registration";

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
          path: "/search",
          element: <div>Search</div>,
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
              path: "user-page",
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
          element: <LoginPage />,
        },
        {
          path: "/registration",
          element: <RegistrationPage />,
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
