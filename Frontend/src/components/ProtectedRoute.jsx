import { Navigate, Outlet } from 'react-router-dom'
import { useFakeAuth } from '../context/FakeAuthContext'

export function AdminRoute({ children }) {
    const { isAuthenticated, user } = useFakeAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (user && user.role !== "admin") {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
}

export function PrivateRoute({ children, role }) {
    const { isAuthenticated } = useFakeAuth();
    
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}