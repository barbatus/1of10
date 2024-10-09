import { Layout } from "@/pages/layout";
import { Home } from "@/pages/home";

import { createBrowserRouter } from "react-router-dom";

export let router = createBrowserRouter([
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
