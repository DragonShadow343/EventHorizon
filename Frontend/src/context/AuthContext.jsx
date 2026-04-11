import { createContext, useContext, useState } from "react";
import { login } from '../api/auth';
import { updateUserData } from '../api/user';

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const [user, setUser] = useState({});

    async function loginAs(email, password) {
        try {
            const res = await login(email, password);

            if (res.error) {
                throw new Error('Network response was not ok');
            }

            setUser(res.user);
            sessionStorage.setItem('accessToken', res.accessToken);
            setIsAuthenticated(true);
            return res.user;
        } catch (err) {
            console.error('Login error:', err);
            throw err;
        }
    }

    async function updateUser(data) {
        try {
            const res = await updateUserData(data);

            if (!res) return null;

            // merge instead of overwrite to prevent losing auth fields
            setUser((prev) => ({ ...prev, ...res }));

            return res;
        } catch (err) {
            console.error('Update user error:', err);
        }
    }

    function logout() {
        setIsAuthenticated(false);
        setUser(null);
        sessionStorage.removeItem('accessToken');
        sessionStorage.removeItem('refreshToken');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, loginAs, logout, updateUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext);
}