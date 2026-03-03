import { createContext, useContext, useState } from "react";

const FakeAuthContext = createContext();

export function FakeAuthContextProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const [user, setUser] = useState({
        id: "123",
        name: "John Doe",
        email: "john.doe@gmail.com",
        role: "user", // swap with "admin" to access admin routes
    });

    function loginAs(role = "user") {
        setIsAuthenticated(true);
        setUser({
            id: "123",
            name: "John Doe",
            email: "john@example.com",
            role,
        });
    }

    function logout() {
        setIsAuthenticated(false);
        setUser(null);
    }

    return (
        <FakeAuthContext.Provider value={{ isAuthenticated, user, loginAs, logout }}>
            {children}
        </FakeAuthContext.Provider>
    )
}

export function useFakeAuth() {
    return useContext(FakeAuthContext)
}