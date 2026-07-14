import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { storage } from "../utils/storage";

export default function ProtectedRoute({ children }) {

    const auth = useSelector(state => state.auth);

    const token = storage.getToken();

    if (!auth.isAuthenticated && !token) {
        return <Navigate to="/" replace />;
    }

    return children;
}