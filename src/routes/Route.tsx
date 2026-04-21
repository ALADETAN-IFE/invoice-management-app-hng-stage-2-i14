import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Layout } from "@/layouts";
import NotFound from "@/pages/NotFound";
import { Dashboard, Invoice } from "@/pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "invoice/:id", element: <Invoice /> },
    ],
  },

  { path: "*", element: <NotFound /> },
]);

export default function AppRoutes() {
  return <RouterProvider router={router} />;
}
