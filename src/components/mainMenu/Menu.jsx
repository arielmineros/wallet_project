// import logo from './logo.svg';
// import './App.css';
import "./Menu.css";
import SideMenu from "./SideMenu";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Web3 from "web3";
//import ConnectWallet from "../connectWallet/ConnectWallet";
import withReactContent from "sweetalert2-react-content";
import SearchBar from "./SearchBar";
import smartContractRecord from "../smartContract/record.json";
// import mainLogo from './blockchain.png'
//
//import createCookie from "./cookie.js";
import { Outlet, Link } from "react-router-dom";

function Menu() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);
    const [contract, setContract] = useState(null);
    const [verificationWallet, setVerificationWallet] = useState(false);
    const [buttonWallet, setButtonWallet] = useState(false);
    const [listarInfo, setListarInfo] = useState([]);
    const MySwal = withReactContent(Swal);
    const [walletConnected, setWalletConnected] = useState(false);

    //Funcion to activate icons on click
    document.addEventListener("DOMContentLoaded", function () {
        const icons = document.querySelectorAll(".menu-icon");
        icons.forEach((icon) => {
            icon.addEventListener("click", function () {
                icons.forEach((icon) => icon.classList.remove("active-icon"));
                this.classList.add("active-icon");
            });
        });
    });

    //Function to connect wallet
    const connectWallet = async () => {
        //verify if metamask is installed
        if (typeof window.ethereum !== "undefined") {
            const web3Instance = new Web3(window.ethereum);
            setWeb3(web3Instance);
            try {
                //ask for wallet access
                await window.ethereum.enable();

                //Get the address of the current account
                const accounts = await web3Instance.eth.getAccounts();
                setAccount(accounts[0]);

                // Get amount in the account
                const balanceWei = await web3Instance.eth.getBalance(
                    accounts[0]
                ); // Represents the balance of an acc in wei

                const balanceEth = web3Instance.utils.fromWei(
                    balanceWei,
                    "ether"
                ); //Converts the balance from wei to eth
                setBalance(balanceEth);
                setButtonWallet(false);
                setWalletConnected(true);
                localStorage.setItem("walletConnected", "true");

                const contractInstance = new web3Instance.eth.Contract(
                    smartContractRecord,
                    smartContractRecord &&
                        "0x34D44DBc2c73B0eCb4bC738bfB850f92AaB89ae2"
                ); //Create an instance
                setContract(contractInstance);
                setTimeout(() => {
                    localStorage.setItem("walletConnected", "false");
                }, 24 * 60 * 60 * 1000);
            } catch (error) {
                console.log(error);
                MySwal.fire({
                    icon: "error",
                    title: "Oops",
                    text: "Has rechazado la solicitud de conexión de tu wallet",
                });
            }
        } else {
            setVerificationWallet(false);
        }
    };

    //Verify if we have a wallet
    useEffect(() => {
        async function Wallet() {
            if (typeof window.ethereum !== "undefined") {
                setVerificationWallet(true);
                setButtonWallet(true);
            }
            {
                /*else {*/
            }
            {
                /*setButtonWallet(false);*/
            }
            {
                /*}*/
            }
        }
        Wallet();
    }, []);
    //Verify if there's a session stored
    useEffect(() => {
        const isWalletConnected =
            localStorage.getItem("walletConnected") === "true";
        setWalletConnected(isWalletConnected);

        if (isWalletConnected) {
            //window.ethereum.enable();
            connectWallet();
            //setWalletConnected(true);
        }
    }, []);

    return (
        <>
            <nav className="navbarra">
                <div className="nav-lista">
                    <div className="logo-contenedor">
                        <Link to="/">
                            <li className="logo-empresa">
                                <img
                                    src={require("../../img/blockchain.png")}
                                    alt="logo"
                                />
                                <label id="brand-name">Blockchain</label>
                            </li>
                        </Link>
                    </div>

                    <div className="search-contenedor">
                        <SearchBar />
                    </div>

                    <div className="menu-contenedor">
                        <>
                            {verificationWallet ? (
                                <>
                                    <li>
                                        <Link
                                            to="/ProductDetail"
                                            className="navegador-item"
                                        >
                                            <img
                                                src={require("../../icons/home.png")}
                                                className="menu-icon"
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/ProductDetail"
                                            className="navegador-item"
                                        >
                                            <img
                                                src={require("../../icons/heart.png")}
                                                className="menu-icon"
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/Cart"
                                            className="navegador-item"
                                        >
                                            <img
                                                src={require("../../icons/shopping-cart.png")}
                                                className="menu-icon"
                                            />
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            to="/Registrar"
                                            className="navegador-item"
                                        >
                                            <img
                                                src={require("../../icons/bell.png")}
                                                className="menu-icon"
                                            />
                                        </Link>
                                    </li>
                                    <li className="navegador-item">
                                        <>
                                            {buttonWallet ? (
                                                <button
                                                    id="connect-button"
                                                    onClick={connectWallet}
                                                >
                                                    Conectar wallet
                                                </button>
                                            ) : (
                                                <button
                                                    id="connect-button"
                                                    onClick={connectWallet}
                                                >
                                                    Wallet conectada
                                                </button>
                                            )}
                                        </>
                                    </li>
                                </>
                            ) : (
                                <>
                                    <h3>
                                        Para comenzar en esta plataforma es
                                        esencial crear una billetera
                                    </h3>
                                </>
                            )}
                        </>
                    </div>
                </div>
            </nav>
            <Outlet />
            <SideMenu />
        </>
    );
}

export default Menu;
