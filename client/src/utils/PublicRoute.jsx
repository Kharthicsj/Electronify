import { Navigate } from "react-router-dom";

function PublicRoute({ children }) {
    const isAuthenticated = localStorage.getItem("token");
    return isAuthenticated ? <Navigate to="/" /> : children;
}

export default PublicRoute;
