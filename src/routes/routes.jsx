import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./protected-route";
import Layout from "../components/layout/layout";
import ProtectAuthUsersPage from "../pages/protect-auth-users/protect-auth-users-page";
import LoginPage from "../pages/login/login";
import RegistrationPage from "../pages/registration/registration";
import AdminPage from "../pages/admin/admin";
import TemplatePage from "../pages/template/template";
import ProfilePage from "../pages/profile/profile";
import FormPage from "../pages/form/form";

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
        {
          path: "/template/:id",
          element: <TemplatePage />,
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
              element: <AdminPage />,
            },
            {
              path: "/profile/:id",
              element: <ProfilePage />,
            },
            {
              path: "/form/:id",
              element: <FormPage />,
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
