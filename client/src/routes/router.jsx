import { createBrowserRouter } from "react-router-dom";

import App from "../App";
import Signup from "../pages/signup";
import Login from "../pages/login";
import Homepage from "../pages/homepage";
import Account from "../pages/Account";
import Cart from "../pages/Cart";
import AdminPanel from "../pages/AdminPanel";
import Users from "../pages/adminPanel/Users";
import ProductManagement from "../pages/adminPanel/ProductManagement";
import Orders from "../pages/adminPanel/Orders";
import Banner from "../pages/adminPanel/Banner";
import CategoryPage from "../pages/CategoryPage";

import AuthRouteProtector from "../utils/AuthRouteProtector";
import PublicRoute from "../utils/PublicRoute";
import AdminRouteProtector from "../utils/AdminRouteProtector";
import ProductDisplayCard from "../pages/ProductDisplayCard";
import NotFound from "../pages/NotFound";
import CheckOut from "../pages/CheckOut";
import OrderSuccess from "../pages/OrderSuccess";
import { OrderCancel } from "../pages/OrderCancel";
import SearchProducts from "../pages/SearchProducts";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Homepage />,
                children: [
                    {
                        path: "product/:id",
                        element: <ProductDisplayCard />,
                    },
                ],
            },
            {
                path: "/login",
                element: (
                    <PublicRoute>
                        <Login />
                    </PublicRoute>
                ),
            },
            {
                path: "/signup",
                element: (
                    <PublicRoute>
                        <Signup />
                    </PublicRoute>
                ),
            },
            {
                path: "/account",
                element: (
                    <AuthRouteProtector>
                        <Account />
                    </AuthRouteProtector>
                ),
            },
            {
                path: "/cart",
                element: (
                    <AuthRouteProtector>
                        <Cart />
                    </AuthRouteProtector>
                ),
            },
            {
                path: "/paypal-return",
                element: (
                    <AuthRouteProtector>
                        <OrderSuccess />
                    </AuthRouteProtector>
                ),
            },
            {
                path: "/paypal-cancel",
                element: (
                    <AuthRouteProtector>
                        <OrderCancel />
                    </AuthRouteProtector>
                ),
            },
            {
                path: "/check-out",
                element: (
                    <AuthRouteProtector>
                        <CheckOut />
                    </AuthRouteProtector>
                ),
                children: [
                    {
                        path: ":id",
                        element: <CheckOut />,
                    },
                ],
            },
            {
                path: ":category",
                element: <CategoryPage />,
                children: [
                    {
                        path: "product/:id",
                        element: <ProductDisplayCard />,
                    },
                ],
            },
            {
                path: "search",
                element: <SearchProducts />,
            },
            {
                path: "/admin-panel",
                element: (
                    <AdminRouteProtector>
                        <AdminPanel />
                    </AdminRouteProtector>
                ),
                children: [
                    {
                        path: "",
                        element: <Users />,
                    },
                    {
                        path: "products",
                        element: <ProductManagement />,
                    },
                    {
                        path: "orders",
                        element: <Orders />,
                    },
                    {
                        path: "banner",
                        element: <Banner />,
                    },
                ],
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);

export default router;
