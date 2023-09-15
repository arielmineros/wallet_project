import React, { useState, useEffect } from "react";

import "./css/registrar.css";

import { Outlet, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import registerRequest from "../../api/auth";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const [username, setUsername] = useState("");
    const [isUsernameErrorVisible, setIsUsernameErrorVisible] = useState(false);
    const [email, setEmail] = useState("");
    //const [telefono, setTelefono] = useState("");
    //const [edad, setEdad] = useState("");
    const [pass, setPass] = useState("");
    const [confirmPass, setConfirmPass] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(
        email
    );
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
    const { register, handleSubmit } = useForm();
    //const { signup, user } = useAuth();
    const [user, setUser] = useState(null);

    //console.log(user);

    //const onSubmit = handleSubmit(async (values) => {
    ////console.log(values);
    ////const res = await registerRequest(user);
    //const res = await registerRequest(values);
    //console.log(res);
    //setUser(res.data);
    //});

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
    return (
        <div className="registro">
            <h2>Registrese</h2>
            <form
                onSubmit={handleSubmit(async (values) => {
                    const res = await registerRequest(values);
                    setUser(res);
                })}
            >
                <input
                    type="text"
                    {...register("username", { required: true })}
                    className="text"
                    name="username"
                    //value={username}
                    //onChange={handleUsernameChange}
                    //onBlur={handleBlur}
                />
                <span id="input-label">Nombre Completo</span>

                <br />

                <input
                    type="text"
                    className="text"
                    {...register("email", { required: true })}
                    name="email"
                    //value={email}
                    //onChange={(event) => setEmail(event.target.value)}
                    required
                />
                <span id="input-label">Correo</span>
                <br />

                <input
                    type="password"
                    className="text"
                    {...register("password", { required: true })}
                    name="pass"
                    //value={pass}
                    //onChange={(event) => setPass(event.target.value)}
                    required
                />
                <span id="input-label">contraseña</span>
                <br />

                <input
                    type="password"
                    {...register("password", { required: true })}
                    className="text"
                    name="confirmPass"
                    //value={confirmPass}
                    //onChange={(event) => setConfirmPass(event.target.value)}
                    required
                />

                <button className="signin" type="submit">
                    Sign UP
                </button>
                <hr />
                <Link to="/Login" className="regis">
                    Login
                </Link>
            </form>
            <Outlet />
        </div>
    );
}

export default Register;
