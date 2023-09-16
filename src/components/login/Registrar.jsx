import React, { useState, useEffect } from "react";

import "./css/registrar.css";

import { Outlet, Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import registerRequest from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth();
    const [username, setUsername] = useState("");
    const [isUsernameErrorVisible, setIsUsernameErrorVisible] = useState(false);
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const navigate = useNavigate();
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        email
    );
    const onSubmit = handleSubmit(async (values) => {
        signup(values);
        //console.log(values);
    });

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        setIsUsernameErrorVisible(false);
    };

    const handleBlur = () => {
        // Mostrar la advertencia si el campo está vacío al perder el foco
        if (username.trim() === "") {
            setIsUsernameErrorVisible(true);
        }
    };
    useEffect(() => {
        const isUsernameValid = username.trim() !== "";
        const isPasswordValid = pass.length >= 6;
        const doPasswordsMatch = pass === confirmPass;

        setIsButtonDisabled(
            !(
                isUsernameValid &&
                isEmailValid &&
                isPasswordValid &&
                doPasswordsMatch
            )
        );
    }, [username, email, pass, confirmPass]);
    //const [user, setUser] = useState(null);
    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated]);

    //console.log(user);

    return (
        <div className="registro">
            <h2>Registrese</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    name="username"
                    className="text"
                    {...register("username", { required: true })}
                    required
                />
                <span id="input-label">Nombre Completo</span>
                <br />
                <input
                    type="text"
                    className="text"
                    name="email"
                    {...register("email", { required: true })}
                    required
                />
                <span id="input-label">Correo</span>
                <br />
                <input
                    type="password"
                    className="text"
                    name="password"
                    {...register("password", { required: true })}
                    required
                />
                <span id="input-label">contraseña</span>
                {RegisterErrors.map((error, i) => (
                    <div id="errors">{error}</div>
                ))}
                <br />
                <button className="signin" type="submit">
                    Sign UP
                </button>
                <hr />
                <br />
                <label htmlFor="">Already have an account? </label>
                <Link to="/Login" className="regis">
                    Login
                </Link>
            </form>
            <Outlet />
        </div>
    );
}

export default Register;
