import { createBrowserRouter } from "react-router-dom";

import { Home } from "@/pages/home";
import { Layout } from "@/pages/layout";

export const router: ReturnType<typeof createBrowserRouter> =
  createBrowserRouter([
    {
      path: "/",
      Component: Layout,
      children: [
        {
          index: true,
          Component: Home,
        },
      ],
    },
  ]);
