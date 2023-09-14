import { createContext, useState, useContext } from "react";
import registerRequest from "../api/auth";
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
    const signup = async (user) => {
        //console.log(values);
        const res = await registerRequest(user);
        //console.log(res);
        setUser(res.data);
    };
    return (
        <AuthContext.Provider value={{ signup, user }}></AuthContext.Provider>
    );
};
//export default AuthProvider;
