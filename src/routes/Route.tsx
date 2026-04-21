import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/layouts";
import NotFound from "@/pages/NotFound";
import { Dashboard } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [{ index: true, element: <Dashboard /> }],
  },

  { path: "*", element: <NotFound /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
