import { createContext, useContext, useState } from "react";
import { login } from '../api/auth';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({});

    async function loginAs(email, password) {
        try {
            const res = await login(email, password);

            // if (res.error) {
            //     throw new Error('Network response was not ok');
            // }

            setUser(res.user);
            localStorage.setItem('accessToken', res.accessToken);
            setIsAuthenticated(true);
            return res.user;
        } catch (err) {
            console.error('Login error:', err);
        }
    }

    function logout() {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('accessToken');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loginAs, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}