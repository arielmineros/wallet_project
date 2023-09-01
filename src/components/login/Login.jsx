import React from "react";
import "./css/login.css";
import { Outlet, Link } from "react-router-dom";

function Login() {
    return (
        <div class="login">
            <h2>LOGIN</h2>
            <form method="POST">
                <input type="text" class="text" name="username" />
                <span id="input-label">Usuario</span>
                <br />
                <br />
                <input type="password" class="text" name="password" />
                <span id="input-label">Contraseña</span>
                <br />
                <input
                    type="checkbox"
                    id="checkbox-1-1"
                    class="custom-checkbox"
                />
                <label className="keep-logged" for="checkbox-1-1">
                    Mantenerse Registrado
                </label>
                <button class="signin">Sign In</button>
                <hr />
                <a id="forgotten-pass" href="#">
                    Has olvidado tu contraseña?
                </a>
                <Link to="/Registrar" class="regis">
                    Registrate
                </Link>
            </form>
            <Outlet />
        </div>
    );
}
export default Login;
