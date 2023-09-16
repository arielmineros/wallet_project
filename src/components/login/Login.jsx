import React, { useState, useEffect } from "react";
import "./css/login.css";
import { Outlet, Link, useAsyncError, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";

function Login() {
    //const [username, setUsername] = useState("");
    //const [password, setPassword] = useState("");
    //console.log(username);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { login, isAuthenticated, errors: LoginErrors } = useAuth();
    const onSubmit = handleSubmit((data) => {
        //console.log(data);
        login(data);
    });
    useEffect(() => {
        if (isAuthenticated) {
            navigate("/");
        }
    }, [isAuthenticated]);

    return (
        <div class="login">
            <h2>LOGIN</h2>
            <form onSubmit={onSubmit}>
                <input
                    //onChange={(e) => setUsername(e.target.value)}
                    {...register("email", { required: true })}
                    type="email"
                    class="text"
                    name="email"
                />
                <span id="input-label">Email</span>
                <br />
                <br />
                <input
                    {...register("password", { required: true })}
                    type="password"
                    class="text"
                    name="password"
                />
                <span id="input-label">Contraseña</span>
                <br />
                {LoginErrors.map((error, i) => (
                    <div id="errors">{error}</div>
                ))}
                <button class="signin">Sign In</button>
                <hr />
                <a id="forgotten-pass" href="#">
                    Has olvidado tu contraseña?
                </a>
                <Link to="/register" class="regis">
                    Registrate
                </Link>
            </form>
            <Outlet />
        </div>
    );
}
export default Login;
