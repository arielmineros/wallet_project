import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Outlet, Link, useNavigate } from "react-router-dom";
import registerRequest from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import "./css/registrar.css";

function Register() {
    
    const { control,register, handleSubmit, setError, formState: { errors } } = useForm(); // Inicializa useForm
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
                <Controller
                    name="username"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Nombre Completo es requerido" }}
                    render={({ field }) => (
                        <>
                            <input
                                type="text"
                                name="username"
                                className="text"
                                {...register("username", { required: true })}
                                required
                            />
                            <span id="input-label">Nombre Completo</span>
                        </>
                    )}
                />
                {errors.username && <div id="errors">{errors.username.message}</div>}
                <br />
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: "Correo es requerido",
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: "Correo no válido",
                        },
                    }}
                    render={({ field }) => (
                        <>
                             <input
                                type="text"
                                className="text"
                                name="email"
                                {...register("email", { required: true })}
                                required
                            />
                            <span id="input-label">Correo</span>
                        </>
                    )}
                />
                {errors.email && <div id="errors">{errors.email.message}</div>}
                <br />
                <Controller
                    name="password"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Contraseña es requerida", minLength: { value: 6, message: "La contraseña debe tener al menos 6 caracteres" } }}
                    render={({ field }) => (
                        <>
                            <input
                                type="password"
                                className="text"
                                name="password"
                                {...register("password", { required: true })}
                                required
                            />
                            <span id="input-label">Contraseña</span>
                        </>
                    )}
                />
                {errors.password && <div id="errors">{errors.password.message}</div>}
                <br />
                {RegisterErrors.map((error, i) => (
                    <div id="errors" key={i}>{error}</div>
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