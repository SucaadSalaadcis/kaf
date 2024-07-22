import {
  createBrowserRouter,
} from "react-router-dom";

import App from "../App";
import Home from "../pages/home/Home";
import SignUp from '../components/SignUp'

import About from "../pages/about/About";
import DashboardLayout from "../dashboard/DashboardLayout";
import UploadElec from "../dashboard/UploadElec";
import ManageElec from "../dashboard/ManageElec";
import EditElec from "../dashboard/EditElec";
import AllTotal from "../dashboard/AllTotal";
import UpdateProfile from "../UpdateProfile/UpdateProfile";
import ProductList from "../pages/shop/ProductList";
import CartPage from "../pages/cart/CartPage";
import Users from "../dashboard/Users";
import Proceed from "../pages/cart/Proceed";
import Orders from "../dashboard/Orders";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />
      },

      {
        path: "/menu",
        element: <ProductList />
      },
      {
        path: "/cart-page",
        element: <CartPage />
      },

      {
        path: "/about",
        element: <About />
      },
      {
        path: "/update-profile",
        element: <UpdateProfile />
      },
    ]
  },
  {
    path: "/dakashfbon",
    element: <DashboardLayout />,
    children: [
      {
        path: "/dakashfbon/total",
        element: <AllTotal />
      },
      {
        path: "/dakashfbon/upload",
        element: <UploadElec />
      },
      {
        path: "/dakashfbon/manage",
        element: <ManageElec />
      },
      {
        path: "/dakashfbon/users",
        element: <Users />
      },
      {
        path: "/dakashfbon/orders",
        element: <Orders />
      },
      {
        path: "/dakashfbon/edit/:id",
        element: <EditElec />,
        loader: ({ params }) => fetch(`https://kafoon.onrender.com/electronic/${params.id}`)
      },

    ]
  },
  // sign up diffrent route
  {
    path: "/signup",
    element: <SignUp />
  },
  {
    path: "/proceed",
    element: <Proceed />
  }

]);

export default router;