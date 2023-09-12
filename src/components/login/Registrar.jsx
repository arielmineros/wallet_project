import React, { useState, useEffect } from "react";
import "./css/registrar.css";

import { Outlet, Link } from "react-router-dom";
// gfhgjkkll
function RegisTro() {
  const [username, setUsername] = useState("");
  const [isUsernameErrorVisible, setIsUsernameErrorVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [edad, setEdad] = useState("");
  const [pass, setPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const isEmailValid = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
  useEffect(() => {
    const isUsernameValid = username.trim() !== "";
    const isPasswordValid = pass.length >= 6;
    const doPasswordsMatch = pass === confirmPass;

    setIsButtonDisabled(!(isUsernameValid && isEmailValid && isPasswordValid && doPasswordsMatch));
  }, [username, email, pass, confirmPass]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setIsUsernameErrorVisible(false); // Ocultar la advertencia cuando el usuario comienza a escribir
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
        <form method="POST">
        <input
          type="text"
          className="text"
          name="username"
          value={username}
          onChange={handleUsernameChange}
          onBlur={handleBlur}
        />
        <span id="input-label">Nombre Completo</span>
        {isUsernameErrorVisible && (
          <p id="username-error" className="error">
            El nombre de usuario es requerido.
          </p>
        )}
       
          <br />
  
          <input
            type="text"
            className="text"
            name="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
          {!isEmailValid && email.trim() !== "" && <p className="error">El correo no es válido.</p>}
          <span id="input-label">Correo</span>
          <br />
  
          <input
            type="text"
            className="text"
            name="telefono"
            value={telefono}
            onChange={(event) => setTelefono(event.target.value)}
          />
          <span id="input-label">Telefono</span>
          <br />
  
          <input
            type="date"
            className="text"
            name="edad"
            value={edad}
            onChange={(event) => setEdad(event.target.value)}
          />
          <span id="input-label">edad</span>
          <br />
  
          <input
            type="password"
            className="text"
            name="pass"
            value={pass}
            onChange={(event) => setPass(event.target.value)}
            required
          />
          {pass.length > 0 && pass.length < 6 && <p className="error">La contraseña debe tener al menos 6 caracteres.</p>}
          <span id="input-label">contraseña</span>
          <br />
  
          <input
            type="password"
            className="text"
            name="confirmPass"
            value={confirmPass}
            onChange={(event) => setConfirmPass(event.target.value)}
            required
          />
          {confirmPass !== pass && confirmPass.length > 0 && <p className="error">Las contraseñas no coinciden.</p>}
          <span id="input-label">confirmar contraseña</span>
          <br />
  
          {!isButtonDisabled ? (
          <button className="signin">Sign UP</button>
        ) : null}
          <hr />
          <Link to="/Login" className="regis">
            Login
          </Link>
        </form>
        <Outlet />
      </div>
    );
  }
  
  export default RegisTro;
