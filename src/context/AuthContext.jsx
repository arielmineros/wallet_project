import { createContext, useState, useContext, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import Cookies from "js-cookie";
//import { useAsyncError } from "react-router-dom";
export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const signup = async (user) => {
        try {
            //console.log(values);
            const res = await registerRequest(user);
            console.log(res);
            setUser(res.data);
            setIsAuthenticated(true);
        } catch (error) {
            console.log(error.response.data);
            setErrors(error.response.data);
        }
    };

    const login = async (user) => {
        try {
            const res = await loginRequest(user);
            setUser(res.data);
            setIsAuthenticated(true);
            console.log(res);
        } catch (error) {
            console.log(error);
            //console.log(error.response.data);
            //if (Array.isArray(error.response.data)) {
            //return setErrors(error.response.data.message);
            //}
            //setErrors([error.response.data.message]);
        }
    };
    useEffect(() => {
        const cookies = Cookies.get();
        console.log(cookies);
        if (cookies.token) {
            console.log("token found");
        }
    }, []);

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([]);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [errors]);

    return (
        <AuthContext.Provider
            value={{ signup, login, user, isAuthenticated, errors }}
        >
            {children}
        </AuthContext.Provider>
    );
};
//export default AuthProvider;
