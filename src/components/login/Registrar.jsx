import React from "react";
import "./css/registrar.css";
import { Outlet, Link } from "react-router-dom";

function RegisTro() {
    return (
        <div class="registro">
            <h2>Registrese</h2>
            <form method="POST">
                <input type="text" class="text" name="username" />
                <span id="input-label">Nombre Completo</span>
                <br />

                <input type="text" class="text" name="email" />
                <span id="input-label">Correo</span>
                <br />

                <input type="text" class="text" name="telefono" />
                <span id="input-label">Telefono</span>
                <br />

                <input type="date" class="text" name="edad" />
                <span id="input-label">edad</span>
                <br />

                <input type="password" class="text" name="pass" />
                <span id="input-label">contraseña</span>
                <br />
                <input type="password" class="text" name="pass" />
                <span id="input-label">confirmar contraseña</span>
                <br />
                <button class="signin">Sign UP</button>
                <hr />
                <Link to="/Login" class="regis">
                    Login
                </Link>
            </form>
            <Outlet />
        </div>
    );
}
export default RegisTro;
