import { Navigate } from "react-router-dom";
import Context from "../context/index.js";
import { useContext } from "react";

function AdminRouteProtector({ children }) {
    const { userData } = useContext(Context);
    const isAuthenticated = localStorage.getItem("token");

    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    if (userData.role !== "admin") {
        return <Navigate to="/" />;
    }

    return children;
}

export default AdminRouteProtector;
