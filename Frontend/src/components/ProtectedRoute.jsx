import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function AdminRoute({ children }) {
    const { isAuthenticated, user } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user && user.role !== "admin") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}

export function PrivateRoute({ children, role }) {
    const { isAuthenticated } = useAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}