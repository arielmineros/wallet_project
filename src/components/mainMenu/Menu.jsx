// import logo from './logo.svg';
// import './App.css';
import "./Menu.css";
import "./SearchBar";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import ConnectWallet from "../connectWallet/ConnectWallet";
import withReactContent from "sweetalert2-react-content";
import SearchBar from "./SearchBar";
// import mainLogo from './blockchain.png'

function Menu() {
    //const [Web3, setWeb3] = useState(null);
    //const [account, setAccout] = useState(null);
    //const [balance, setBalance] = useState(null);
    //const [contract, setContract] = useState(null);
    const [verificationWallet, setVerificationWallet] = useState(false);
    const [buttonWallet, setButtonWallet] = useState(false);
    //const [listarInfo, setListarInfo] = useState([]);
    //const MySwal = withReactContent(Swal);

    //Verify if we have a wallet
    useEffect(() => {
        async function Wallet() {
            if (typeof window.ethereum !== "undefined") {
                setVerificationWallet(true);
                setButtonWallet(true);
            }
        }
        Wallet();
    }, []);

    return (
        <nav className="navbarra">
            <div className="nav-lista">
                <div className="logo-contenedor">
                    <li className="logo-empresa">
                        <img
                            src={require("../../img/blockchain.png")}
                            alt="logo"
                        />
                        <label id="brand-name">Blockchain</label>
                    </li>
                </div>

                <div className="search-contenedor">
                    <a>
                        <SearchBar />
                    </a>
                </div>

                <div className="menu-contenedor">
                    <>
                        {verificationWallet ? (
                            <>
                                <li>
                                    <a href="#" className="navegador-item">
                                        <img
                                            src={require("../../icons/home.png")}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="navegador-item">
                                        <img
                                            src={require("../../icons/heart.png")}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="navegador-item">
                                        <img
                                            src={require("../../icons/shopping-cart.png")}
                                        />
                                    </a>
                                </li>
                                <li>
                                    <a href="#" className="navegador-item">
                                        <img
                                            src={require("../../icons/bell.png")}
                                        />
                                    </a>
                                </li>
                                <li className="navegador-item">
                                    <>
                                        {buttonWallet ? (
                                            <button>Conectar billetera</button>
                                        ) : (
                                            <button>Wallet conectada</button>
                                        )}
                                    </>
                                </li>
                            </>
                        ) : (
                            <>
                                <h3>
                                    Para comenzar en esta plataforma es esencial
                                    crear una billetera
                                </h3>
                            </>
                        )}
                    </>
                </div>
            </div>
        </nav>
    );
}

export default Menu;
