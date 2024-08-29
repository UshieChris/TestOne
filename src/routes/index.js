import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import HomePage from "../pages/Home";
import UserPage from "../pages/User";

const routes = createBrowserRouter([
  {
    path: "/",
    loader: () => {
      throw redirect("/todo");
    },
  },
  {
    path: "/todo",
    element: <HomePage />,
  },
  {
    path: "/inbox",
    element: <UserPage />,
  },
]);

function Router() {
  return <RouterProvider router={routes} />;
}

export default Router;
