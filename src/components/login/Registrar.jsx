import React, { useState } from "react";
import "./css/registrar.css";
import { Outlet, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import registerRequest from "../../api/auth";
//import useState from "react";
import { useAuth } from "../../context/AuthContext";

function Register() {
    const { register, handleSubmit } = useForm();
    //const { signup, user } = useAuth();
    //const [user, setUser] = useState(null);

    //console.log(user);

    const onSubmit = handleSubmit(async (values) => {
        //console.log(values);
        //const res = await registerRequest(user);
        const res = await registerRequest(values);
        //console.log(res);
        //setUser(res.data);
    });
    return (
        <div class="registro">
            <h2>Registrese</h2>
            <form onSubmit={onSubmit}>
                <input
                    type="text"
                    class="text"
                    name="username"
                    {...register("username", { required: true })}
                />
                <span id="input-label">Nombre Completo</span>
                <br />

                <input
                    type="text"
                    class="text"
                    name="email"
                    {...register("email", { required: true })}
                />
                <span id="input-label">Correo</span>
                <br />

                <input type="text" class="text" name="telefono" />
                <span id="input-label">Telefono</span>
                <br />

                <input type="date" class="text" name="edad" />
                <span id="input-label">edad</span>
                <br />

                <input
                    type="password"
                    class="text"
                    name="pass"
                    {...register("password", { required: true })}
                />
                <span id="input-label">contraseña</span>
                <br />
                <input
                    type="password"
                    class="text"
                    name="pass"
                    {...register("password", { required: true })}
                />
                <span id="input-label">confirmar contraseña</span>
                <br />
                <button type="submit" class="signin">
                    Sign UP
                </button>
                <hr />
                <Link to="/Login" class="regis">
                    Login
                </Link>
            </form>
            <Outlet />
        </div>
    );
}
export default Register;
